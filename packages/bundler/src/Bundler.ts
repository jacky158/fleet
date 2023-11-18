import fs from "fs";
import glob from "glob";
import path from "path";

import { isPlainObject, uniqBy } from "lodash";
import { Annotation } from "./Annotation";
import { AssetMaps, chunkByTypeMap, loadableByTypeMap } from "./constants";

function log(...args: unknown[]) {
  console.log(...args);
}

interface Item {
  type: string;
  name: string; // key name to put to container.
  from: string; // related import name, using to import
  source: string; // absolute filename
  exportName: string; // key to export name
  importName: string;
  packageName: string; // package to use
  chunkName?: string;
  lazy?: boolean;
}

export class Bundler {
  private readonly root: string;
  private readonly collects: Item[];
  private readonly manifest: Record<string, unknown>;

  public anno: Annotation = new Annotation();

  constructor(root: string) {
    this.root = root;
    this.collects = [];
    this.manifest = {};
    this.manifest.buildAt = new Date().toISOString();
  }

  public getPackageDir(name: string): string | false {
    try {
      return path.dirname(require.resolve(`${name}/package.json`, {}));
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  public readJson(file: string) {
    return JSON.parse(fs.readFileSync(file, { encoding: "utf-8" }));
  }

  public mixSource(dir: string, file: string) {
    return path.resolve(dir, "src", file);
  }

  public mixFrom(packageName: string, file: string): string | undefined {
    const candidates = [
      `${packageName}/${file.replace(/.\w+$/, "")}`,
      `${packageName}/dist/${file.replace(/.\w+$/, "")}`,
      `${packageName}/src/${file.replace(/.\w+$/, "")}`,
    ];

    return candidates.find((x) => {
      try {
        return !!require.resolve(x);
      } catch (err) {
        // skip check
      }
      return false;
    });

    // return `${packageName}/dist/${file.replace(/.\w+$/, "")}`;
  }

  public parseJsFile(packageName: string, packageDir: string, file: string) {
    const source = this.mixSource(packageDir, file);
    const info = this.anno.parse(source);

    if (!info) return;

    log(`Parsing ${this.shortenFilename(source)}`);

    this.collects.push({
      from: this.mixFrom(packageName, file),
      source,
      packageName,
      ...info,
    } as Item);
  }

  public parseJsonFile(packageName: string, packageDir: string, file: string) {
    const source = this.mixSource(packageDir, file);
    const json = this.readJson(source);
    const info = json?.info || {};

    const map = AssetMaps.find((x) => x.reg.test(file));

    if (!map) return;

    this.collects.push({
      from: this.mixFrom(packageName, file),
      source,
      packageName,
      type: map.type,
      name: path.basename(file),
      ...info,
    } as Item);
  }

  public discoverPackage(packageName: string) {
    const packageDir = this.getPackageDir(packageName);

    log(`Discovering ${packageName}`);

    if (!packageDir) return;

    log(`Allocated ${packageDir}`);

    // const json = this.readJson(`${dir}/package.json`);

    glob.sync("**/**/*.*", { cwd: `${packageDir}/src` }).forEach((file) => {
      if (/\.(ts|tsx|js|jsx)$/i.test(file)) {
        this.parseJsFile(packageName, packageDir, file);
      } else if (/\.json$/i.test(file)) {
        this.parseJsonFile(packageName, packageDir, file);
      }
    });

    // glob.sync("**/*.tsx", { cwd: `${dir}/src` }).forEach(this.parseFile);
  }

  public generateImports(items: Item[]) {
    return items
      .map((item) => {
        // should loadable or chunk?
        const lazy =
          (!!loadableByTypeMap[item.type] || item.chunkName) &&
          item.lazy != false;

        const chunkName = item.chunkName
          ? item.chunkName
          : chunkByTypeMap[item.type];
        const chunkSyntax = chunkName
          ? `/* webpackChunkName: "${chunkName}" */`
          : "";

        if (lazy) {
          return `const ${item.importName} = loadable(() => import(${chunkSyntax} '${item.from}'));`;
        }

        return `import ${item.importName} from '${item.from}';`;
      })
      .join("\n");
  }

  public filterChunkedOutput(content: string) {
    if (content.indexOf("loadable(") > 0 || content.indexOf("React.lazy") > 0) {
      content = `import loadable from '@loadable/component';\n\n${content}`;
    }
    return `/* eslint-disable */\n${content}`;
  }

  private generateSource(constName: string, input: Item[]): string {
    const items: Item[] = uniqBy(input, "name");

    let data = JSON.stringify(
      items.reduce((acc, x) => {
        acc[`[${x.exportName}]`] = `[${x.importName}]`;
        return acc;
      }, {} as Record<string, string>),
      null,
      "  "
    );

    const imports = this.generateImports(items);

    items.forEach((item) => {
      if (/^\w+$/.test(item.exportName)) {
        if (item.importName == item.exportName) {
          data = data.replace(
            `"[${item.exportName}]": "[${item.importName}]"`,
            `${item.exportName}`
          );
        } else {
          data = data.replace(`"[${item.exportName}]"`, `${item.exportName}`);
          data = data.replace(`"[${item.importName}]"`, `${item.importName}`);
        }
      } else {
        data = data.replace(`"[${item.exportName}]"`, `"${item.exportName}"`);
        data = data.replace(`"[${item.importName}]"`, `${item.importName}`);
      }
    });

    return `${imports}\n\nexport const ${constName} = ${data};\nexport default ${constName};\n`;
  }

  private writeToFile(file: string, source: unknown) {
    if (isPlainObject(source)) {
      source = JSON.stringify(source, null, " ");
    }
    const filename = path.join(this.root, "src/bundle", file);

    fs.writeFileSync(filename, source as string, {
      encoding: "utf-8",
    });

    console.log(`Updated ${this.shortenFilename(filename)}`);
  }

  private shortenFilename(file: string): string {
    return file.startsWith(this.root) ? file.replace(this.root, ".") : file;
  }

  public exportMessages() {
    const items = this.collects.filter((x) => x.type === "asset.message");
    const messages = items.reduce((acc, item) => {
      return { ...acc, ...this.readJson(item.source) };
    }, {} as Record<string, string>);

    this.writeToFile("messages.json", messages);
  }

  public exportManifest() {
    this.writeToFile("manifest.json", this.manifest);
  }

  public exportViews() {
    const items = this.collects.filter((x) => x.type === "layout");
    const source = this.generateSource("views", items);

    this.writeToFile("views.ts", source);
  }

  public exportServices() {
    const items = this.collects.filter((x) => x.type == "service");
    const source = this.generateSource("services", items);

    this.writeToFile("services.ts", source);
  }

  public bundle() {
    const enablePackages = [
      "@ikx/acp",
      "@ikx/chatbot",
      "@ikx/mui",
      "@ikx/http",
      "@ikx/jsx",
    ];

    if (!fs.existsSync(path.join(this.root, "src/bundle"))) {
      fs.mkdirSync(path.join(this.root, "src/bundle"));
    }

    enablePackages.map((packageName) => this.discoverPackage(packageName));

    this.exportServices();
    this.exportMessages();
    this.exportViews();
    this.exportManifest();

    // log(this.data);
  }
}

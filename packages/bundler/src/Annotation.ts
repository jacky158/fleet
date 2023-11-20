import fs from "fs";
import { validTypes } from "./constants";

export class Annotation {
  private counter = 0;
  private prefix: string = "a";

  private getKey(): string {
    this.counter += 1;
    if (this.counter > 99) {
      this.prefix = String.fromCharCode((this.prefix.codePointAt(0) ?? 66) + 1);
      this.counter = 1;
    }
    return `${this.prefix}${this.counter}`;
  }

  private normalizeName(name: string) {
    return name.replace(/[^\w.-@]/g, "");
  }

  private normalizeValue(value: string): unknown {
    const ret = value
      .replace(/(\*\/$|\s*$)/g, "")
      .trim()
      .replace(/(^"|"$)/g, "");
    switch (ret) {
      case "true":
        return true;
      case "false":
        return false;
      case "0":
        return 0;
      case "1":
        return 1;
      default:
        return ret;
    }
  }
  public parse(filename: string): Record<string, unknown> | false {
    const lines = fs.readFileSync(filename, { encoding: "utf8" }).split("\n");

    const candidates = [];
    let found = false;
    for (let i = 0; i < lines.length; ++i) {
      if (!lines[i]) {
        // avoid empty line
      } else if (lines[i].startsWith("/*")) {
        found = true;
        candidates.push(lines[i]);
        if (/\*\/\s*$/.test(lines[i])) break;
      } else if (found) {
        candidates.push(lines[i]);
        if (/\*\/\s*$/.test(lines[i])) break;
      } else {
        break;
      }
    }
    if (!candidates.length) return false;

    const result: Record<string, unknown> = {};

    for (let i = 0; i < candidates.length; i++) {
      const line = candidates[i];
      const position = line.indexOf(":");
      if (position < 1) continue;

      let key = this.normalizeName(line.substring(0, position));
      const value = this.normalizeValue(line.substring(position + 1));

      if (key.startsWith("@")) {
        key = key.substring(1);
      }

      result[key] = value;
    }

    // console.log(result);

    if (!result["type"] || !validTypes.includes(result["type"] as string)) {
      return false;
    }

    result["importName"] = this.getKey();

    if (result["name"]) {
      result["exportName"] = result["name"];
      // if (/^\w+$/.test(result["exportName"] as string)) {
      //   result["importName"] = result["exportName"];
      // }
    }

    return result;
  }
}

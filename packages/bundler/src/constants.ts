export const AssetMaps = [
  {
    from: "**/assets/no-contents/*.json",
    type: "assets.noContents",
    to: "layout.noContents.origin.json",
    reg: /assets\/no-contents\//,
  },
  {
    from: `**/assets/pages/*.json`,
    type: "layout",
    to: "layout.pages.origin.json",
    deduce: true,
    reg: /assets\/pages\//,
  },
  {
    from: "**/assets/templates/*.json",
    type: "template",
    to: "layout.templates.origin.json",
    reg: /assets\/templates\//,
  },
  {
    from: "**/assets/items/*.json",
    type: "assets.items",
    to: "layout.items.origin.json",
    reg: /assets\/items\//,
  },
  {
    from: "**/assets/grids/*.json",
    type: "assets.grids",
    to: "layout.grids.origin.json",
    reg: /assets\/grids\//,
  },
  {
    from: "**/assets/blocks/*.json",
    type: "assets.blocks",
    to: "layout.blocks.origin.json",
    reg: /assets\/blocks\//,
  },
  {
    from: "**/assets/messages.json",
    reg: /assets\/messages\.json/,
    type: "messages",
  },
];

export const validViewTypes: string[] = [
  "block",
  "itemView",
  "dialog",
  "skeleton",
  "siteDock",
  "ui",
  "embedView",
  "formElement",
  "popover",
  "layout",
];

export const validTypes = [
  ...validViewTypes,
  "themeProcessor",
  "route",
  "modalRoute",
  "saga",
  "theme",
  "reducer",
  "message",
  "service",
  "packages",
  "dependency",
  "layoutBlockFeature",
  "admincp.message",
  "mockService",
  "theme.style.editor",
  "theme.styles",
];

// loadable by type component.
export const loadableByTypeMap: Record<string, boolean> = {
  block: true,
  skeleton: true,
  itemView: false,
  dialog: true,
  ui: true,
  embedView: true,
  formElement: true,
  route: true,
  modalRoute: false,
  siteDock: true,
  saga: false,
  reducer: false,
  service: false,
  message: false,
  package: false,
  dependency: false,
  "theme.style.editor": true, // don't be loadable lib.
};

export const chunkByTypeMap: Record<string, string> = {
  dialog: "dialogs",
  route: "routes",
  siteDock: "boot",
  modalRoute: "modalRoutes",
};

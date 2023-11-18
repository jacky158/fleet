export const AssetMaps = [
  {
    from: "**/assets/no-contents/*.json",
    type: "asset.noContent",
    to: "layout.noContents.origin.json",
    reg: /assets\/no-contents\//,
  },
  {
    from: `**/assets/pages/*.json`,
    type: "asset.page",
    to: "layout.pages.origin.json",
    deduce: true,
    reg: /assets\/pages\//,
  },
  {
    from: "**/assets/templates/*.json",
    type: "asset.template",
    to: "layout.templates.origin.json",
    reg: /assets\/templates\//,
  },
  {
    from: "**/assets/items/*.json",
    type: "asset.item",
    to: "layout.items.origin.json",
    reg: /assets\/items\//,
  },
  {
    from: "**/assets/grids/*.json",
    type: "asset.grid",
    to: "layout.grids.origin.json",
    reg: /assets\/grids\//,
  },
  {
    from: "**/assets/blocks/*.json",
    type: "asset.block",
    to: "layout.blocks.origin.json",
    reg: /assets\/blocks\//,
  },
  {
    from: "**/assets/messages.json",
    reg: /assets\/messages\.json/,
    type: "asset.message",
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

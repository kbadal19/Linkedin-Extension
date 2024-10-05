import { defineConfig } from "wxt";

export default defineConfig({
  manifest: {
    manifest_version: 3,
    name: "wxt-react-starter",
    description: "manifest.json description",
    version: "0.0.0",
    icons: {
      "16": "icon/16.png",
      "32": "icon/32.png",
      "48": "icon/48.png",
      "96": "icon/96.png",
      "128": "icon/128.png",
    },
    web_accessible_resources: [
      {
        resources: ["injected.js", "assets/Frame.png"],
        matches: ["*://*/*"],
      },
    ],
    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["content-scripts/content.js"],
        run_at: "document_end",
      },
    ],
    permissions: [
      "activeTab",
      "scripting",
    ],
  },
  runner: {
    startUrls: ["https://wxt.dev"],
  },
});

import { defineCliConfig } from "@sitecore-content-sdk/nextjs/config-cli";
import {
  generateSites,
  generateMetadata,
  extractFiles,
  writeImportMap,
} from "@sitecore-content-sdk/nextjs/tools";
import scConfig from "./sitecore.config";

export default defineCliConfig({
  build: {
    commands: [
      generateMetadata(),
      generateSites({
        scConfig,
      }),
      extractFiles({
        scConfig,
        paths: [
          "src/app",
          "src/components",
          "src/lib",
          "src/Providers.tsx",
          "src/Layout.tsx",
          "src/Bootstrap.tsx",
          "src/middleware.ts",
          "next.config.ts",
          "sitecore.config.ts",
        ],
      }),
      writeImportMap({
        paths: ["src/components"],
        scConfig,
      }),
    ],
  },
  componentMap: {
    paths: ["src/components"],
    exclude: ["src/components/content-sdk/*"],
  },
});

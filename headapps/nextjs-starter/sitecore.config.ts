import { defineConfig } from "@sitecore-content-sdk/nextjs/config";
/**
 * @type {import('@sitecore-content-sdk/nextjs/config').SitecoreConfig}
 * See the documentation for `defineConfig`:
 * https://doc.sitecore.com/xmc/en/developers/content-sdk/the-sitecore-configuration-file.html
 */
const config = defineConfig({});

// TEMP DEBUG: verify GENERATE_STATIC_PATHS mapping
if (typeof process !== "undefined") {
  // eslint-disable-next-line no-console
  console.log("[GENERATE_STATIC_PATHS]", {
    env: process.env.GENERATE_STATIC_PATHS,
    resolved: (config as any).generateStaticPaths,
    nodeEnv: process.env.NODE_ENV,
  });
}

export default config;

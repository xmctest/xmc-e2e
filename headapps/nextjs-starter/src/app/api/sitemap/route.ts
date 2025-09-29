import { createSitemapRouteHandler } from "@sitecore-content-sdk/nextjs/route-handler";
import sites from ".sitecore/sites.json";
import client from "lib/sitecore-client";
import scConfig from "sitecore.config";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

/**
 * API route for generating sitemap.xml
 *
 * This Next.js API route handler dynamically generates and serves the sitemap XML for your site.
 * The sitemap configuration can be managed within XM Cloud.
 */

const { GET: SITEMAP_GET } = createSitemapRouteHandler({ client, sites });

export async function GET(req: NextRequest) {
  if (!scConfig.api?.edge?.contextId) {
    return new Response("", { status: 204 });
  }

  try {
    return await SITEMAP_GET(req);
  } catch {
    return new Response("", { status: 204 });
  }
}

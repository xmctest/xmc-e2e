import { createRobotsRouteHandler } from "@sitecore-content-sdk/nextjs/route-handler";
import sites from ".sitecore/sites.json";
import client from "lib/sitecore-client";
import scConfig from "sitecore.config";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

/**
 * API route for serving robots.txt
 *
 * This Next.js API route handler generates and returns the robots.txt content dynamically
 * based on the resolved site name. It is commonly
 * used by search engine crawlers to determine crawl and indexing rules.
 */

const { GET: ROBOTS_GET } = createRobotsRouteHandler({ client, sites });

export async function GET(req: NextRequest) {
  if (!scConfig.api?.edge?.contextId) {
    return new Response("User-agent: *\nDisallow:", {
      status: 200,
      headers: { "content-type": "text/plain" },
    });
  }

  try {
    return await ROBOTS_GET(req);
  } catch {
    return new Response("User-agent: *\nDisallow:", {
      status: 200,
      headers: { "content-type": "text/plain" },
    });
  }
}

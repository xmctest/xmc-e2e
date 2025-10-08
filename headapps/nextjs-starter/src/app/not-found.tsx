import Link from "next/link";
import client from "lib/sitecore-client";
import scConfig from "sitecore.config";
import { ErrorPage } from "@sitecore-content-sdk/nextjs";
import Layout from "src/Layout";
import Providers from "src/Providers";

export const dynamic = "force-dynamic";

export default async function NotFound() {
  // TEMP DEBUG: not-found render begin
  // eslint-disable-next-line no-console
  console.log("[PAGE] /_not-found");
  const site = "test";
  const page = await client.getErrorPage(ErrorPage.NotFound, {
    site,
    locale: scConfig.defaultLanguage,
  });

  if (page) {
    return (
      <Providers page={page}>
        <Layout page={page} />
      </Providers>
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <Link href="/">Go to the Home page</Link>
    </div>
  );
}

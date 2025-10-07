import { isDesignLibraryPreviewData } from "@sitecore-content-sdk/nextjs/editing";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { headers } from "next/headers";
import { parseRewriteHeader } from "@sitecore-content-sdk/nextjs/utils";
import scConfig from "sitecore.config";
import client from "src/lib/sitecore-client";
import Layout, { RouteFields } from "src/Layout";
import components from ".sitecore/component-map";
import Providers from "src/Providers";
import Bootstrap from "src/Bootstrap";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

type PageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path?: string[];
    [key: string]: string | string[] | undefined;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { site, locale, path } = await params;
  const draft = await draftMode();

  // Resolve site/locale from params, editor header, or defaults
  const hdrs = await headers();
  const { site: headerSite, locale: headerLocale } = parseRewriteHeader(hdrs);
  const resolvedSite =
    site || (headerSite as string | undefined) || scConfig.defaultSite;
  const resolvedLocale =
    locale || (headerLocale as string | undefined) || scConfig.defaultLanguage;

  // Set site and locale to be available in src/i18n/request.ts for fetching the dictionary
  setRequestLocale(`${resolvedSite ?? "default"}_${resolvedLocale}`);

  // Fetch the page data from Sitecore
  let page;
  if (draft.isEnabled) {
    const editingParams = await searchParams;
    if (isDesignLibraryPreviewData(editingParams)) {
      page = await client.getDesignLibraryData(editingParams);
    } else {
      page = await client.getPreview(editingParams);
    }
  } else {
    const options = resolvedSite
      ? { site: resolvedSite, locale: resolvedLocale }
      : { locale: resolvedLocale };
    page = await client.getPage(path ?? [], options);
  }

  // If the page is not found, return a 404
  if (!page) {
    notFound();
  }

  // Fetch the component data from Sitecore (Likely will be deprecated)
  const componentProps = await client.getComponentData(
    page.layout,
    {},
    components
  );

  return (
    <>
      <Bootstrap page={page} />
      <NextIntlClientProvider>
        <Providers page={page} componentProps={componentProps}>
          <Layout page={page} />
        </Providers>
      </NextIntlClientProvider>
    </>
  );
}

// This function gets called at build and export time to determine
// pages for SSG ("paths", as tokenized array).
export const dynamic = "force-dynamic";
export const generateStaticParams = async () => [];
// Metadata fields for the page.
export const generateMetadata = async () => ({ title: "Page" });

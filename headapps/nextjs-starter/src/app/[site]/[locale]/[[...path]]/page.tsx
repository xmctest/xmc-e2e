import { isDesignLibraryPreviewData } from "@sitecore-content-sdk/nextjs/editing";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import scConfig from "sitecore.config";
import client from "src/lib/sitecore-client";
import Layout from "src/Layout";
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
  // TEMP DEBUG: page render begin
  // eslint-disable-next-line no-console
  console.log("[PAGE] /[site]/[locale]/[[...path]] start");
  const { site, locale, path } = await params;
  const draft = await draftMode();

  // Set site and locale to be available in src/i18n/request.ts for fetching the dictionary
  setRequestLocale(`${"test"}_${locale || scConfig.defaultLanguage}`);

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
    page = await client.getPage(path ?? [], {
      site: "test",
      locale: locale || scConfig.defaultLanguage,
    });
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
export const generateStaticParams = async () => {
  // TEMP DEBUG: ensure the gate is applied
  // eslint-disable-next-line no-console
  {
    const generateStaticPaths = (scConfig as Record<string, unknown>)[
      "generateStaticPaths"
    ] as boolean | undefined;
    console.log("[SSG generateStaticParams]", {
      generateStaticPaths,
    });
  }
  return [];
};
// Metadata fields for the page.
export const generateMetadata = async () => ({ title: "Page" });

import Link from 'next/link';
import { ErrorPage } from '@sitecore-content-sdk/nextjs';
import client from 'lib/sitecore-client';
import scConfig from 'sitecore.config';
import Layout from 'src/Layout';
import Providers from 'src/Providers';
import { NextIntlClientProvider } from 'next-intl';

export const dynamic = 'force-dynamic';

export default async function NotFound() {
  const defaultSite = scConfig.defaultSite;
  const page = defaultSite
    ? await client.getErrorPage(ErrorPage.NotFound, {
        site: defaultSite,
        locale: scConfig.defaultLanguage,
      })
    : null;

  if (page) {
    return (
      <NextIntlClientProvider>
        <Providers page={page}>
          <Layout page={page} />
        </Providers>
      </NextIntlClientProvider>
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

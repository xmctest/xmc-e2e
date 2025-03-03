import { MultisiteGraphQLSitemapService, StaticPath, SiteInfo } from '@sitecore-content-sdk/nextjs';
import config from 'sitecore.config';
import { SitemapFetcherPlugin } from '..';
import { GetStaticPathsContext } from 'next';
import { siteResolver } from 'lib/site-resolver';
import clientFactory from 'lib/graphql-client-factory';

class GraphqlSitemapServicePlugin implements SitemapFetcherPlugin {
  _graphqlSitemapService: MultisiteGraphQLSitemapService;

  constructor() {
    this._graphqlSitemapService = new MultisiteGraphQLSitemapService({
      clientFactory,
      sites: [...new Set(siteResolver.sites.map((site: SiteInfo) => site.name))],
    });
  }

  async exec(context?: GetStaticPathsContext): Promise<StaticPath[]> {
    return process.env.EXPORT_MODE
      ? this._graphqlSitemapService.fetchExportSitemap(config.defaultLanguage)
      : this._graphqlSitemapService.fetchSSGSitemap(context?.locales || []);
  }
}

export const graphqlSitemapServicePlugin = new GraphqlSitemapServicePlugin();

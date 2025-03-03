import config from 'sitecore.config';
import { SiteInfo } from '@sitecore-content-sdk/nextjs/site';
import { SiteResolverPlugin } from '..';

class DefaultPlugin implements SiteResolverPlugin {
  exec(sites: SiteInfo[]): SiteInfo[] {
    // Add default/configured site
    sites.unshift({
      name: config.defaultSite,
      language: config.defaultLanguage,
      hostName: '*',
    });

    return sites;
  }
}

export const defaultPlugin = new DefaultPlugin();

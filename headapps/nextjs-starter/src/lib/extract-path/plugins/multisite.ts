import { normalizeSiteRewrite } from '@sitecore-content-sdk/nextjs';
import { Plugin } from '..';

class MultisitePlugin implements Plugin {
  exec(path: string) {
    // Remove site rewrite segment from the path
    return normalizeSiteRewrite(path);
  }
}

export const multisitePlugin = new MultisitePlugin();

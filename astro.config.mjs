// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

const canonicalHost = 'klink.au';

export const githubHost = 'pbklink.github.io'; // Defined in Astro Config. In future get this from environmental variable
export const githubSite = `https://${githubHost}`;


// https://astro.build/config
export default defineConfig({
    site: githubSite,
    trailingSlash: 'always',

    integrations: [
        sitemap({
            // Change sitemap URLs to use custom host supplied to GitHub.
            serialize(item) {
                const url = new URL(item.url);
                if (url.host === githubHost) {
                    url.host = canonicalHost;
                }
                item.url = url.href;
                return item;
            }
        })
    ],
});
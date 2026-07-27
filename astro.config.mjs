import { defineConfig } from 'astro/config';

/**
 * errorsignal.dev is retired — this build now emits nothing but redirect pages
 * pointing at memerson.com. The React integration, the fonts and the markdown
 * highlighting config all went with the TUI site they existed for.
 *
 * `site` stays errorsignal.dev because it is still this build's own origin;
 * the redirect targets are absolute and do not depend on it.
 */
export default defineConfig({
  site: 'https://errorsignal.dev',
});

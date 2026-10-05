import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Branda',
  tagline: 'Your brand, one shortcut away.',
  favicon: 'img/favicon.ico',

  headTags: [
    {tagName: 'link', attributes: {rel: 'apple-touch-icon', href: '/img/apple-touch-icon.png'}},
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'}},
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'}},
  ],

  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:wght@400;600&display=swap',
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://branda.mpowr.tech',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mpowr-it',
  projectName: 'branda-website',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  markdown: {
    // .md files are plain CommonMark, .mdx files are MDX
    format: 'detect',
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/mpowr-it/branda-website/tree/main/',
          // Major version switcher: "current" (docs/) is the in-development major.
          // Snapshot a major with `mise run docs:version -- <major>.x` before starting the next one.
          lastVersion: 'current',
          versions: {
            current: {
              label: '1.x',
              path: '',
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/branda-social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Branda',
      logo: {
        alt: 'Branda Logo',
        src: 'img/logo.png',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/docs/quickstart', label: 'Quickstart', position: 'left'},
        {to: '/docs/changelog', label: 'Changelog', position: 'left'},
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/mpowr-it/branda',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'What is branda?', to: '/docs'},
            {label: 'Installation', to: '/docs/installation'},
            {label: 'Quickstart', to: '/docs/quickstart'},
            {label: 'branda-cli', to: '/docs/cli'},
            {label: 'branda Menu', to: '/docs/menu'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Usage with AI agents', to: '/docs/ai-agents'},
            {label: 'FAQ', to: '/docs/faq'},
            {label: 'Changelog', to: '/docs/changelog'},
            {label: 'GitHub', href: 'https://github.com/mpowr-it/branda'},
          ],
        },
        {
          title: 'Legal',
          items: [
            {label: 'Licence', to: '/docs/licence'},
            {label: 'Imprint', to: '/imprint'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MPOWR IT GmbH. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

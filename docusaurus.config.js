const config = {
  title: 'Shubham Chhatbar',
  tagline: 'Systems internals, offensive security, and low-level development',
  url: 'https://shubham-0-0-7.github.io',
  baseUrl: '/',
  organizationName: 'Shubham-0-0-7',
  projectName: 'Shubham-0-0-7.github.io',
  onBrokenLinks: 'ignore',
  onBrokenAnchors: 'ignore',
  favicon: 'img/favicon.svg',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'ignore',
    },
  },

  headTags: [
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'}},
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'}},
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500;700&display=swap',
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/docs',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'shubham chhatbar',
      hideOnScroll: false,
      items: [
        {to: '/#findings', label: 'findings', position: 'right', activeBaseRegex: '^$a'},
        {to: '/docs', label: 'writeups', position: 'right', activeBaseRegex: '^/docs'},
        {to: '/#projects', label: 'projects', position: 'right', activeBaseRegex: '^$a'},
        {to: '/art', label: 'art', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Shubham Chhatbar · Mumbai · ${new Date().getFullYear()}`,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {hideable: true, autoCollapseCategories: true},
    },
    tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 3},
    prism: {
      additionalLanguages: ['bash', 'c', 'cpp', 'rust', 'nasm', 'powershell', 'json', 'python', 'sql', 'php'],
    },
  },
};

module.exports = config;

const config = {
  title: "Portfolio",
  tagline: 'Systems internals, offensive security, and low-level development',
  url: 'https://shubham-0-0-7.github.io',
  baseUrl: '/', // Root level
  organizationName: 'Shubham-0-0-7',
  projectName: 'Shubham-0-0-7.github.io',
  onBrokenLinks: 'ignore',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'ignore',
    },
  },

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
      title: "Shubham Chhatbar",
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Shubham Chhatbar.`,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
  },
};

module.exports = config;
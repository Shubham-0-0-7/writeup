const config = {
  title: "Shubham's Cybersecurity Blog",
  tagline: 'Writeups | Challenges | Learning Journey',
  url: 'https://shubham-0-0-7.github.io',
  baseUrl: '/writeup/', // Change to your repo name
  organizationName: 'Shubham-0-0-7',
  projectName: 'writeup',
  
  // Remove the default docs plugin since we're blog-only
  presets: [
    [
      'classic',
      {
        docs: false, // Disable docs
        blog: {
          path: 'blog',
          routeBasePath: '/blog', // Make blog the homepage
          showReadingTime: false,
          blogTitle: "Shubham's Cybersecurity Blog",
          blogDescription: 'Bandit, Natas, and other cybersecurity challenge writeups',
          postsPerPage: 10,
          blogSidebarTitle: 'Recent Writeups',
          blogSidebarCount: 10,
          onInlineTags: 'ignore',
          remarkPlugins: [],
          rehypePlugins: [],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Shubham's Cybersecurity Blog",
      logo: {
        alt: 'Cybersecurity Blog Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'tags',
          label: 'Tags',
          position: 'left',
        },
        {
          to: 'archive',
          label: 'Archive',
          position: 'left',
        },
        {
          href: 'https://github.com/Shubham-0-0-7',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Writeups',
          items: [
            {
              label: 'Bandit',
              to: 'tags/bandit',
            },
            {
              label: 'Natas',
              to: 'tags/natas',
            },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Shubham-0-0-7',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Shubham's Cybersecurity Blog. Built with Docusaurus.`,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  },
};

module.exports = config;
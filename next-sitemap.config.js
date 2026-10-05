/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://monky-lp-zeta.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      'https://monky-lp-zeta.vercel.app/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    const priorityMap = {
      '/': 1.0,
      '/solucoes': 0.8,
      '/projetos': 0.8,
      '/como-funciona': 0.7,
      '/sobre': 0.6,
    }
    const changefreqMap = {
      '/': 'weekly',
      '/solucoes': 'monthly',
      '/projetos': 'monthly',
      '/como-funciona': 'monthly',
      '/sobre': 'yearly',
    }
    return {
      loc: path,
      changefreq: changefreqMap[path] || 'monthly',
      priority: priorityMap[path] || 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}
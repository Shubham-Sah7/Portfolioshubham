import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/lab/playground',
    '/lab/creation',
    '/lab/walkman',
    '/lab/qr-device',
    '/lab/color',
  ]

  return routes.map((route) => ({
    url: `https://www.shubhamsah.com${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}

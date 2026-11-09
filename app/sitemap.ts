import type { MetadataRoute } from 'next'

const BASE = 'https://mgfabogados.com.ar'

const areas = [
  'accidentes-trabajo',
  'accidentes-transito',
  'despidos',
  'propiedad-horizontal',
  'mala-praxis',
  'sucesiones',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/consulta`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${BASE}/cotizador`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    ...areas.map((slug) => ({
      url: `${BASE}/areas/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]
}
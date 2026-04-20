import { z } from 'astro/zod';

export const SITE_TITLE = 'Les Affluents du Numérique'
export const SITE_LANG = 'fr'
export const POST_TAGS = ['Design UI/UX', 'Développement web', 'IA', 'Tendances Tech'] as const
export const POST_TAGS_ENUM = {
  'design-ui-ux': 'Design UI/UX',
  'developpement-web': 'Développement Web',
  'intelligence-artificielle': 'IA',
  'tendances-tech': 'Tendances Tech'
} as const

export const BLOG_CATEGORIES_DESCRIPTION = {
  'design-ui-ux': 'Retrouvez nos articles sur le design UI/UX.',
  'developpement-web': 'Retrouvez nos articles sur le développement web.',
  'intelligence-artificielle': 'Retrouvez nos articles sur l\'intelligence artificielle.',
  'tendances-tech': 'Retrouvez nos articles sur les dernières tendances tech.'
} as const

export const SITE_DESCRIPTIONS = {
  home: 'Collectif de développeurs web indépendants. Nous créons des solutions sur mesure pour les TPE/PME.',
  team: 'Découvrez notre équipe de développeurs web indépendants. Passionnés et engagé pour vos projets numériques.',
  blog: 'Retrouvez nos articles sur le développement web.',
  blogCategory: BLOG_CATEGORIES_DESCRIPTION,
  blogAllCategory: 'Retrouvez tous nos articles.',
  legalNotices: 'Retrouvez nos mentions légales',
  privacyPolicy: 'Retrouvez notre politique de confidentialité'
} as const

const CATEGORIES = {
  'design-ui-ux': 'Les Affluents du Numérique - Blog - Design UI/UX',
  'developpement-web': 'Les Affluents du Numérique - Blog - Développement Web',
  'intelligence-artificielle': 'Les Affluents du Numérique - Blog - IA',
  'tendances-tech': 'Les Affluents du Numérique - Blog - Tendances Tech'
} as const

export const SITE_TITLES = {
  home: 'Les Affluents du Numérique - Accueil',
  team: 'Les Affluents du Numérique - Notre équipe',
  blog: 'Les Affluents du Numérique - Blog',
  blogCategory: CATEGORIES,
  blogAllCategory: 'Les Affluents du Numérique - Blog - Tous les articles',
  legalNotices: 'Les Affluents du Numérique - Mentions légales',
  privacyPolicy: 'Les Affluents du Numérique - Politique de confidentialité'
} as const

export const POST_TAGS_WITH_EMPTY_TAG = ['design-ui-ux', 'developpement-web', 'intelligence-artificielle', 'tendances-tech', ''] as const

export const postTagsSchema = z.array(z.enum(POST_TAGS_WITH_EMPTY_TAG))
export type PostTagsType = z.infer<typeof postTagsSchema>

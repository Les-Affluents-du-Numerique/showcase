import { z } from 'astro/zod';

export const SITE_TITLE = 'Les Affluents du Numérique'
export const SITE_DESCRIPTION = 'Welcome to my website!'
export const SITE_LANG = 'fr'
export const POST_TAGS = ['Design UI/UX', 'Développement web', 'IA', 'Tendances Tech'] as const
export const POST_TAGS_ENUM = {
    "design-ui-ux": "Design UI/UX",
    "developpement-web": "Développement Web",
    "intelligence-artificielle": "IA",
    "tendances-tech": 'Tendances Tech'
}
export const POST_TAGS_WITH_EMPTY_TAG = ['design-ui-ux', 'developpement-web', 'intelligence-artificielle', 'tendances-tech', ''] as const

export const postTagsSchema = z.array(z.enum(POST_TAGS_WITH_EMPTY_TAG))
export type PostTagsType = z.infer<typeof postTagsSchema>

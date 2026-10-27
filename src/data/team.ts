import type { ImageMetadata } from "astro";
import fverinImage from "../assets/francois_verin_profile_picture.webp";
import dcadeauImage from "../assets/daniel_cadeau_profile_picture.webp";
import jmombongoImage from "../assets/jordan_mombongo_profile_picture.webp";

export interface TeamMember {
  name: string;
  role: string;
  /** Spécialité courte, affichée sur le schéma « confluence » de l'accueil. */
  focus: string;
  bio: string;
  image: ImageMetadata;
  tech: string[];
}

export const team: TeamMember[] = [
  {
    name: "François Verin",
    role: "Développeur Fullstack",
    focus: "Web & ERP",
    bio: "Après plusieurs années en start-up, j'ai choisi de mettre mon expérience au service des TPE et PME. Je conçois des interfaces accessibles et des applications web rapides, robustes et simples à utiliser.",
    image: fverinImage,
    tech: [
      "Next.js",
      "Astro",
      "TypeScript",
      "NestJS",
      "Odoo",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    name: "Jordan Mombongo",
    role: "Développeur",
    focus: "Sécurité applicative",
    bio: "Spécialisé dans la sécurité des applications web et attaché au Software Craftsmanship, j'interviens sur la conception, la fiabilité et l'évolution de produits métier durables.",
    image: jmombongoImage,
    tech: ["Java", "Spring Boot", "Angular", "Sécurité web"],
  },
  {
    name: "Daniel Cadeau",
    role: "Développeur web",
    focus: "Données & IA",
    bio: "Je conçois, développe et fais évoluer des applications web et des outils métier, du back-end aux interfaces utilisateur. J'interviens également sur la création d'API, la gestion des données et l'intégration de services tiers.",
    image: dcadeauImage,
    tech: ["PHP", "Python", "TypeScript", "SQL", "API", "Docker"],
  },
];

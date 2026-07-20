import type { ImageMetadata } from "astro";
import fverinImage from "../assets/francois_verin_profile_picture.webp";
import cdebrayImage from "../assets/christopher_debray_profile_picture.webp";
import dcadeauImage from "../assets/daniel_cadeau_profile_picture.webp";
import jmombongoImage from "../assets/jordan_mombongo_profile_picture.webp";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: ImageMetadata;
  tech: string[];
}

export const team: TeamMember[] = [
  {
    name: "François Verin",
    role: "Développeur Fullstack",
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
    bio: "Spécialisé dans la sécurité des applications web et attaché au Software Craftsmanship, j'interviens sur la conception, la fiabilité et l'évolution de produits métier durables.",
    image: jmombongoImage,
    tech: ["Java", "Spring Boot", "Angular", "Sécurité web"],
  },
  {
    name: "Daniel Cadeau",
    role: "Développeur web",
    bio: "Je conçois, développe et fais évoluer des applications web et des outils métier, du back-end aux interfaces utilisateur. J'interviens également sur la création d'API, la gestion des données et l'intégration de services tiers.",
    image: dcadeauImage,
    tech: ["PHP", "Python", "TypeScript", "SQL", "API", "Docker"],
  },
  {
    name: "Christopher Debray",
    role: "Développeur Fullstack",
    bio: "J'accompagne la conception et le développement d'applications web modernes, avec une approche pragmatique centrée sur des solutions fiables, maintenables et adaptées aux usages réels.",
    image: cdebrayImage,
    tech: ["NestJS", "Next.js", "TypeScript", "Docker"],
  },
];

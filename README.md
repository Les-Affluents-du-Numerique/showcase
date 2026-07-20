# Les Affluents du Numérique

Site vitrine du collectif Les Affluents du Numérique

## 🌊 Partie 1 : Pourquoi le Collectif

### Qui sommes-nous ?

**Les Affluents du Numérique** est un collectif d'experts indépendants en Île-de-France unis pour propulser les entreprises de Paris et sa région — de la TPE aux structures plus établies — vers de nouveaux horizons technologiques.

### Notre Mission

Nous accompagnons les entreprises dans leur transformation numérique avec :

- **Proximité** : Un ancrage local fort en Île-de-France pour être au plus près de vos besoins
- **Agilité** : Des solutions flexibles et adaptées à votre rythme et vos contraintes
- **Expertise de haut niveau** : Un collectif d'experts indépendants aux compétences complémentaires

### Notre Approche

Nous concevons des solutions sur mesure qui allient haute technicité et vision stratégique pour des entreprises ambitieuses de toutes tailles. Chaque projet est un affluent qui rejoint le fleuve numérique de nos clients.

### Nos Domaines d'Intervention

- Développement d'applications web et mobiles
- Transformation digitale
- Optimisation de processus métiers
- Formation et accompagnement des équipes
- Conseil stratégique numérique

### Contact

📧 [contact@lesaffluentsdunumerique.fr](mailto:contact@lesaffluentsdunumerique.fr)  
🌐 [www.lesaffluentsdunumerique.fr](https://www.lesaffluentsdunumerique.fr)

---

## 💻 Partie 2 : Guide Technique

### Prérequis

- **Node.js** >= 22.12.0
- **pnpm** 10.33.0+

### Technologies Utilisées

Ce site vitrine est construit avec :

- **[Astro](https://astro.build/)** 6.1.7 - Framework web moderne et performant
- **[Tailwind CSS](https://tailwindcss.com/)** 4.2.2 - Framework CSS utilitaire
- **[MDX](https://mdxjs.com/)** - Markdown enrichi pour le contenu
- **[Vercel](https://vercel.com/)** - Plateforme de déploiement
- **Material Symbols** - Icônes
- **Sharp** - Optimisation d'images

### Installation

```bash
# Cloner le repository
git clone https://github.com/Les-Affluents-du-Numerique/showcase.git
cd showcase

# Installer les dépendances avec pnpm
pnpm install
```

### Commandes Disponibles

| Commande          | Action                                       |
|:------------------|:---------------------------------------------|
| `pnpm dev`        | Lance le serveur de développement |
| `pnpm build`      | Construit le site pour la production dans `./dist/` |
| `pnpm preview`    | Prévisualise le build de production localement |

### Structure du Projet

```
/
├── public/              # Fichiers statiques (images, fonts, etc.)
├── src/
│   ├── assets/         # Assets optimisés par Astro
│   ├── components/     # Composants Astro réutilisables
│   ├── content/        # Contenu du site (blog, réalisations)
│   ├── layouts/        # Layouts de pages
│   ├── pages/          # Pages du site (routing automatique)
│   └── styles/         # Styles globaux
├── astro.config.mjs    # Configuration Astro
└── package.json        # Dépendances et scripts
```

### Développement

```bash
# Lancer le serveur de développement
pnpm dev
```

### Build et Déploiement

```bash
# Construire le site pour la production
pnpm build

# Prévisualiser le build
pnpm preview
```

Le déploiement sur Vercel se fait automatiquement via GitHub Actions lors d'un push sur la branche principale.

### Sitemap et SEO

Le site génère automatiquement :
- Un sitemap XML (`sitemap-index.xml` et `sitemap-0.xml`)
- Un flux RSS pour le blog
- Un fichier `robots.txt` dynamique

La configuration du sitemap se fait via la variable d'environnement automatiquement via `VERCEL_URL` lors des déploiements Vercel.

### Gestion du Contenu

Le contenu du site est géré via des fichiers MDX dans `/src/content/` :
- `/src/content/blog/` - Articles de blog
- `/src/content/realisations/` - Études de cas et réalisations

### Contribution

Pour contribuer au projet :

1. Forker le repository
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/ma-nouvelle-fonctionnalite`)
3. Commiter vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Pousser vers la branche (`git push origin feature/ma-nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

### Support

Pour toute question ou problème, contactez-nous à [contact@lesaffluentsdunumerique.fr](mailto:contact@lesaffluentsdunumerique.fr)

---

© 2026 Les Affluents du Numérique. Tous droits réservés.

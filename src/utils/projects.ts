import { inlineTranslate } from "qwik-speak";

import TopsortThumb from "~/media/images/projects/topsort-thumb.png";
import AstromartThumb from "~/media/images/projects/astromart-thumb.png";
import KobrazaThumb from "~/media/images/projects/kobraza-thumb.png";
import LeonardoNutritionThumb from "~/media/images/projects/leonardo-thumb.png";

/**
 * Get the list of projects.
 *
 * @returns A list of projects.
 */
export const getProjects = () => {
  const t = inlineTranslate();
  const PROJECTS = [
    {
      id: "topsort",
      isCurrent: true,
      slug: "https://topsort.com",
      title: t("projects.topsort.title"),
      description: t("projects.topsort.description"),
      tags: ["React", "TypeScript", "Next.js", "Storybook"],
      thumbnail: {
        srcset: TopsortThumb,
        alt: t("projects.topsort.description"),
        width: 100,
        height: 100,
      },
    },
    {
      id: "astromart",
      title: t("projects.astromart.title"),
      description: t("projects.astromart.description"),
      tags: ["Astro", "React", "TypeScript", "Odoo"],
      thumbnail: {
        srcset: AstromartThumb,
        alt: t("projects.astromart.description"),
        width: 100,
        height: 100,
      },
    },
    {
      id: "leonardo-nutrition",
      title: t("projects.leonardo_nutrition.title"),
      description: t("projects.leonardo_nutrition.description"),
      tags: ["React", "TypeScript", "Next.js", "Contentful"],
      thumbnail: {
        srcset: LeonardoNutritionThumb,
        alt: t("projects.leonardo_nutrition.description"),
        width: 100,
        height: 100,
      },
    },
    {
      id: "kobraza",
      title: t("projects.kobraza_imoveis.title"),
      description: t("projects.kobraza_imoveis.description"),
      tags: ["React", "TypeScript", "Storyblok CMS"],
      thumbnail: {
        srcset: KobrazaThumb,
        alt: t("projects.kobraza.description"),
        width: 100,
        height: 100,
      },
    },
  ];

  return PROJECTS;
};

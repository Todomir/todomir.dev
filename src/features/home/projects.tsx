import { component$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";
import ProjectCard from "~/components/project-card/project-card";

import AstromartThumb from "~/media/images/projects/astromart-02.png?w=200;400;600;800;1200&format=avif;webp;png&as=srcset&imagetools";
import LeonardoNutritionThumb from "~/media/images/projects/leonardo-nutrition-02.png?w=200;400;600;800;12000&format=avif;webp;png&as=srcset&imagetools";
import KdsThumb from "~/media/images/projects/kds-01.png?w=200;400;600;800;1200&format=avif;webp;png&as=srcset&imagetools";

export default component$(() => {
  const t = inlineTranslate();
  const PROJECTS = [
    {
      id: "astromart",
      title: "Astromart",
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
      title: "Leonardo Nutrition",
      description: t("projects.leonardo_nutrition.description"),
      tags: ["React", "TypeScript", "Next.js", "TailwindCSS", "Contentful"],
      thumbnail: {
        srcset: LeonardoNutritionThumb,
        alt: t("projects.leonardo_nutrition.description"),
        width: 100,
        height: 100,
      },
    },
    {
      id: "kds-wahalla",
      title: "KDS Wahalla",
      description: t("projects.kds_wahalla.description"),
      tags: ["React", "TypeScript", "Odoo"],
      thumbnail: {
        srcset: KdsThumb,
        alt: t("projects.kds_wahalla.description"),
        width: 100,
        height: 100,
      },
    },
  ];
  return (
    <section
      id="projects"
      class="full-width flex flex-col rounded-b-xl bg-zinc-950 px-5 py-12 text-zinc-300 md:px-16"
    >
      <h2 class="mt-10 text-4xl font-medium leading-[54px] tracking-tighter md:mt-12 md:text-7xl md:leading-[91px]">
        {t("site.links.projects.label")}
      </h2>
      <h3
        class="mt-4 text-xl leading-7 text-zinc-500"
        dangerouslySetInnerHTML={t("home.projects.description")}
      />

      <ul class="mt-20 grid grid-cols-1 gap-10">
        {PROJECTS.map((post) => (
          <li key={post.id}>
            <ProjectCard
              id={post.id}
              title={post.title}
              description={post.description}
              tags={post.tags}
              thumbnail={post.thumbnail}
            />
          </li>
        ))}
      </ul>
    </section>
  );
});

import { component$ } from "@builder.io/qwik";
import ProjectCard from "~/components/project-card/project-card";

import AstromartThumb from "~/media/images/projects/astromart-02.png?w=500;900;1200&format=webp&as=srcset&imagetools";
import LeonardoNutritionThumb from "~/media/images/projects/leonardo-nutrition-02.png?w=500;900;1200&format=webp&as=srcset&imagetools";
import KdsThumb from "~/media/images/projects/kds-01.png?w=500;900;1200&format=webp&as=srcset&imagetools";


const PROJECTS = [
  {
    id: "astromart",
    title: "Astromart",
    description: $localize`Worked on Astromart: a performant e-commerce template for Astro, React, TypeScript and Odoo developers`,
    tags: ["Astro", "React", "TypeScript", "Odoo"],
    thumbnail: {
      srcset: AstromartThumb,
      alt: "Sample Alt",
      width: 100,
      height: 100,
    },
  },
  {
    id: "leonardo-nutrition",
    title: "Leonardo Nutrition",
    description: $localize`CMS Integration and Testimonials with social login for Leonardo Nutrition, a nutritionist and dietitian in Brazil.`,
    tags: ["React", "TypeScript", "Next.js", "TailwindCSS", "Contentful"],
    thumbnail: {
      srcset: LeonardoNutritionThumb,
      alt: $localize`CMS Integration and Testimonials with social login for Leonardo Nutrition, a nutritionist and dietitian in Brazil.`,
      width: 100,
      height: 100,
    },
  },
  {
    id: "kds-wahalla",
    title: "KDS Wahalla",
    description: $localize`Built KDS Wahalla, a performant kitchen display system for restaurants, using React, TypeScript, elevating restaurant efficiency.`,
    tags: ["React", "TypeScript", "Odoo"],
    thumbnail: {
      srcset: KdsThumb,
      alt: $localize`Built KDS Wahalla, a performant kitchen display system for restaurants, using React, TypeScript, elevating restaurant efficiency.`,
      width: 100,
      height: 100,
    },
  }
];

export default component$(() => {
  return (
    <section id="projects" class="full-width flex flex-col rounded-b-xl bg-zinc-950 px-5 py-12 text-zinc-300 md:px-16">
      <h2 class="mt-10 text-4xl font-medium leading-[54px] tracking-tighter md:mt-12 md:text-7xl md:leading-[91px]">
        {$localize`Projects`}
      </h2>
      <h3
        class="mt-4 text-xl leading-7 text-zinc-500"
        dangerouslySetInnerHTML={$localize`Projects I've been working on lately <small>(and not so lately)</small>`}
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

import { component$ } from "@builder.io/qwik";
import ProjectCard from "~/components/project-card/project-card";

import AstromartThumb from "~/media/images/projects/astromart-01.png?w=500;900;1200&format=webp&as=srcset&imagetools";

const MOCK_PROJECTS = [
  {
    id: "1",
    slug: "",
    title: "Astromart",
    description: "A performant e-commerce template for Astro, React, TypeScript and Odoo developers",
    tags: [
      { id: "1_tag", name: "React" },
      { id: "2_tag", name: "Astro" },
      { id: "3_tag", name: "TypeScript" },
    ],
    thumbnail: {
      srcset: AstromartThumb,
      alt: "Sample Alt",
      width: 100,
      height: 100,
    },
  },
];

export default component$(() => {
  return (
    <section id="projects" class="full-width flex flex-col rounded-b-xl bg-zinc-950 px-5 py-12 md:px-16">
      <h2 class="mt-12 text-4xl font-medium leading-[54px] tracking-tighter  max-md:mt-10 md:text-7xl md:leading-[91px]">
        {$localize`Projects`}
      </h2>
      <h3
        class="mt-4 text-xl leading-7 text-zinc-500"
        dangerouslySetInnerHTML={$localize`Projects I've been working on lately <small>(and not so lately)</small>`}
      />
      <section>
        <ul class="mt-20 grid grid-cols-1 gap-10">
          {MOCK_PROJECTS.map((post) => (
            <li key={post.id}>
              <ProjectCard
                id={post.id}
                slug={post.slug}
                title={post.title}
                description={post.description}
                tags={post.tags}
                thumbnail={post.thumbnail}
              />
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
});

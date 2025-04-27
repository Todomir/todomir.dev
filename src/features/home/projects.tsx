import { component$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

import ProjectCard from "~/components/project-card/project-card";
import { getProjects } from "~/utils/projects";

export default component$(() => {
  const t = inlineTranslate();

  return (
    <section
      id="projects"
      class="full-width bg-zinc-950 px-5 py-12 text-zinc-50 md:px-16"
    >
      <h1 class="mt-10 text-4xl leading-[54px] font-medium tracking-tighter md:mt-12 md:text-7xl md:leading-[91px]">
        {t("site.links.projects.label")}
      </h1>
      <h2
        class="mt-4 text-xl leading-7"
        dangerouslySetInnerHTML={t("home.projects.description")}
      />

      <ul class="mt-20 grid grid-cols-1 gap-10">
        {getProjects().map((post) => (
          <li key={post.id}>
            <ProjectCard
              id={post.id}
              title={post.title}
              description={post.description}
              tags={post.tags}
              thumbnail={post.thumbnail}
              isCurrent={post.isCurrent}
              slug={post.slug}
            />
          </li>
        ))}
      </ul>
    </section>
  );
});

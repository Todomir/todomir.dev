import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { usePosts } from "~/content";

import About from "~/features/home/about";
import Blog from "~/features/home/blog";
import Hero from "~/features/home/hero";
import Projects from "~/features/home/projects";
import Quote from "~/features/home/quote";

export { usePosts };

export default component$(() => {
  const posts = usePosts();

  return (
    <div class="full-width content-grid relative">
      <Hero />
      <Quote />
      <div class="full-width bg-zinc-950 px-5 md:px-20">
        <hr class="w-full border-zinc-700" />
      </div>
      <About />
      <Projects />
      <Blog posts={posts.value} />
    </div>
  );
});

export const head: DocumentHead = {
  title: $localize`Abner Rodrigues - Creative Developer`,
  meta: [
    {
      name: "description",
      content: $localize`I'm a creative developer, passionate about building beautiful and accessible interfaces.`,
    },
    {
      name: "og:title",
      content: $localize`Abner Rodrigues - Creative Developer`,
    },
    {
      name: "og:description",
      content: $localize`I'm a creative developer, passionate about building beautiful and accessible interfaces.`,
    },
    {
      name: "og:image",
      content: "/assets/og/og-home.png",
    },
    {
      name: "og:url",
      content: "https://todomir.dev",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: $localize`Abner Rodrigues - Creative Developer`,
    },
  ],
};

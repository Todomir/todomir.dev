import type {
  DocumentHead,
  RequestHandler,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";

import { component$, type JSXOutput } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { Post } from "content-collections";
import { allPosts } from "content-collections";
import { translatePath } from "qwik-speak";
import { config } from "~/speak.config";


const modules: Record<string, () => JSXOutput> = import.meta.glob("/src/content/**/*.mdx", {
  eager: true,
  import: "default",
});

export const onRequest: RequestHandler = ({
  locale,
  error,
  redirect,
  params,
  pathname,
}) => {
  const { slug } = params;
  const getPath = translatePath();

  if (!locale()) throw error(404, "Page not found for requested locale");

  const post = allPosts.find((p) => p._meta.fileName.includes(slug));
  if (!post) {
    for (const supportedLocale of config.supportedLocales) {
      if (supportedLocale.lang === locale()) continue;
      const newPost = allPosts.find(
        (p) =>
          p._meta.fileName.includes(slug) && p.lang === supportedLocale.lang,
      );
      if (newPost) {
        const redirectPath = getPath(pathname, supportedLocale.lang);
        console.log(redirectPath);
        throw redirect(302, redirectPath);
      }
    }
  }
};

export const usePost = routeLoader$<Post>(({ params, locale, error }) => {
  const slug = params.slug;
  const requestedLang = locale();

  // Find ANY post matching the slug first
  const post = allPosts.find(
    (p) => p._meta.fileName.replace(".mdx", "") === slug,
  );

  if (!post) {
    // If no post found with this slug at all, it's a true 404 for the slug
    throw error(404, `Post ${slug} not found`);
  }

  // Now check if the found post's language matches the requested locale
  if (post.lang !== requestedLang) {
    // This condition indicates a mismatch like /pt-BR/blog/[english-slug]
    // During SSG, this path shouldn't exist. During runtime, onRequest handles redirection.
    // Throwing a 404 seems appropriate here as the specific URL requested is invalid.
    throw error(404, `Post ${slug} not found for locale ${requestedLang}`);
  }

  // If we reach here, the slug exists and belongs to the requested language
  return post;
});

export default component$(() => {
  const post = usePost();
  const path = `/src/content/${post.value._meta.filePath}`;
  const mod = modules[path];

  return <>{mod()}</>;
});

export const head: DocumentHead = ({ resolveValue, url }) => {
  // Use the post data loaded and validated by usePost
  const post = resolveValue(usePost);

  // If the loader threw an error (e.g., 404), Qwik City likely won't call head.
  // If it somehow does, or the value isn't ready, we might need a fallback,
  // but relying on the loader's result is the cleanest approach.
  if (!post) {
    // Should typically not happen if loader runs first and throws on error
    return { title: "Error loading post" };
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Abner Rodrigues",
    },
    description: post.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      // Use the actual requested pathname for the canonical ID
      "@id": `https://abn.ooo${url.pathname}`,
    },
  };

  return {
    title: `Blog - ${post.title}`,
    meta: [
      {
        name: "json-ld",
        content: JSON.stringify(jsonLd),
      },

      {
        name: "og:title",
        content: `${post.title}`,
      },
      {
        name: "og:description",
        content: `${post.description}`,
      },
      // Twitter

      {
        name: "twitter:title",
        content: `${post.title}`,
      },
      {
        name: "twitter:description",
        content: `${post.description}`,
      },
      {
        name: "twitter:site",
        content: "@todomir__",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  };
};

export const onStaticGenerate: StaticGenerateHandler = () => {
  return {
    params: allPosts.map((post) => ({
      slug: post._meta.fileName.replace(".mdx", ""),
      lang: post.lang === config.defaultLocale.lang ? "." : post.lang,
    })),
  };
};

import { component$ } from "@builder.io/qwik";

import BlogPost from "~/components/blog-post/blog-post";

import Post, { frontmatter } from "./post.mdx";
import Thumbnail from "./thumbnail.png?jsx";

export default component$(() => {
  return (
    <BlogPost
      tags={frontmatter.tags}
      title={frontmatter.title}
      date={frontmatter.date}
      description={frontmatter.description}
    >
      <Thumbnail q:slot="thumbnail" />
      <Post q:slot="post" />
    </BlogPost>
  );
});

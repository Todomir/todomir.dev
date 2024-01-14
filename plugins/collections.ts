/**
 * Original Source: https://github.com/rshackleton/rshackleton-qwik/tree/main/packages/vite-mdx-collections
 */
import { writeFileSync } from "node:fs";
import path from "node:path";

import type { Plugin } from "vite";

import { globSync } from "glob";
import matter from "gray-matter";
import type { ZodSchema } from "zod";
import { z } from "zod";
import { createTypeAlias, printNode, zodToTs } from "zod-to-ts";

export type Options = {
  collections: Array<{
    glob: string;
    name: string;
    schema: ZodSchema;
  }>;
};

/** MDX Collections Plugin */
export default function mdxCollectionPlugin(options: Options): Plugin {
  const virtualModuleId = "virtual:mdx-collection";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "mdxCollectionPlugin",
    buildStart() {
      const CollectionsSchema = createCollectionSchema(options.collections);

      const identifier = "Collections";
      const { node } = zodToTs(CollectionsSchema, identifier);
      const typeAlias = createTypeAlias(node, identifier);

      const typeString = printNode(typeAlias);

      const output = `${typeString}

declare module 'virtual:mdx-collection' {
  export const collections: Collections;
}`;

      writeFileSync(path.join(process.cwd(), "./src/collections.d.ts"), output);
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }

      return null;
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const rootPath = process.cwd();

        const collections: Record<string, unknown[]> = {};

        for (const { glob, name } of options.collections) {
          const results = globSync(glob, {
            cwd: rootPath,
          });

          const items = results.map((result) => {
            const mdxPath = path.join(rootPath, result);
            const slug = /.+\/(.+)\/post\.mdx$/u.exec(result)?.[1] ?? "";
            const file = matter.read(mdxPath);

            return { slug, data: file.data };
          });

          collections[name] = items;
        }

        const schema = createCollectionSchema(options.collections);

        const parsed = schema.parse(collections);

        return `export const collections = ${JSON.stringify(parsed)}`;
      }

      return null;
    },
  };
}

function createCollectionEntrySchema(schema: ZodSchema): ZodSchema {
  return z.object({
    data: schema,
    slug: z.string(),
  });
}

function createCollectionSchema(
  collections: Options["collections"],
): ZodSchema {
  let schema = z.object({});

  for (const { name, schema: baseSchema } of collections) {
    schema = schema.extend({
      [name]: z.array(createCollectionEntrySchema(baseSchema)),
    });
  }

  return schema;
}

type Collections = {
    content: {
        data: {
            date: Date;
            draft?: boolean;
            tags?: string[];
            title: string;
            description: string;
            thumbnailAlt: string;
            permalink: string;
            lang: string;
        };
        slug: string;
    }[];
};

declare module 'virtual:mdx-collection' {
  export const collections: Collections;
}
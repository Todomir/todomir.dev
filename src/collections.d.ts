type Collections = {
    content: {
        data: {
            date: Date;
            tags?: string[];
            title: string;
            description: string;
            thumbnail: {
                alt: string;
                src: string;
            };
            permalink: string;
            lang: string;
        };
        slug: string;
    }[];
};

declare module 'virtual:mdx-collection' {
  export const collections: Collections;
}
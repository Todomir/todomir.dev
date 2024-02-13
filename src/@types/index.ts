export type BlogPost = {
  date: Date;
  description: string;
  id: string;
  lang: string;
  slug: string;
  tags: string[];
  thumbnail: {
    alt: string;
    src: string;
  };
  title: string;
};

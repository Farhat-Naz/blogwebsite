export type Category =
  | "AI & Machine Learning"
  | "Physics"
  | "Biology"
  | "Medicine"
  | "Chemistry"
  | "Computer Science"
  | "Neuroscience"
  | "Climate & Environment"
  | "Mathematics"
  | "Space & Astronomy";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: Category;
  tags: string[];
  author: string;
  readingTime: string;
  image?: string;
}

export interface Post extends PostMeta {
  content: string;
}

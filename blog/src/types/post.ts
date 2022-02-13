interface Toc {
  depth: number;
  id: number;
  text: string;
}

export default interface Post {
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  tags: string;
  top_image: string;
  toc: Toc[],
  body: Object;
  dir: string;
  extension: string;
  path: string;
  slug: string;
}
export interface IBlog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  thumbnail: string;
  slug: string ;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string;
}

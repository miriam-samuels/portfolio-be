export interface IBlog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  thumbnail: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string;
}

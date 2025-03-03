import { IAuthorProps } from './author';
import { ISocialLinks } from './socials';

// ----------------------------------------------------------------------

export type IBlogCategoryProps = {
  label: string;
  path: string;
};

export type IBlogPostProps = {
  id: string;
  title: string;
  heroUrl: string;
  tags?: string[];
  createdAt: Date;
  category: string;
  coverUrl: string;
  duration: string;
  favorited: boolean;
  description: string;
  author: IAuthorProps;
  shareLinks?: ISocialLinks;
};

export interface BlogData {
  title: string;
  publishedDate: string;
  tags: string[];
  filename: string;
  image?: string;
}

export interface Blog {
  id: string;
  title: string;
  publishedBy: string;
  publishedDate: string;
  tags: string[];
  content: string;
  updatedDate: string;
  image?: string;
}

export interface BlogPostData {
  title: string;
  publishedDate: string;
  tags: string[];
  filename: string;
  image?: string;
  content: string;
}


export interface Category {
  category: string;
  defaultTags: string[];
}

export interface BlogsData {
  blogs: BlogData[];
  categories: Category[];
}

export interface BlogMetadata {
  filename: string;
  title: string;
  publishedDate: string;
  publishedBy: string;
  tags: string[];
  content: string;
  image?: string;
  updatedDate?: string;
}
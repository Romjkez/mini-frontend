export interface CreateArticleDto {
  title: string;

  content: string;

  video?: string;

  previewUrl?: string;

  tags: Array<string>;
}

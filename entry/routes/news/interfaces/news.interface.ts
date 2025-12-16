export interface SourceResponse {
  id: number;
  name: string;
}

export interface NewsResponse {
  source: SourceResponse;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

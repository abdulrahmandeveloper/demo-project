export interface SourceResponse {
  id: number | null;
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

export interface NewsFilters {
  language: string;
  publisher: string;
  boxOffice: string;
  country?: string;
  date: string;
}

export type SortOptions = "relevancy" | "popularity" | "publishedAt";

export interface NewsSearchResultsResponse {
  status: string;
  totalResults: number;
  articles: [NewsResponse];
}

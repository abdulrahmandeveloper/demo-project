export interface ParentCompanyResponse {
  name: string;
  id: number;
  logo_path: string;
}

export interface CompanyDetailsResponse {
  description: string;
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
  parent_company: ParentCompanyResponse;
}

export interface CompanySearchResultsFromTMDBResponse {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface CompanysSearchResultsFromTMDBResponse {
  page: number;
  results: CompanySearchResultsFromTMDBResponse[];
  total_pages: number;
  total_results: number;
}

export interface AlternativeCompanyName {
  name: string;
  type: string;
}

export interface AlternativeNamesOfCompaniesFromTMDBResponse {
  id: number;
  results: AlternativeCompanyName[];
}

export interface CompanyLogosFromTMDB {
  aspect_ratio: number;
  file_path: string;
  height: number;
  id: string;
  file_type: ".svg" | ".png";
  vote_average: number;
  vote_count: number;
  width: number;
}
export interface CompanyLogosFromTMDBResponse {
  id: number;
  logos: CompanyLogosFromTMDB[];
}

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

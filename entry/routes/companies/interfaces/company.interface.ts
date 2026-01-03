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

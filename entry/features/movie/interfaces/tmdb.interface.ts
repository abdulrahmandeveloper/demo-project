import {
  CollectionRespose,
  TMDBCommonMediaDataResponse,
} from "@/shared/interfaces/tmdb/tmdb.interface";

export interface TMDBMovieResponse extends TMDBCommonMediaDataResponse {
  media_type: "movie";
  title: string;
  original_title: string;
  release_date: string;
  budget: number;
  revenue: number;
  runtime: number;
  belongs_to_collection: CollectionRespose | null;
  imdb_id: string;
  video: boolean;
}

export interface TMDBMovieCastData {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
export interface TMDBMovieCrewData {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}
export interface TMDBMovieCreditResponse {
  id: number;
  cast: TMDBMovieCastData[];
  crew: TMDBMovieCrewData[];
}

export const TMDBMovieReleaseTypes = [
  "Premiere",
  "Theatrical (limited)",
  "Theatrical",
  "Digital",
  "Physical",
  "TV",
];
export interface TMDBMovieCountryReleaseDatesResponse {
  certification: string;
  descriptors: [];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}
export interface TMDBMovieReleaseDatesResultsResponse {
  iso_3166_1: string;
  release_dates: TMDBMovieCountryReleaseDatesResponse[];
}
export interface TMDBMovieReleaseDatesResponse {
  id: 550;
  results: TMDBMovieReleaseDatesResultsResponse[];
}

//tmdb response
export interface TMDBMovieProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}
export interface TMDBMovieCountryWatchProvidersResponse {
  link: string;
  free?: TMDBMovieProvider[];
  flatrate?: TMDBMovieProvider[];
  rent?: TMDBMovieProvider[];
  buy?: TMDBMovieProvider[];
  ads?: TMDBMovieProvider[];
}

export interface TMDBMovieWatchProviderCountries {
  AE?: TMDBMovieCountryWatchProvidersResponse;
  AL?: TMDBMovieCountryWatchProvidersResponse;
  AR?: TMDBMovieCountryWatchProvidersResponse;
  AT?: TMDBMovieCountryWatchProvidersResponse;
  AU?: TMDBMovieCountryWatchProvidersResponse;
  BA?: TMDBMovieCountryWatchProvidersResponse;
  BB?: TMDBMovieCountryWatchProvidersResponse;
  BE?: TMDBMovieCountryWatchProvidersResponse;
  BG?: TMDBMovieCountryWatchProvidersResponse;
  BH?: TMDBMovieCountryWatchProvidersResponse;
  BO?: TMDBMovieCountryWatchProvidersResponse;
  BR?: TMDBMovieCountryWatchProvidersResponse;
  BS?: TMDBMovieCountryWatchProvidersResponse;
  CA?: TMDBMovieCountryWatchProvidersResponse;
  CH?: TMDBMovieCountryWatchProvidersResponse;
  CL?: TMDBMovieCountryWatchProvidersResponse;
  CO?: TMDBMovieCountryWatchProvidersResponse;
  CR?: TMDBMovieCountryWatchProvidersResponse;
  CV?: TMDBMovieCountryWatchProvidersResponse;
  CZ?: TMDBMovieCountryWatchProvidersResponse;
  DE?: TMDBMovieCountryWatchProvidersResponse;
  DK?: TMDBMovieCountryWatchProvidersResponse;
  DO?: TMDBMovieCountryWatchProvidersResponse;
  EC?: TMDBMovieCountryWatchProvidersResponse;
  EE?: TMDBMovieCountryWatchProvidersResponse;
  EG?: TMDBMovieCountryWatchProvidersResponse;
  ES?: TMDBMovieCountryWatchProvidersResponse;
  FI?: TMDBMovieCountryWatchProvidersResponse;
  FJ?: TMDBMovieCountryWatchProvidersResponse;
  FR?: TMDBMovieCountryWatchProvidersResponse;
  GB?: TMDBMovieCountryWatchProvidersResponse;
  GF?: TMDBMovieCountryWatchProvidersResponse;
  GI?: TMDBMovieCountryWatchProvidersResponse;
  GR?: TMDBMovieCountryWatchProvidersResponse;
  GT?: TMDBMovieCountryWatchProvidersResponse;
  HK?: TMDBMovieCountryWatchProvidersResponse;
  HN?: TMDBMovieCountryWatchProvidersResponse;
  HR?: TMDBMovieCountryWatchProvidersResponse;
  HU?: TMDBMovieCountryWatchProvidersResponse;
  ID?: TMDBMovieCountryWatchProvidersResponse;
  IE?: TMDBMovieCountryWatchProvidersResponse;
  IL?: TMDBMovieCountryWatchProvidersResponse;
  IN?: TMDBMovieCountryWatchProvidersResponse;
  IQ?: TMDBMovieCountryWatchProvidersResponse;
  IS?: TMDBMovieCountryWatchProvidersResponse;
  IT?: TMDBMovieCountryWatchProvidersResponse;
  JM?: TMDBMovieCountryWatchProvidersResponse;
  JO?: TMDBMovieCountryWatchProvidersResponse;
  JP?: TMDBMovieCountryWatchProvidersResponse;
  KR?: TMDBMovieCountryWatchProvidersResponse;
  KW?: TMDBMovieCountryWatchProvidersResponse;
  LB?: TMDBMovieCountryWatchProvidersResponse;
  LI?: TMDBMovieCountryWatchProvidersResponse;
  LT?: TMDBMovieCountryWatchProvidersResponse;
  LV?: TMDBMovieCountryWatchProvidersResponse;
  MD?: TMDBMovieCountryWatchProvidersResponse;
  MK?: TMDBMovieCountryWatchProvidersResponse;
  MT?: TMDBMovieCountryWatchProvidersResponse;
  MU?: TMDBMovieCountryWatchProvidersResponse;
  MX?: TMDBMovieCountryWatchProvidersResponse;
  MY?: TMDBMovieCountryWatchProvidersResponse;
  MZ?: TMDBMovieCountryWatchProvidersResponse;
  NL?: TMDBMovieCountryWatchProvidersResponse;
  NO?: TMDBMovieCountryWatchProvidersResponse;
  NZ?: TMDBMovieCountryWatchProvidersResponse;
  OM?: TMDBMovieCountryWatchProvidersResponse;
  PA?: TMDBMovieCountryWatchProvidersResponse;
  PE?: TMDBMovieCountryWatchProvidersResponse;
  PH?: TMDBMovieCountryWatchProvidersResponse;
  PK?: TMDBMovieCountryWatchProvidersResponse;
  PL?: TMDBMovieCountryWatchProvidersResponse;
  PS?: TMDBMovieCountryWatchProvidersResponse;
  PT?: TMDBMovieCountryWatchProvidersResponse;
  PY?: TMDBMovieCountryWatchProvidersResponse;
  QA?: TMDBMovieCountryWatchProvidersResponse;
  RO?: TMDBMovieCountryWatchProvidersResponse;
  RS?: TMDBMovieCountryWatchProvidersResponse;
  RU?: TMDBMovieCountryWatchProvidersResponse;
  SA?: TMDBMovieCountryWatchProvidersResponse;
  SE?: TMDBMovieCountryWatchProvidersResponse;
  SG?: TMDBMovieCountryWatchProvidersResponse;
  SI?: TMDBMovieCountryWatchProvidersResponse;
  SK?: TMDBMovieCountryWatchProvidersResponse;
  SM?: TMDBMovieCountryWatchProvidersResponse;
  SV?: TMDBMovieCountryWatchProvidersResponse;
  TH?: TMDBMovieCountryWatchProvidersResponse;
  TR?: TMDBMovieCountryWatchProvidersResponse;
  TT?: TMDBMovieCountryWatchProvidersResponse;
  TW?: TMDBMovieCountryWatchProvidersResponse;
  UG?: TMDBMovieCountryWatchProvidersResponse;
  US?: TMDBMovieCountryWatchProvidersResponse;
  UY?: TMDBMovieCountryWatchProvidersResponse;
  VE?: TMDBMovieCountryWatchProvidersResponse;
  YE?: TMDBMovieCountryWatchProvidersResponse;
  ZA?: TMDBMovieCountryWatchProvidersResponse;
}
export interface TMDBMovieWatchProvidersResponse {
  id: number;
  results: TMDBMovieWatchProviderCountries;
}

export interface TMDBMovieExternalIdsResponse {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

export interface MovieRtingsData {
  country: string;
  rating: string;
}

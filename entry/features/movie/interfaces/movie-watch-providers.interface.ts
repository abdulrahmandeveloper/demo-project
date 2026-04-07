import { TMDBMovieCountryWatchProvidersResponse } from "./tmdb.interface";

export interface MovieWatchProviders {
  countryCode: string;
  data: TMDBMovieCountryWatchProvidersResponse;
}

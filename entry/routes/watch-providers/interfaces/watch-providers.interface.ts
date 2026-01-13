export interface WatchProvidersRegionsData {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export interface WatchProvidersRegionsResponse {
  results: WatchProvidersRegionsData[];
}

export const DisplayPrioritiesData: Record<string, number> = {
  CA: 6,
  AE: 1,
  AR: 3,
  AT: 4,
  AU: 10,
};

export interface TMDBMediaWatchProvidersResultsData {
  display_priorities: typeof DisplayPrioritiesData;
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
}
export interface TMDBMediaWatchProvidersResponse {
  results: TMDBMediaWatchProvidersResultsData[];
}

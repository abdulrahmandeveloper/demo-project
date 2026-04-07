import { tmdbApi } from "@/shared/lib/axios/axios";
import {
  TMDBMediaWatchProvidersResponse,
  WatchProvidersRegionsResponse,
} from "../interfaces/watch-providers.interface";

export class WatchProviders {
  constructor() {}

  async getAvailableRegionsForWatchProvidersFromTMDB(): Promise<WatchProvidersRegionsResponse> {
    const response = await tmdbApi.get(`watch/providers/regions`);
    const data = response.data;
    return data;
  }

  async getAvailableProvidersForTvFromTMDB(
    region: string | null
  ): Promise<TMDBMediaWatchProvidersResponse> {
    const response = await tmdbApi.get(`watch/providers/tv`, {
      params: { watch_region: region },
    });
    const data = response.data;
    return data;
  }

  async getAvailableProvidersForMovieFromTMDB(
    region: string | null
  ): Promise<TMDBMediaWatchProvidersResponse> {
    const response = await tmdbApi.get(`watch/providers/movie`, {
      params: { watch_region: region },
    });
    const data = response.data;
    return data;
  }
}

import { tmdbApi } from "@/shared/lib/axios/axios";
import {
  TMDBSeasonImageResponse,
  TMDBSeasonResponse,
  TMDBSeasonVideosResponse,
} from "../interfaces/tmdb.interface";

export class Season {
  seriesId: number;
  seasonNumber: number;

  constructor(seriesId: number, seasonNumber: number) {
    this.seriesId = seriesId;
    this.seasonNumber = seasonNumber;
  }

  async GetSeasonDetailsFromTMDB(): Promise<TMDBSeasonResponse> {
    const response = await tmdbApi.get(
      `/tv/${this.seriesId}/season/${this.seasonNumber}`
    );
    const data = response.data;
    return data;
  }
  async GetSeasonWatchProvidersFromTMDB(): Promise<TMDBSeasonResponse> {
    const response = await tmdbApi.get(
      `/tv/${this.seriesId}/season/${this.seasonNumber}/watch/providers`
    );
    const data = response.data;
    return data;
  }

  async GetSeasonImagesFromTMDB(
    languageCode: string | null
  ): Promise<TMDBSeasonImageResponse> {
    const response = await tmdbApi.get(
      `/tv/${this.seriesId}/season/${this.seasonNumber}/images`,
      {
        params: {
          include_image_language: languageCode,
        },
      }
    );
    const data = response.data;
    return data;
  }
  async GetSeasonVideosFromTMDB(): Promise<TMDBSeasonVideosResponse> {
    const response = await tmdbApi.get(
      `/tv/${this.seriesId}/season/${this.seasonNumber}/videos`
    );
    const data = response.data;
    return data;
  }
}

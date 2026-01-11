import { tmdbApi } from "@/shared/lib/axios/axios";
import {
  TMDBEpisodeImagesResponse,
  TMDBEpisodeVideosResponse,
} from "../interfaces/tmdb.interface";

export class EpisodeService {
  seriesId: number;
  seasonNumber: number;
  episodeNumber: number;
  constructor(seriesId: number, seasonNumber: number, episodeNumber: number) {
    this.seriesId = seriesId;
    this.seasonNumber = seasonNumber;
    this.episodeNumber = episodeNumber;
  }

  async getEpisodeDetailsFromTMDB() {
    const response = await tmdbApi.get(
      `/tv/${this.seriesId}/season/${this.seasonNumber}/episode/${this.episodeNumber}`
    );
    const data = response.data;
    return data;
  }
  async getEpisodeImagesFromTMDB(): Promise<TMDBEpisodeImagesResponse> {
    const response = await tmdbApi.get(
      `/tv/${this.seriesId}/season/${this.seasonNumber}/episode/${this.episodeNumber}/images`
    );
    const data = response.data;
    return data;
  }
  async getEpisodeVideosFromTMDB(): Promise<TMDBEpisodeVideosResponse> {
    const response = await tmdbApi.get(
      `/tv/${this.seriesId}/season/${this.seasonNumber}/episode/${this.episodeNumber}/videos`
    );
    const data = response.data;
    return data;
  }
}

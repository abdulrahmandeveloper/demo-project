"use client";

import { useEffect, useState } from "react";
import { movieService } from "../services/tmdb.service";
import {
  MovieRtingsData,
  TMDBMovieCastData,
  TMDBMovieCountryWatchProvidersResponse,
  TMDBMovieCrewData,
  TMDBMovieExternalIdsResponse,
  TMDBMovieReleaseDatesResultsResponse,
  TMDBMovieResponse,
} from "../interfaces/tmdb.interface";
import {
  TMDBBackdropsData,
  TMDBLogosData,
  TMDBPostersData,
} from "@/shared/interfaces/tmdb/tmdb.interface";

interface MovieDescriptionPageProps {
  movieId: number;
}
const MovieDescriptionPage = ({ movieId }: MovieDescriptionPageProps) => {
  console.log(movieId);
  const [movieDetails, setMovieDetails] = useState<TMDBMovieResponse | null>(
    null
  );
  const [cast, setCast] = useState<TMDBMovieCastData[]>([]);
  const [crew, setCrew] = useState<TMDBMovieCrewData[]>([]);

  const [posters, setPosters] = useState<TMDBPostersData[]>([]);
  const [backdrops, setBackdrops] = useState<TMDBBackdropsData[]>([]);
  const [logos, setLogos] = useState<TMDBLogosData[]>([]);
  const [providers, setProviders] =
    useState<TMDBMovieCountryWatchProvidersResponse>();
  const [externalIds, setExternalIds] =
    useState<TMDBMovieExternalIdsResponse>();
  const [contentRatings, setContentRatings] = useState<MovieRtingsData[]>([]);
  const [movieReleaseDates, setMovieReleaseDates] = useState<
    TMDBMovieReleaseDatesResultsResponse[]
  >([]);

  //loading state
  const [loading, setLoading] = useState<boolean>(true);

  const movieServiceObject = new movieService(movieId);
  useEffect(() => {
    const fetchData = async () => {
      const movieDetails = await movieServiceObject.getMovieDetailsFromTMDB();
      if (movieDetails.title.trim()) {
        setMovieDetails(movieDetails);
      }
      const creditData = await movieServiceObject.getMovieCreditsFromTMDB();
      if (creditData.cast.length > 0 || creditData.crew.length > 0) {
        setCast(creditData.cast);
        setCrew(creditData.crew);
      }
      const gallery = await movieServiceObject.getMovieGalleryFromTMDB();
      if (
        gallery.backdrops.length > 0 ||
        gallery.logos.length > 0 ||
        gallery.posters.length > 0
      ) {
        setPosters(gallery.posters);
        setBackdrops(gallery.backdrops);
        setLogos(gallery.logos);
      }
      const providersData =
        await movieServiceObject.getMovieProvidersFromTMDB();
      if (providersData.results) {
        setProviders(providersData.results);
      }
      const externalIdData =
        await movieServiceObject.getMovieExternalIdsFromTMDB();
      if (externalIdData) {
        setExternalIds(externalIdData);
      }

      const contentratingData =
        await movieServiceObject.getMovieContentRatingsFromTMDB();
      if (contentratingData.length > 0) {
        setContentRatings(contentratingData);
      }

      const releasesData =
        await movieServiceObject.getMovieReleaseDatesFromTMDB();
      if (releasesData) {
        setMovieReleaseDates(releasesData.results);
      }
      setLoading(false);
    };
    fetchData();
  }, [movieId]);
  return (
    <div>
      {loading && <>loading</>}
      {!loading && <div></div>}
    </div>
  );
};

export default MovieDescriptionPage;

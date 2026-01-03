// app/api/tmdb/movies/top-rated/route.ts  ← Note: use top-rated, not top_rated
import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import { TMDBSeriesResponse } from "@/features/series/interfaces/tmdb.interface";
import { tmdbApi } from "@/shared/lib/axios/axios";
import { NextRequest, NextResponse } from "next/server";

// ✅ Must be uppercase "GET", not "Get"
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  //const page = searchParams.get("page") || "1"; // ✅ Default to "1"
  const query = searchParams.get("query");

  //fetching and extracting total pages
  const moviesTopRatedResponse = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/top_rated?page=1&language=en-US`
  );
  const seriesTopRatedResponse = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/tv/top_rated?page=1&language=en-US`
  );
  const moviesTopRated = moviesTopRatedResponse.data;
  const seriesTopRated = seriesTopRatedResponse.data;

  const moviesTopRatedTotalPages = moviesTopRated.total_pages;
  const seriesTopRatedTotalPages = seriesTopRated.total_pages;

  //creating an array by the length each total page
  const moviesTopRatedPagesArray: number[] = Array.from({
    length: moviesTopRatedTotalPages,
  }).map((_, index) => index + 1);
  const seriesTopRatedPagesArray: number[] = Array.from({
    length: seriesTopRatedTotalPages,
  }).map((_, index) => index + 1);

  const moviesResponse = await Promise.all(
    moviesTopRatedPagesArray
      .filter((p) => p <= 500)
      .map(async (number) => {
        const response = await fetch(
          `/api/tmdb/movies/top-rated?page=${number}`
        );
        const data = response.json();
        return data;
      })
  );

  const movieList: TMDBMovieResponse[] = moviesResponse.map(
    (movie) => movie.results
  );

  const seriesResponse = await Promise.all(
    seriesTopRatedPagesArray
      .filter((p) => p <= 500)
      .map(async (number) => {
        const response = await fetch(
          `/api/tmdb/movies/top-rated?page=${number}`
        );
        const data = await response.json();
        return data;
      })
  );

  const seriesList: TMDBSeriesResponse[] = seriesResponse.map(
    (series) => series.results
  );

  const companies = [
    {
      companyName: { id: 0, name: "" },
      voteCount: 0,
      voteAverage: 0,
      revenue: 0,
      mediaType: "",
      popularity: "",
    },
  ];

  movieList.map((movie) =>
    companies.push({
      companyName: movie.production_companies.map((company)=>{id:company.id,name:company.name}),
      voteCount: movie,
      voteAverage: movie,
      revenue: movie,
      mediaType: movie,
      popularity: movie,
    })
  );
  seriesList.map((series) =>
    companies.push({
      companyName: "",
      voteCount: 0,
      voteAverage: 0,
      revenue: 0,
      mediaType: "",
      popularity: "",
    })
  );
}

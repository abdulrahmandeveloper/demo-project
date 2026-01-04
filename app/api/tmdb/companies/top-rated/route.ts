import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import { TMDBSeriesResponse } from "@/features/series/interfaces/tmdb.interface";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  //const page = searchParams.get("page")
  const query = searchParams.get("query");

  const baseUrl =
    process.env.BASE_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000");

  try {
    //fetching and extracting total pages
    const moviesTopRatedResponse = await fetch(
      `${process.env.TMDB_BASE_URL}/movie/top_rated?page=1&language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );
    const seriesTopRatedResponse = await fetch(
      `${process.env.TMDB_BASE_URL}/tv/top_rated?page=1&language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );
    const moviesTopRated = await moviesTopRatedResponse.json();
    const seriesTopRated = await seriesTopRatedResponse.json();

    const moviesTopRatedTotalPages = moviesTopRated.total_pages;
    const seriesTopRatedTotalPages = seriesTopRated.total_pages;

    //works until here
    console.log("seriesTopRatedTotalPages : ", seriesTopRatedTotalPages);

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
            `${baseUrl}/api/tmdb/movies/top-rated?page=${number}`
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
            `${baseUrl}/api/tmdb/series/top-rated?page=${number}`
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
        companyName: [{ id: 0, name: "" }],
        voteCount: 0,
        voteAverage: 0,
        revenue: 0,
        mediaType: "",
        popularity: 0,
      },
    ];

    movieList.map((movie) =>
      companies.push({
        companyName: movie.production_companies.map((company) => {
          return { id: company.id, name: company.name };
        }),
        voteCount: movie.vote_count,
        voteAverage: movie.vote_average,
        revenue: movie.revenue,
        mediaType: movie.media_type,
        popularity: movie.popularity,
      })
    );
    seriesList.map((series) =>
      companies.push({
        companyName: series.production_companies.map((company) => {
          return { id: company.id, name: company.name };
        }),
        voteCount: series.vote_count,
        voteAverage: series.vote_average,
        revenue: 0,
        mediaType: series.media_type,
        popularity: series.popularity,
      })
    );

    return NextResponse.json(companies);
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        message: e.message ?? "failed",
      },
      { status: 400 }
    );
  }
}

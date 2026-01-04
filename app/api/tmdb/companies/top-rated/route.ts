import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import { TMDBSeriesResponse } from "@/features/series/interfaces/tmdb.interface";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  //const page = searchParams.get("page")
  const query = searchParams.get("query");

  /**
 *   const baseUrl =
    process.env.TMDB_BASE_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000");

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
 */

  try {
    //works until here
    const moviesTopRatedPagesToFetch = 4;
    const seriesTopRatedPagesToFetch = 4;

    //creating an array by the length each total page
    const moviesTopRatedPagesArray: number[] = Array.from({
      length: moviesTopRatedPagesToFetch,
    }).map((_, index) => index + 1);
    const seriesTopRatedPagesArray: number[] = Array.from({
      length: seriesTopRatedPagesToFetch,
    }).map((_, index) => index + 1);

    const moviesResponse = await Promise.all(
      moviesTopRatedPagesArray
        .filter((p) => p <= 500)
        .map(async (number) => {
          const response = await fetch(
            `${process.env.TMDB_BASE_URL}/movie/top_rated?page=${number}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
              },
            }
          );
          const data = await response.json();
          return data;
        })
    );

    const movieList: TMDBMovieResponse[] = moviesResponse.map(
      (movie) => movie.results
    );

    const topRatedMoviesRequiredData = movieList
      .flatMap((results) => results)
      .map((movie) => {
        return { id: movie.id, name: movie.title };
      });

    const seriesResponse = await Promise.all(
      seriesTopRatedPagesArray
        .filter((p) => p <= 500)
        .map(async (number) => {
          const response = await fetch(
            `${process.env.TMDB_BASE_URL}/tv/top_rated?page=${number}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
              },
            }
          );
          const data = await response.json();
          return data;
        })
    );

    const seriesList: TMDBSeriesResponse[] = seriesResponse.map(
      (series) => series.results
    );

    const topRatedSeriesRequiredData = seriesList
      .flatMap((results) => results)
      .map((series) => {
        return { id: series.id, name: series.name };
      });

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

    const moviesFullData: TMDBMovieResponse[] = await Promise.all(
      topRatedMoviesRequiredData.map(async (movie) => {
        const movieResponse = await fetch(
          `${process.env.TMDB_BASE_URL}/movie/${movie.id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
          }
        );
        const data = await movieResponse.json();
        return data;
      })
    );

    const seriesFullData: TMDBSeriesResponse[] = await Promise.all(
      topRatedSeriesRequiredData.map(async (series) => {
        const seriesResponse = await fetch(
          `${process.env.TMDB_BASE_URL}/tv/${series.id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
          }
        );
        const data: TMDBSeriesResponse = await seriesResponse.json();
        return data;
      })
    );

    moviesFullData.map((movie) =>
      companies.push({
        companyName: movie.production_companies
          ? movie.production_companies.map((company) => {
              return { id: company.id, name: company.name };
            })
          : [{ id: 0, name: "" }],
        voteCount: movie.vote_count,
        voteAverage: movie.vote_average,
        revenue: movie.revenue,
        mediaType: "movie",
        popularity: movie.popularity,
      })
    );

    seriesFullData.map((series) =>
      companies.push({
        companyName: series.production_companies
          ? series.production_companies.map((company) => {
              return { id: company.id, name: company.name };
            })
          : [{ id: 0, name: "" }],
        voteCount: series.vote_count,
        voteAverage: series.vote_average,
        revenue: 0,
        mediaType: "series",
        popularity: series.popularity,
      })
    );

    // doing the giant one, filtering and calculating companies.
    const filteredUniqueCompanyNames = new Set<string>();
    companies.map((company) =>
      company.companyName.map((nameAndId) =>
        filteredUniqueCompanyNames.add(nameAndId.name)
      )
    );
    /**
     * console.log(
      "filteredUniqueCompanyNames: ",
      filteredUniqueCompanyNames.forEach((name) => console.log(name))
    );
    console.log("companies: ", companies);
     */

    //combined medias, becuse we are dealing with media based on companies
    //const combinedTopMediaContentList = [...seriesFullData, ...moviesFullData];

    const topCompaniesList = handleFilteringCompaniesDataFromDIfferentMedieas(
      moviesFullData,
      seriesFullData,
      filteredUniqueCompanyNames
    );

    return NextResponse.json(topCompaniesList);
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

export type filteredCompaniesListTypes = [
  {
    companyName: string;
    moviesProduced?: [
      {
        name: string;
        id: number;
        vote_average: number;
        vote_count: number;
        popularity: number;
        mediaType: "movie";
      }
    ];
    seriesProduced?: [
      {
        name: string;
        id: number;
        vote_average: number;
        vote_count: number;
        popularity: number;
        mediaType: "series";
      }
    ];
  }
];

function handleFilteringCompaniesDataFromDIfferentMedieas(
  movieMediaList: TMDBMovieResponse[],
  seriesMediaList: TMDBSeriesResponse[],
  companiesList: Set<string>
) {
  const filteredMoviesCompaniesList: filteredCompaniesListTypes = [
    {
      companyName: "",
      moviesProduced: {
          name: "",
          id: 0,
          vote_average: 0,
          vote_count: 0,
          popularity: 0,
          mediaType: "movie",
        }[
      ],
    },
  ];

  //loop logic for movie lists
  for (let i = 0; i < movieMediaList.length; i++) {
    const productionCompaniesNumber =
      movieMediaList[i].production_companies.length;

    const averageShareOfCompaniesForVoteCount =
      movieMediaList[i].vote_average / productionCompaniesNumber;
    const averageShareOfCompaniesForVoteAverage =
      movieMediaList[i].vote_count / productionCompaniesNumber;
    const averageShareOfCompaniesForPopularity =
      movieMediaList[i].popularity / productionCompaniesNumber;

    //media related data
    movieMediaList[i].production_companies.map((company) => {
      if (Boolean(company.name) === companiesList.has(company.name)) {
        const name = movieMediaList[i];

        console.log(i, " ", company.name);
        filteredMoviesCompaniesList.push({ companyName: company.name,moviesProduced:{} });
      }
    });
  }

  //loop logic for series list
  const filteredSeriesCompaniesList: filteredCompaniesListTypes = [
    {
      companyName: "",
      moviesProduced: [
        {
          name: "",
          id: 0,
          vote_average: 0,
          vote_count: 0,
          popularity: 0,
          mediaType: "movie",
        },
      ],
    },
  ];

  for (let i = 0; i < seriesMediaList.length; i++) {
    const productionCompaniesNumber =
      seriesMediaList[i].production_companies.length;

    const averageShareOfCompaniesForVoteCount =
      seriesMediaList[i].vote_average / productionCompaniesNumber;
    const averageShareOfCompaniesForVoteAverage =
      seriesMediaList[i].vote_count / productionCompaniesNumber;
    const averageShareOfCompaniesForPopularity =
      seriesMediaList[i].popularity / productionCompaniesNumber;

    seriesMediaList[i].production_companies.map((company) => {
      if (Boolean(company.name) === companiesList.has(company.name)) {
        console.log(i, " ", company.name);
        filteredSeriesCompaniesList.push({});
      }
    });
  }
}

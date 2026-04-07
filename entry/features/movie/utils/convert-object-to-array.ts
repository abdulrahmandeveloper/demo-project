import { MovieWatchProviders } from "../interfaces/movie-watch-providers.interface";
import { TMDBMovieWatchProviderCountries } from "../interfaces/tmdb.interface";

export const convertWatchProviderstObjectToArray = (
  objectCountries: TMDBMovieWatchProviderCountries
): MovieWatchProviders[] => {
  const newData: MovieWatchProviders[] = [];
  Object.entries(objectCountries)
    .filter(
      ([, value]) =>
        value &&
        (value.free || value.flatrate || value.rent || value.buy || value.ads)
    )
    .map(([code, value]) =>
      newData.push({
        countryCode: code,
        data: {
          link: value!.link,
          free: value!.free,
          flatrate: value!.flatrate,
          rent: value!.rent,
          buy: value!.buy,
          ads: value!.ads,
        },
      })
    );
  return newData;
};

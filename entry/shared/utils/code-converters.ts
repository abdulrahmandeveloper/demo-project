import {
  countriesIso_3166_1Codes,
  countriesISO_639_1Codes,
} from "../constants/languages-countries.constants";

// using lowercase country codes, this function is needed
export const convertOriginalCounryName = (code: string): string => {
  const language: string =
    countriesIso_3166_1Codes[code as keyof typeof countriesIso_3166_1Codes] ||
    code;

  return language;
};

//for using iso_3166_1 country codes, this function is needed
export const translateCountryCodeToCountryName = (code: string): string => {
  const countryName = countriesISO_639_1Codes[code];

  return countryName ?? code;
};

import { languageCodes } from "../constants/languages-countries.constants";

export const DetectOriginalCounryName = (code: string): string => {
  const language: string =
    languageCodes[code as keyof typeof languageCodes].name || code;

  return language;
};

export const tmdbCountryCodes = [
  { name: "English", value: "en" },
  { name: "French", value: "fr" },
  { name: "Spanish", value: "es" },
  { name: "Russian", value: "ru" },
  { name: "German", value: "de" },
  { name: "Japanese", value: "ja" },
  { name: "Korean", value: "ko" },
  { name: "Hindi", value: "hi" },
  { name: "Portuguese", value: "pt" },
  { name: "Tamil", value: "ta" },
  { name: "Telugu", value: "te" },
  { name: "Malay", value: "ms" },
  { name: "Ukrainian", value: "uk" },
  { name: "Turkish", value: "tr" },
];

export const tmdbRating = [
  { value: null, name: "Any rating" },
  { value: "1", name: "1+ " },
  { value: "2", name: "2+ " },
  { value: "3", name: "3+ " },
  { value: "4", name: "4+ " },
  { value: "5", name: "5+ " },
  { value: "6", name: "6+ " },
  { value: "7", name: "7+ " },
  { value: "8", name: "8+ " },
  { value: "9", name: "9+ " },
];

export const countryNameCodes: Record<string, string> = {
  US: "United States of America",
  GB: "United Kingdom",
  FR: "France",
  DE: "Germany",
  IT: "Italy",
  ES: "Spain",
  JP: "Japan",
  KR: "South Korea",
  CN: "China",
  CA: "Canada",
  AU: "Australia",
  RU: "Russia",
  TR: "Turkey",
  IR: "Iran",
  IQ: "Iraq",
  SA: "Saudi Arabia",
  AE: "United Arab Emirates",
  EG: "Egypt",
  BR: "Brazil",
  AR: "Argentina",
  MX: "Mexico",
  IN: "India",
};

export const TMDBSeriesTypes = {
  Documentary: " with_type=0 ", // Documentary
  News: "with_type=1", // News
  Miniseries: "with_type=2", // Miniseries ✅
  Reality: "with_type=3", // Reality
  Scripted: "with_type=4", // Scripted
  "Talk Show": "with_type=5", // Talk Show
  Video: "with_type=6", // Video
};

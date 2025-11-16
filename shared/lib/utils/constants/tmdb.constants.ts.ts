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

export const tmdbTvGenres = [
  { value: null, name: "All genres" },
  { value: 10759, name: "Action & Adventure" },
  { value: 16, name: "Animation" },
  { value: 35, name: "Comedy" },
  { value: 80, name: "Crime" },
  { value: 99, name: "Documentary" },
  { value: 18, name: "Drama" },
  { value: 10751, name: "Family" },
  { value: 10762, name: "Kids" },
  { value: 9648, name: "Mystery" },
  { value: 10763, name: "News" },
  { value: 10764, name: "Reality" },
  { value: 10765, name: "Sci-Fi & Fantasy" },
  { value: 10766, name: "Soap" },
  { value: 10767, name: "Talk" },
  { value: 10768, name: "War & Politics" },
  { value: 37, name: "Western" },
];

export const tmdbContentRatings = [
  { value: "TV-Y", name: "All Children" },
  { value: "TV-Y7", name: "Directed to Older Children (7+)" },
  { value: "TV-G", name: "General Audience" },
  { value: "TV-PG", name: "Parental Guidance Suggested" },
  { value: "TV-14", name: "Parents Strongly Cautioned (14+)" },
  { value: "TV-MA", name: "Mature Audience Only (17+)" },
  { value: "NR", name: "Not Rated" },
];

export const tmdbRuntimeFilters = [
  { value: null, name: "Any time" },

  {
    name: "0-30 minutes",
    value: "with_runtime.gte=1&with_runtime.lte=30",
  },
  {
    name: "30-45 minutes",
    value: "with_runtime.gte=30&with_runtime.lte=45",
  },
  {
    name: "46-60 minutes",
    value: "with_runtime.gte=46&with_runtime.lte=60",
  },
  {
    name: "61-90 minutes",
    value: "with_runtime.gte=61&with_runtime.lte=90",
  },
  {
    name: "91-120 minutes",
    value: "with_runtime.gte=91&with_runtime.lte=120",
  },
  {
    name: "121 minutes and above",
    value: "with_runtime.gte=121",
  },
];

export const tmdbYearsRange = [
  { value: null, name: "Any years" },

  {
    name: "1950s - 1970s",
    value: "first_air_date.gte=1950-01-01&first_air_date.lte=1970-12-31",
  },
  {
    name: "1970s - 1980s",
    value: "first_air_date.gte=1971-01-01&first_air_date.lte=1980-12-31",
  },
  {
    name: "1980s - 1990s",
    value: "first_air_date.gte=1981-01-01&first_air_date.lte=1990-12-31",
  },
  {
    name: "1990s - 2000s",
    value: "first_air_date.gte=1991-01-01&first_air_date.lte=2000-12-31",
  },
  {
    name: "2000s - 2010s",
    value: "first_air_date.gte=2001-01-01&first_air_date.lte=2010-12-31",
  },
  {
    name: "2010s - present",
    value: "first_air_date.gte=2011-01-01",
  },
];

export const tmdbRating = [
  { value: null, name: "Any ratings" },

  { value: "vote_average.gte=1", name: "1+" },
  { value: "vote_average.gte=2", name: "2+" },
  { value: "vote_average.gte=3", name: "3+" },
  { value: "vote_average.gte=4", name: "4+" },
  { value: "vote_average.gte=5", name: "5+" },
  { value: "vote_average.gte=6", name: "6+" },
  { value: "vote_average.gte=7", name: "7+" },
  { value: "vote_average.gte=8", name: "8+" },
  { value: "vote_average.gte=9", name: "9+" },
];

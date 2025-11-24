export const tmdbMovieGenres = [
  { value: null, name: "All genres" },
  { value: 28, name: "Action" },
  { value: 12, name: "Adventure" },
  { value: 16, name: "Animation" },
  { value: 35, name: "Comedy" },
  { value: 80, name: "Crime" },
  { value: 99, name: "Documentary" },
  { value: 18, name: "Drama" },
  { value: 10751, name: "Family" },
  { value: 14, name: "Fantasy" },
  { value: 36, name: "History" },
  { value: 27, name: "Horror" },
  { value: 10402, name: "Music" },
  { value: 9648, name: "Mystery" },
  { value: 10749, name: "Romance" },
  { value: 878, name: "Science Fiction" },
  { value: 10770, name: "TV Movie" },
  { value: 53, name: "Thriller" },
  { value: 10752, name: "War" },
  { value: 37, name: "Western" },
];

export const tmdbMovieContentRatings = [
  { value: null, name: "Any Rating" },
  { value: "G", name: "General Audiences" },
  { value: "PG", name: "Parental Guidance" },
  { value: "PG-13", name: "Parents Strongly Cautioned (13+)" },
  { value: "R", name: "Restricted (17+)" },
  { value: "NC-17", name: "Adults Only (18+)" },
  { value: "NR", name: "Not Rated" },
];

export const tmdbMovieRuntimeFilters = [
  { value: null, name: "Any length" },
  {
    name: "Under 60 minutes",
    value: "with_runtime.lte=60",
  },
  {
    name: "60-90 minutes",
    value: "with_runtime.gte=60&with_runtime.lte=90",
  },
  {
    name: "91-120 minutes",
    value: "with_runtime.gte=91&with_runtime.lte=120",
  },
  {
    name: "121-150 minutes",
    value: "with_runtime.gte=121&with_runtime.lte=150",
  },
  {
    name: "151-180 minutes",
    value: "with_runtime.gte=151&with_runtime.lte=180",
  },
  {
    name: "Over 180 minutes",
    value: "with_runtime.gte=181",
  },
];

export const tmdbMovieYearsRange = [
  { value: null, name: "Any year" },
  {
    name: "1950s - 1970s",
    value:
      "primary_release_date.gte=1950-01-01&primary_release_date.lte=1970-12-31",
  },
  {
    name: "1970s - 1980s",
    value:
      "primary_release_date.gte=1971-01-01&primary_release_date.lte=1980-12-31",
  },
  {
    name: "1980s - 1990s",
    value:
      "primary_release_date.gte=1981-01-01&primary_release_date.lte=1990-12-31",
  },
  {
    name: "1990s - 2000s",
    value:
      "primary_release_date.gte=1991-01-01&primary_release_date.lte=2000-12-31",
  },
  {
    name: "2000s - 2010s",
    value:
      "primary_release_date.gte=2001-01-01&primary_release_date.lte=2010-12-31",
  },
  {
    name: "2010s - present",
    value: "primary_release_date.gte=2011-01-01",
  },
];

// Popularity sorting options for movies
export const tmdbMovieSortOptions = [
  { value: null, name: "Default" },
  { value: "popularity.desc", name: "Most Popular" },
  { value: "popularity.asc", name: "Least Popular" },
  { value: "release_date.desc", name: "Newest First" },
  { value: "release_date.asc", name: "Oldest First" },
  { value: "vote_average.desc", name: "Highest Rated" },
  { value: "vote_average.asc", name: "Lowest Rated" },
  { value: "revenue.desc", name: "Highest Revenue" },
  { value: "title.asc", name: "Title (A-Z)" },
  { value: "title.desc", name: "Title (Z-A)" },
];

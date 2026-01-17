"use client";

import { useEffect, useState } from "react";
import { movieService } from "../services/tmdb.service";
import {
  MovieRtingsData,
  TMDBMovieCastData,
  TMDBMovieCrewData,
  TMDBMovieExternalIdsResponse,
  TMDBMovieProvider,
  TMDBMovieReleaseDatesResultsResponse,
  TMDBMovieResponse,
  TMDBMovieWatchProvidersResponse,
} from "../interfaces/tmdb.interface";
import {
  TMDBBackdropsData,
  TMDBLogosData,
  TMDBPostersData,
} from "@/shared/interfaces/tmdb/tmdb.interface";
import { Separator } from "@/shared/components/ui/separator";
import {
  generalInformationGroupsContainerClassname,
  generalInformationGroupsTitleContainerClassname,
  sectionHeadersClassname,
} from "@/shared/constants/styles-constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown } from "lucide-react";
import PersonInfoCard from "@/routes/people/components/person-info-card";
import { SeriesDetailsPagefilterSelectionGroup } from "@/shared/components/filter/series-details-page-filter-selection-group";
import { ComboboxContainer } from "@/shared/components/custom-ui/containers/combobox-container";
import { movieDetailsPageSections } from "../constants/movie-details.constants";
import { convertOriginalCounryName } from "@/shared/utils/code-converters";
import { ExternalIdsList } from "@/shared/components/external-ids-list";
import { SeriesDetailsImageCard } from "@/shared/components/card/media-gallery-images-card";
import { EmptyMessage } from "@/shared/components/empty-message";
import { TMDBMovieReleaseTypes } from "../interfaces/tmdb.interface";
import { MovieWatchProviders } from "../interfaces/movie-watch-providers.interface";
import MediaDetailsPageSkeleton from "@/shared/components/skeletons/media-details-skeleton";

interface MovieDescriptionPageProps {
  movieId: number;
}
const MovieDescriptionPage = ({ movieId }: MovieDescriptionPageProps) => {
  const [movieDetails, setMovieDetails] = useState<TMDBMovieResponse | null>(
    null
  );
  //
  const [cast, setCast] = useState<TMDBMovieCastData[]>([]);
  const [showCastSection, setShowCastSection] = useState<boolean>(true);
  const [crew, setCrew] = useState<TMDBMovieCrewData[]>([]);
  const [showCrewSection, setShowCrewSection] = useState<boolean>(true);
  //
  const [posters, setPosters] = useState<TMDBPostersData[]>([]);
  const [backdrops, setBackdrops] = useState<TMDBBackdropsData[]>([]);
  const [logos, setLogos] = useState<TMDBLogosData[]>([]);
  const [showPostersSection, setShowPostersSection] = useState<boolean>(true);
  const [showBackdropsSection, setShowBackdropsSection] =
    useState<boolean>(true);
  const [showLogosSection, setShowLogosSection] = useState<boolean>(true);

  //gallery section filter states
  //poster
  const [posterLanguageValue, setPosterLanguageValue] = useState<string | null>(
    null
  );
  const [postervotesValue, setPosterVotesValue] = useState<number | null>(null);
  const [posterRateValue, setPosterRateValue] = useState<number | null>(null);

  //backdrops
  const [backdropLanguageValue, setBackdropLanguageValue] = useState<
    string | null
  >(null);
  const [backdropvotesValue, setBackdropVotesValue] = useState<number | null>(
    null
  );
  const [backdropRateValue, setBackdropRateValue] = useState<number | null>(
    null
  );

  //logo
  const [logoLanguageValue, setlogoLanguageValue] = useState<string | null>(
    null
  );
  const [logoVoteValue, setlogoVotesValue] = useState<number | null>(null);
  const [logoRateValue, setlogoRateValue] = useState<number | null>(null);

  //
  const [providers, setProviders] = useState<MovieWatchProviders[]>([]);
  const [showProvidersSection, setShowProvidersSection] =
    useState<boolean>(true);
  //
  const [externalIds, setExternalIds] =
    useState<TMDBMovieExternalIdsResponse>();
  const [contentRatings, setContentRatings] = useState<MovieRtingsData[]>([]);
  const [movieReleaseDates, setMovieReleaseDates] = useState<
    TMDBMovieReleaseDatesResultsResponse[]
  >([]);

  //loading state
  const [loading, setLoading] = useState<boolean>(true);

  console.log(providers);
  console.log("content ratingS: ", contentRatings);

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
      if (providersData.length > 0) {
        setProviders(providersData);
      } else setProviders([]);
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

  const generalInfoTextsClassnames = "text-xl opacity-70 w-full ";
  return (
    <div className="w-9/10 mx-auto">
      {loading && <MediaDetailsPageSkeleton />}
      {!loading && (
        <div>
          <div className="">
            <div className="flex justify-between">
              <h1 className={sectionHeadersClassname}>
                Details Of Movie: {movieDetails?.title}
              </h1>
              <div className="flex items-center mx-5">
                <ComboboxContainer
                  triggerTitle="Go to Section..."
                  values={movieDetailsPageSections}
                  searchPlaceholder="Search Seactions.."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 bg-card p-4 rounded-lg my-5">
              <div
                className={
                  generalInformationGroupsContainerClassname +
                  " " +
                  generalInfoTextsClassnames
                }
              >
                <h1 className={generalInformationGroupsTitleContainerClassname}>
                  Movie Details
                </h1>
                <div className="my-2">
                  <Separator />
                </div>
                <div className="">
                  {" "}
                  <p className="">
                    Original Name: {movieDetails?.original_title}
                  </p>
                  <p className="">Movie length: {movieDetails?.runtime} mins</p>
                  <p className="">
                    Is adultry: {movieDetails?.adult ? "Yes" : "No"}
                  </p>
                  <p className="">
                    Media type:{" "}
                    {movieDetails?.media_type === "movie" ? "Movie" : "N/A"}
                  </p>
                  <div className="">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full my-0"
                    >
                      <AccordionItem value={"alternative_names"}>
                        <AccordionTrigger className="text-xl hover:no-underline lg:mr-5 cursor-pointer">
                          Spoken langages:
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-1">
                          {movieDetails?.spoken_languages?.length > 0 ? (
                            <div className="text-xl opacity-70 flex flex-col gap-1">
                              {movieDetails?.spoken_languages?.map(
                                (language) => (
                                  <p key={language.iso_639_1}>
                                    {" "}
                                    - {language.name}
                                  </p>
                                )
                              )}
                            </div>
                          ) : (
                            "Unknown"
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  {movieDetails?.tagline.trim() && (
                    <p className="">
                      Movie tagline: <br />{" "}
                      <p className="flex mx-auto w-full">
                        &quot; {movieDetails?.tagline} &quot;
                      </p>
                    </p>
                  )}
                </div>
              </div>
              <div
                className={
                  generalInformationGroupsContainerClassname +
                  " " +
                  generalInfoTextsClassnames
                }
              >
                <h1 className={generalInformationGroupsTitleContainerClassname}>
                  TMDB Informations
                </h1>
                <div className="my-2">
                  <Separator />
                </div>
                <div className="">
                  {" "}
                  <p className="">
                    total votes: {movieDetails?.vote_count} votes
                  </p>
                  <p className="">
                    average votes: {movieDetails?.vote_average} avg
                  </p>
                  <p className="">ID: {movieDetails?.id}</p>
                  <p className="">
                    revenue:{" "}
                    {movieDetails?.revenue === 0
                      ? "Unknown"
                      : `${movieDetails?.revenue} USD`}
                  </p>
                  <p className="">
                    budget:{" "}
                    {movieDetails?.budget === 0
                      ? "Unknown"
                      : `${movieDetails?.budget} USD`}
                  </p>
                  <p className="">
                    collections:{" "}
                    {movieDetails?.belongs_to_collection?.name.trim()
                      ? movieDetails?.belongs_to_collection?.name
                      : "N/A"}
                  </p>
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="my-5">
            <Separator />
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="" id="cast">
              <div className="flex justify-between items-center my-2">
                <h1 className="my-2 text-2xl font-serif">Cast</h1>
                <Button
                  variant={"outline"}
                  onClick={() => setShowCastSection(!showCastSection)}
                >
                  <ChevronDown className="shrink-0 translate-y-0.5 transition-transform duration-200" />{" "}
                  {showCastSection ? "Collapse" : "Open"}
                </Button>
              </div>
              {showCastSection && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cast.map((cast, index) => {
                    return (
                      <div className="" key={index}>
                        <PersonInfoCard
                          containerClassName={""}
                          personImage={cast.profile_path}
                          name={cast.name}
                          id={cast.id}
                          originalName={cast.original_name}
                          gender={cast.gender}
                          role={cast.known_for_department}
                          popular={cast.popularity}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="" id="crew">
              <div className="flex justify-between items-center my-2">
                <h1 className="my-2 text-2xl font-serif">Crew</h1>
                <Button
                  variant={"outline"}
                  onClick={() => setShowCrewSection(!showCrewSection)}
                >
                  {" "}
                  <ChevronDown className="shrink-0 translate-y-0.5 transition-transform duration-200" />{" "}
                  {showCrewSection ? "Collapse" : "Open"}
                </Button>
              </div>{" "}
              {showCrewSection && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {crew.map((crew, index) => {
                    return (
                      <div className="" key={index}>
                        <PersonInfoCard
                          containerClassName={""}
                          personImage={crew.profile_path}
                          name={crew.name}
                          id={crew.id}
                          originalName={crew.original_name}
                          gender={crew.gender}
                          role={crew.known_for_department}
                          popular={crew.popularity}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="my-5">
            <Separator />
          </div>
          <div className="my-5" id="gallery">
            <h1 className={sectionHeadersClassname}>Gallery</h1>
            <div className="w-9/10 mx-auto">
              <div className="" id="posters">
                <div className="grid grid-cols-3 gap-5">
                  {" "}
                  <h1 className="my-2 text-xl font-sans font-semibold">
                    Posters
                  </h1>
                  <div className="flex justify-center">
                    <SeriesDetailsPagefilterSelectionGroup
                      firstFilter={{
                        value: posterLanguageValue,
                        setvalues: setPosterLanguageValue,
                      }}
                      secondFilter={{
                        value: postervotesValue,
                        setvalues: setPosterVotesValue,
                      }}
                      thirdFilter={{
                        value: posterRateValue,
                        setvalues: setPosterRateValue,
                      }}
                    />
                  </div>
                  <div className="flex justify-end">
                    {" "}
                    <Button
                      variant={"outline"}
                      onClick={() => setShowPostersSection(!showPostersSection)}
                      className="w-1/"
                    >
                      <ChevronDown className="shrink-0 translate-y-0.5 transition-transform duration-200 my-auto" />{" "}
                      {showPostersSection ? "Collapse" : "Open"}
                    </Button>
                  </div>
                </div>
                {showPostersSection && (
                  <div className="grid lg:grid-cols-7 gap-5 my-4">
                    {posters.map((poster, index) => {
                      return (
                        <div className="" key={index}>
                          <SeriesDetailsImageCard image={poster} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="my-2">
                <Separator />
              </div>
              <div className="" id="backdrops">
                <div className="grid grid-cols-3 gap-5">
                  {" "}
                  <h1 className="my-2 text-xl font-sans font-semibold">
                    Backdrops
                  </h1>
                  <div className="flex justify-center">
                    <SeriesDetailsPagefilterSelectionGroup
                      firstFilter={{
                        value: backdropLanguageValue,
                        setvalues: setBackdropLanguageValue,
                      }}
                      secondFilter={{
                        value: backdropvotesValue,
                        setvalues: setBackdropVotesValue,
                      }}
                      thirdFilter={{
                        value: backdropRateValue,
                        setvalues: setBackdropRateValue,
                      }}
                    />
                  </div>
                  <div className="flex justify-end">
                    {" "}
                    <Button
                      variant={"outline"}
                      onClick={() =>
                        setShowBackdropsSection(!showBackdropsSection)
                      }
                    >
                      <ChevronDown className="shrink-0 translate-y-0.5 transition-transform duration-200" />{" "}
                      {showBackdropsSection ? "Collapse" : "Open"}
                    </Button>
                  </div>
                </div>{" "}
                {showBackdropsSection && (
                  <div className="grid lg:grid-cols-7 gap-5 my-4">
                    {backdrops.map((backdrop, index) => {
                      if (backdrop.iso_639_1 !== backdropLanguageValue) {
                        return (
                          <div className="" key={index}>
                            <SeriesDetailsImageCard image={backdrop} />
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
              <div className="my-2">
                <Separator />
              </div>
              <div className="" id="logos">
                <div className="grid grid-cols-3 gap-5">
                  {" "}
                  <h1 className="my-2 text-xl font-sans font-semibold">
                    Logos
                  </h1>
                  <div className="flex justify-center">
                    <SeriesDetailsPagefilterSelectionGroup
                      firstFilter={{
                        value: logoLanguageValue,
                        setvalues: setlogoLanguageValue,
                      }}
                      secondFilter={{
                        value: logoVoteValue,
                        setvalues: setlogoVotesValue,
                      }}
                      thirdFilter={{
                        value: logoRateValue,
                        setvalues: setlogoRateValue,
                      }}
                    />
                  </div>
                  <div className="flex justify-end">
                    {" "}
                    <Button
                      variant={"outline"}
                      onClick={() => setShowLogosSection(!showLogosSection)}
                    >
                      <ChevronDown className="shrink-0 translate-y-0.5 transition-transform duration-200" />{" "}
                      {showLogosSection ? "Collapse" : "Open"}
                    </Button>
                  </div>
                </div>{" "}
                {showLogosSection && logos.length > 0 && (
                  <div className="grid lg:grid-cols-7 gap-5 my-4">
                    {logos?.map((logo, index) => {
                      return (
                        <div className="" key={index}>
                          <SeriesDetailsImageCard image={logo} />
                        </div>
                      );
                    })}
                  </div>
                )}
                {showLogosSection && logos.length < 1 && <EmptyMessage />}
              </div>
            </div>
          </div>
          <div className="my-5">
            <Separator />
          </div>
          <div className="my-5">
            <div className="flex justify-between items-center my-2">
              <h1 className="my-2 text-2xl font-serif">Movie Providers</h1>
              <Button
                variant={"outline"}
                onClick={() => setShowProvidersSection(!showProvidersSection)}
              >
                <ChevronDown className="shrink-0 translate-y-0.5 transition-transform duration-200" />{" "}
                {showProvidersSection ? "Collapse" : "Open"}
              </Button>
            </div>{" "}
            {showProvidersSection && (
              <div className="my-5 grid lg:grid-cols-4 md:grid-cols-3 gap-3">
                {providers.map((provider, index) => (
                  <div key={index}>
                    <ProviderSection provider={provider} />
                  </div>
                ))}
              </div>
            )}{" "}
          </div>

          <div className="my-5">
            <Separator />
          </div>
          <div className="my-5">
            <h1 className={sectionHeadersClassname}>Movie Release Dates</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movieReleaseDates.map((country) => (
                <>
                  {" "}
                  <MediaReleaseDatesDisplay country={country} />
                </>
              ))}
            </div>
          </div>
          <div className="my-5">
            <Separator />
          </div>
          <div className="my-5" id="external_ids">
            <h1 className={sectionHeadersClassname}>External ID&apos;s</h1>
            <div className="grid grid-cols-3 gap-8 w-8/10 mx-auto">
              <ExternalIdsList list={externalIds ?? null} />
            </div>
          </div>
          <div className="my-5">
            <Separator />
          </div>
          <div className="my-5" id="content_rating">
            <h1 className={sectionHeadersClassname}>
              Series Content Rating&apos;s{" "}
            </h1>
            <div className="grid grid-cols-6 gap-5">
              {contentRatings.map((rate, index) => (
                <div key={index} className="bg-gray-900 rounded-lg px-4 py-2">
                  <h2 className="flex my-2 gap-1">
                    <p className="opacity-60">Country System: </p>
                    {"    "}
                    {convertOriginalCounryName(rate.country)}
                  </h2>
                  <div className="my-1">
                    <Separator />
                  </div>
                  <h4 className="flex my-2 gap-2 ">
                    {" "}
                    <p className="opacity-60">Rating: </p>
                    {rate.rating}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDescriptionPage;

interface MediaReleaseDatesDisplayProps {
  country: TMDBMovieReleaseDatesResultsResponse;
}

export const MediaReleaseDatesDisplay = ({
  country,
}: MediaReleaseDatesDisplayProps) => {
  return (
    <div className="border border-white/50  bg-card p-3 rounded-lg">
      <h1 className="font-semibold">
        Country: {convertOriginalCounryName(country.iso_3166_1)}
      </h1>
      <div className="my-1">
        <Separator />
      </div>
      <div className="mx-1 my-2">
        {country.release_dates.map((release) => {
          const time = new Date(release.release_date);
          return (
            <div
              key={release.release_date}
              className="opacity-70 border border-white/10 p-3 rounded-lg mx-2 my-3"
            >
              <div className="space-y-1">
                <p className="text">
                  <strong className="font-semibold text-gray-300">
                    Release date:
                  </strong>{" "}
                  <span className="text-white">{time.toDateString()}</span>
                </p>

                <p className="text">
                  <strong className="font-semibold">Release type:</strong>{" "}
                  <span className="text-white">
                    {TMDBMovieReleaseTypes[release.type]}
                  </span>
                </p>

                {release.note.trim() && (
                  <p className="text">
                    <strong className="font-semibold">Note:</strong>{" "}
                    <span className="text-white italic">{release.note}</span>
                  </p>
                )}

                {release.descriptors.length > 0 && (
                  <p className="text">
                    <strong className="font-semibold">Descriptors:</strong>{" "}
                    <span className="text-white">
                      {release.descriptors.map((descriptor, index) => (
                        <span key={descriptor}>
                          {descriptor}
                          {index < release.descriptors.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface ProviderSectionProps {
  provider: MovieWatchProviders;
}
export const ProviderSection = ({ provider }: ProviderSectionProps) => {
  return (
    <div
      key={provider.countryCode}
      className="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {convertOriginalCounryName(provider.countryCode)}
        </h2>
        <span className="text-xs text-muted-foreground">
          {provider.countryCode}
        </span>
      </div>

      <Separator className="my-4" />

      {/* Providers */}
      <div className="space-y-5">
        <ProviderTypeSection
          title="Streaming"
          providers={provider.data.flatrate}
        />

        <ProviderTypeSection title="Free" providers={provider.data.free} />

        <ProviderTypeSection title="Ads" providers={provider.data.ads} />

        <ProviderTypeSection title="Rent" providers={provider.data.rent} />

        <ProviderTypeSection title="Buy" providers={provider.data.buy} />
      </div>

      {/* Footer */}
      {provider.data.link && (
        <>
          <Separator className="my-4" />
          <a
            href={provider.data.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="text-sm text-primary hover:underline flex items-center gap-1"
              variant={"outline"}
            >
              {" "}
              View on TMDB →
            </Button>
          </a>
        </>
      )}
    </div>
  );
};
const ProviderTypeSection = ({
  title,
  providers,
}: {
  title: string;
  providers?: TMDBMovieProvider[];
}) => {
  if (!providers || providers.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {providers.map((provider) => (
          <ProviderBadge key={provider.provider_id} provider={provider} />
        ))}
      </div>
    </div>
  );
};

const ProviderBadge = ({ provider }: { provider: TMDBMovieProvider }) => (
  <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full text-sm hover:bg-muted/70 transition">
    {provider.logo_path && (
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}${provider.logo_path}`}
        alt={provider.provider_name}
        className="w-5 h-5 rounded"
      />
    )}
    <span className="whitespace-nowrap">{provider.provider_name}</span>
  </div>
);

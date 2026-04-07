"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Season } from "../services/seasons.service";
import {
  TMDBEpisodeImagesResponse,
  TMDBEpisodeVideosData,
  TMDBSeasoEpisodesResponse,
  TMDBSeasonEpisodeVideosData,
  TMDBSeasonImageResponse,
  TMDBSeasonResponse,
} from "../interfaces/tmdb.interface";
import { Separator } from "@/shared/components/ui/separator";
import { Button } from "@/shared/components/ui/button";
import { IoGridOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { EpisodeService } from "../services/episode.service";
import { translateCountryCodeToCountryName } from "@/shared/utils/code-converters";
import FilterSelection from "@/shared/components/custom-ui/containers/filter-selection-container";
import { tmdbCountryCodes } from "@/shared/constants/tmdb.constants";
import { tmdbVoteRating } from "../constants/series-details";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

type SeasonDetailsPageProps = {
  seriesId: number;
  seasonNumber: number;
};

const SeasonDetailsPage = ({
  seriesId,
  seasonNumber,
}: SeasonDetailsPageProps) => {
  const [season, setSeason] = useState<TMDBSeasonResponse>();
  const [selectedEpisodeDisplayStyle, setSelectedEpisodeDisplayStyle] =
    useState<"grid" | "list">("grid");
  const [seasonImages, setSeasonImages] =
    useState<TMDBSeasonImageResponse | null>(null);
  const [seasonVideos, setSeasonVideos] = useState<
    TMDBSeasonEpisodeVideosData[]
  >([]);
  const [selectedPosterRate, setSelectedPosterRate] = useState();

  //service object
  const seasonService = new Season(seriesId, seasonNumber);

  //season posters filter
  const [selectedPosterLanguage, setSelectedPosterLanguage] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      const seasonData = await seasonService.GetSeasonDetailsFromTMDB();
      if (seasonData) {
        setSeason(seasonData);
      }
      const imagesData = await seasonService.GetSeasonImagesFromTMDB(
        selectedPosterLanguage
      );
      if (imagesData) {
        setSeasonImages(imagesData);
      }
      const videosData = await seasonService.GetSeasonVideosFromTMDB();
      if (videosData.results.length > 0) {
        setSeasonVideos(videosData.results);
      }
    };
    fetchData();
  }, [seriesId, seasonNumber, selectedPosterLanguage]);

  const infoParagraphClassnames =
    "font-semibold font-sans text-xl text-gray-300/90 flex gap-1 items-center";
  return (
    <div className="w-9/10 mx-auto">
      <div className="flex gap-10 my-5 min-h-[500px] ">
        <div className="rounded-lg w-1/4">
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${season?.poster_path}`}
            className="rounded-lg p-2 w-full h-full object-cover"
          ></img>
        </div>
        <div className="my-5 lg:my-10  w-1/3 flex flex-col gap-2">
          <h1 className={infoParagraphClassnames}>
            Season Name: <p className="opacity-60">{season?.name}</p>
          </h1>
          <p className={infoParagraphClassnames}>
            Season Number: <p className="opacity-60">{season?.season_number}</p>
          </p>
          <p className={infoParagraphClassnames}>
            Aired In: <p className="opacity-60">{season?.air_date}</p>
          </p>{" "}
          <p className={infoParagraphClassnames}>
            TMDB Rating: <p className="opacity-60">{season?.vote_average}</p>
          </p>
          {season?.overview.trim() && (
            <p className={infoParagraphClassnames}>
              Overview: <p className="opacity-60">{season?.overview}</p>
            </p>
          )}
        </div>
        <div className="my-auto">
          <h1 className="">Trailer</h1>
        </div>
      </div>
      <div className="my-5">
        <Separator />
      </div>
      <div className="my-5">
        <h1 className="my-2 font-semibold text-2xl">Episodes</h1>
        <div className="flex gap-5 justify-center">
          <Button
            variant={
              selectedEpisodeDisplayStyle === "grid" ? "default" : "outline"
            }
            className="px-5 py-2 "
            onClick={() => setSelectedEpisodeDisplayStyle("grid")}
          >
            <IoGridOutline /> Grid
          </Button>
          <Button
            variant={
              selectedEpisodeDisplayStyle === "list" ? "default" : "outline"
            }
            className="px-5 py-2 "
            onClick={() => setSelectedEpisodeDisplayStyle("list")}
          >
            <CiBoxList /> List
          </Button>
        </div>
        <div className="my-2">
          <Separator />
        </div>
        <div
          className={
            selectedEpisodeDisplayStyle === "grid"
              ? "grid grid-cols-4 gap-5 my-2 w-9/10 mx-auto "
              : "flex flex-col gap-5 my-2"
          }
        >
          {season?.episodes.map((episode) => {
            return (
              <div key={episode.id}>
                <EpisodeDialogSection
                  episode={episode}
                  seriesId={seriesId}
                  seasonNumber={seasonNumber}
                  episodeNumber={episode.episode_number}
                >
                  <EpisodeDetailsCard
                    episode={episode}
                    orientation={selectedEpisodeDisplayStyle}
                  />
                </EpisodeDialogSection>
              </div>
            );
          })}
        </div>
        <div className="my-5">
          <Separator />
        </div>
        <div className="my-5">
          <div className="flex justify-between my-4">
            {" "}
            <h1 className="my-2 font-semibold text-2xl">Posters</h1>
            <div className="flex items-center gap-4">
              <FilterSelection
                placeHolder={"Language"}
                values={tmdbCountryCodes}
                value={selectedPosterLanguage}
                setValues={setSelectedPosterLanguage}
              />
              <FilterSelection
                placeHolder={"Rating"}
                values={tmdbVoteRating}
                value={selectedPosterRate}
                setValues={setSelectedPosterRate}
              />
            </div>
          </div>{" "}
          {seasonImages?.posters.length > 0 ? (
            <div className="grid grid-cols-6 gap-5 w-19/20 mx-auto">
              {seasonImages?.posters.map((poster) => {
                return (
                  <div key={poster.aspect_ratio}>
                    <div className="lg:h-[400px]">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${poster.file_path}`}
                        alt=""
                        className="rounded-lg w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between my-1 opacity-50">
                      <div className="">
                        {" "}
                        <p className="">
                          {translateCountryCodeToCountryName(
                            poster.iso_639_1
                          )?.trim() ?? "N/A"}
                        </p>
                        <p className="">
                          apect: {poster.width} - {poster.height}
                        </p>
                      </div>
                      <div className="">
                        {" "}
                        <div className="flex gap-1">
                          {poster.vote_average} <p className="">avg</p>
                        </div>
                        <div className="flex gap-1">
                          {poster.vote_count} <p className="">votes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full flex items-center justify-center h-[20vh]">
              <p className="opacity-50 text-lg font-serif">
                Sorry, there is no posters for language -{" "}
                {translateCountryCodeToCountryName(
                  selectedPosterLanguage ?? "en"
                )}
              </p>
            </div>
          )}
        </div>
        {seasonVideos.length > 0 && (
          <div className="">
            <div className="my-5">
              <Separator />
            </div>
            <div className="">
              {" "}
              <h1 className="my-2 font-semibold text-2xl">Videos</h1>
              <div className=""> {seasonVideos.map((video) => video.name)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonDetailsPage;

type EpisodeDetailsCardProps = {
  episode: TMDBSeasoEpisodesResponse;
  orientation: "grid" | "list";
};
const EpisodeDetailsCard = ({
  episode,
  orientation,
}: EpisodeDetailsCardProps) => {
  if (orientation === "grid") {
    return (
      <div className="">
        <div className="">
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${episode.still_path}`}
            className="rounded-lg"
          ></img>
        </div>
        <div className="my-2">
          <Separator />
        </div>
        <div className="p-4 border border-white/50 rounded-lg border-t-0">
          <div className="w-9/10 mx-auto">
            {" "}
            <div className="flex gap-2 items-center my-1">
              Ep. number:{" "}
              <div className="opacity-50">{episode.episode_number}</div>
            </div>
            <div className="flex gap-2 items-center my-1">
              Duration: <p className="opacity-50">{episode.runtime} mins</p>
            </div>
          </div>
          <div className="w-9/10 mx-auto">
            {" "}
            <div className="flex gap-2 items-center my-1">
              Name: <p className="opacity-50">{episode.name}</p>
            </div>
            <div className="flex gap-2 items-center my-1">
              Type: <p className="opacity-50">{episode.episode_type}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (orientation === "list") {
    return (
      <div className="flex gap-4 w-9/10 mx-auto">
        <div className="max-w-1/4 mx-auto">
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${episode.still_path}`}
            className="rounded-lg w-full h-full object-cover"
          ></img>
        </div>
        <div className="mx-2  my-0 ">
          <Separator
            className="border-l border-white py-2 h-full"
            orientation="vertical"
          />
        </div>
        <div className="p-4 border-b border-white/50 rounded border-t-0 flex-1 text-lg">
          <div className="w-9/10 mx-auto">
            {" "}
            <div className="flex gap-2 items-center my-1">
              Ep. number:{" "}
              <div className="opacity-50">{episode.episode_number}</div>
            </div>
            <div className="flex gap-2 items-center my-1">
              Duration: <p className="opacity-50">{episode.runtime} mins</p>
            </div>
          </div>
          <div className="w-9/10 mx-auto">
            {" "}
            <div className="flex gap-2 items-center my-1">
              Name: <p className="opacity-50">{episode.name}</p>
            </div>
            <div className="flex gap-2 items-center my-1">
              Type: <p className="opacity-50">{episode.episode_type}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

type EpisodeDialogSectionProps = {
  episode: TMDBSeasoEpisodesResponse;
  children: ReactNode;
  seriesId: number;
  seasonNumber: number;
  episodeNumber: number;
};

const EpisodeDialogSection = ({
  episode,
  children,
  seriesId,
  seasonNumber,
  episodeNumber,
}: EpisodeDialogSectionProps) => {
  const [images, setImages] = useState<TMDBEpisodeImagesResponse>();
  const [videos, setVideos] = useState<TMDBEpisodeVideosData[]>([]);
  const episodeService = new EpisodeService(
    seriesId,
    seasonNumber,
    episodeNumber
  );

  useEffect(() => {
    const fetchData = async () => {
      const imagesData = await episodeService.getEpisodeImagesFromTMDB();

      if (imagesData.stills.length > 0) {
        setImages(imagesData);
      }
      const videosData = await episodeService.getEpisodeVideosFromTMDB();
      if (videosData.results.length > 0) {
        setVideos(videosData.results);
      } else setVideos([]);
    };
    fetchData();
  }, []);
  return (
    <div className="">
      <Dialog>
        <DialogTrigger className="cursor-pointer">{children}</DialogTrigger>
        <DialogContent className=" mx-auto h-9/10 my-auto flex flex-col w-full max-w-3xl">
          <ScrollArea className="flex flex-col overflow-hidden max-h-full ">
            <DialogHeader>
              <DialogTitle className="font-semibold">
                {episode.name}
              </DialogTitle>
            </DialogHeader>
            <div className="my-2">
              <Separator />
            </div>
            <div className="">
              {" "}
              <p className="font-semibold font-serif text-l">Overview</p>
              <p className="opacity-70">{episode.overview}</p>
              <div className="flex gap-2 items-center my-1">
                Aired in: <p className="opacity-50">{episode.air_date}</p>
              </div>
              <div className="flex gap-1">
                {episode.vote_count} <p className="opacity-50">votes</p> -{" "}
                {episode.vote_average} <p className="opacity-50">avg</p>
              </div>
            </div>{" "}
            <div className="my-2">
              <Separator />
            </div>
            <div className="">
              <VideoPlaySection />
            </div>
            <div className="my-2">
              <Separator />
            </div>
            <div className="">
              <h1 className="font-semibold font-serif my-2">Images</h1>
              <div className="grid grid-cols-3 gap-3 mx-2">
                {images?.stills.map((image) => {
                  return (
                    <div key={image.iso_639_1} className="">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${image.file_path}`}
                        alt="rounded-lg"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {videos.length > 0 && (
              <>
                <div className="my-2">
                  <Separator />
                </div>
                <div className="my-2">
                  <h1 className="font-semibold font-serif my-2">Videos</h1>
                  <div className="">{videos.map((video) => video.name)}</div>
                </div>
              </>
            )}
          </ScrollArea>
          <DialogFooter>
            <DialogClose>
              <Button variant={"outline"}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const VideoPlaySection = () => {
  return <div className="bg-black rounded-md p-4">video player</div>;
};

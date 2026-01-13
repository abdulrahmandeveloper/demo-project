"use client";

import FilterSelection from "@/shared/components/custom-ui/containers/filter-selection-container";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { tmdbCountryCodes } from "@/shared/constants/tmdb.constants";
import React, { useEffect, useState } from "react";
import { WatchProviders } from "../services/watch-providers.service";
import {
  TMDBMediaWatchProvidersResultsData,
  WatchProvidersRegionsData,
} from "../interfaces/watch-providers.interface";
import { Separator } from "@/shared/components/ui/separator";
import { tmdbWatchRegionCodes } from "../constants/watch-providers.constants";
import { toast } from "sonner";
import { ProviderCard } from "./watch-provider-card";
import WatchProviderSkeleton from "./watch-provider-skeleton";

const WatchProvidersPage = () => {
  //providers list
  const [movieProviders, setMovieProviders] = useState<
    TMDBMediaWatchProvidersResultsData[]
  >([]);
  const [seriesProviders, setSeriesProviders] = useState<
    TMDBMediaWatchProvidersResultsData[]
  >([]);

  //search specific states
  const [query, setQuery] = useState<string>("");
  const [value, setValue] = useState<string>("");

  //skeleton specific state
  const [loading, setLoading] = useState<boolean>(true);

  const [mediaType, setMediaType] = useState<"movie" | "series">("movie");
  const [region, setRegion] = useState<string | null>(null);
  const [sort, setSort] = useState<"asec" | "desc" | null>(null);

  const watchProvidersService = new WatchProviders();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const moviesData =
        await watchProvidersService.getAvailableProvidersForMovieFromTMDB(
          region
        );
      const seriesData =
        await watchProvidersService.getAvailableProvidersForTvFromTMDB(region);
      console.log("seriesData: ", seriesData);

      if (moviesData.results.length > 0) {
        setMovieProviders(moviesData.results);
      } else setMovieProviders([]);
      if (seriesData.results.length > 0) {
        setSeriesProviders(seriesData.results);
      } else setSeriesProviders([]);
      setLoading(false);
    };
    fetchData();
  }, [region, mediaType]);

  console.log(loading);

  const selectedMediaTypeListResult =
    mediaType === "movie" ? movieProviders : seriesProviders;

  const sortedAscendingList =
    mediaType === "movie"
      ? [...movieProviders].sort(
          (a, b) => b.display_priority - a.display_priority
        )
      : [...seriesProviders].sort(
          (a, b) => b.display_priority - a.display_priority
        );
  const sortedDesendingList =
    mediaType === "movie"
      ? [...movieProviders].sort(
          (a, b) => a.display_priority - b.display_priority
        )
      : [...seriesProviders].sort(
          (a, b) => a.display_priority - b.display_priority
        );

  const list =
    sort !== null
      ? sort === "asec"
        ? sortedAscendingList
        : sortedDesendingList
      : selectedMediaTypeListResult;

  // filtering the results
  const DisplayList = value.trim()
    ? list.filter((item: TMDBMediaWatchProvidersResultsData) =>
        item.provider_name.toLowerCase().includes(value.toLowerCase())
      )
    : list;

  const handleInputChange = (value: string) => {
    if (!value.trim()) {
      console.log("inside trim");
      setValue("");
    }
    setQuery(value);
  };

  const handleSearchClick = () => {
    if (!query.trim()) {
      toast.error("Please Enter Something!");
    }
    setValue(query);
  };
  return (
    <div className="my-5 w-9/10 mx-auto">
      {loading && <WatchProviderSkeleton />}
      {loading === false && (
        <div className="">
          <h1 className="my-3 font-semibold text-2xl">
            Discover watch providers around the world
          </h1>
          <div className="flex gap-5 justify-between items-center">
            <div className="w-1/2 flex gap-4">
              <Input
                placeholder="Write Netflix..."
                value={query}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <Button onClick={handleSearchClick}>Search</Button>
            </div>
            <div className="w-1/3 flex gap-4">
              <FilterSelection
                placeHolder={"Media Provider"}
                values={[
                  { name: "Movie", value: "movie" },
                  { name: "Series", value: "series" },
                ]}
                value={mediaType}
                setValues={setMediaType}
              />
              <FilterSelection
                placeHolder={"Region/Country"}
                values={tmdbWatchRegionCodes}
                value={region}
                setValues={setRegion}
              />
              <FilterSelection
                placeHolder={"Sort"}
                values={[
                  { name: "Default", value: null },
                  { name: "Highest to lowest", value: "desc" },
                  { name: "Lowest to highest", value: "asec" },
                ]}
                value={sort}
                setValues={setSort}
              />
            </div>
          </div>
          <div className="my-5">
            <Separator className="bord" />
          </div>
          <div>
            {DisplayList.length > 0 ? (
              <div className="grid lg:grid-cols-4 lg:gap-4 lg:my-5 md:grid-cols-2 md:my-4 md:gap-3">
                {DisplayList.map((provider) => {
                  return <ProviderCard provider={provider} />;
                })}
              </div>
            ) : (
              query.trim() && (
                <div className="flex items-center justify-center font- font-serif text-xl opacity-50 h-[50vh]">
                  Sorry! there is no results
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchProvidersPage;

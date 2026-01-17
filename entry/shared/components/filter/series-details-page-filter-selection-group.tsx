import { Dispatch, SetStateAction } from "react";
import FilterSelection from "../custom-ui/containers/filter-selection-container";
import {
  tmdbCountryCodes,
  tmdbMediaDetailsGalleryVoteCount,
} from "@/shared/constants/tmdb.constants";
import { tmdbVoteRating } from "@/features/series/constants/series-details";

type SeriesDetailsPagefilterSelectionGroupProps = {
  firstFilter: {
    value: string | null;
    setvalues: Dispatch<SetStateAction<string | null>>;
  };
  secondFilter: {
    value: number | null;
    setvalues: Dispatch<SetStateAction<number | null>>;
  };
  thirdFilter: {
    value: number | null;
    setvalues: Dispatch<SetStateAction<number | null>>;
  };
};

export const SeriesDetailsPagefilterSelectionGroup = ({
  firstFilter,
  secondFilter,
  thirdFilter,
}: SeriesDetailsPagefilterSelectionGroupProps) => {
  return (
    <div className="flex gap-4">
      <FilterSelection
        placeHolder={"Language"}
        values={tmdbCountryCodes}
        value={firstFilter.value}
        setValues={firstFilter.setvalues}
      />
      <FilterSelection
        placeHolder={"Votes"}
        values={tmdbMediaDetailsGalleryVoteCount}
        value={secondFilter.value ?? undefined}
        setValues={secondFilter.setvalues}
      />
      <FilterSelection
        placeHolder={"Rating"}
        values={tmdbVoteRating}
        value={thirdFilter.value ?? undefined}
        setValues={thirdFilter.setvalues}
      />
    </div>
  );
};

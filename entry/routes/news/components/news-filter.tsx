import FilterSelection from "@/shared/components/custom-ui/containers/filter-selection-container";
import { Dispatch, SetStateAction } from "react";
import {
  BOX_OFFICE_FILTERS,
  COUNTRY_FILTERS,
  DATE_FILTERS,
  PUBLISHER_FILTERS,
} from "../constants/news.constants";
import { NewsFilters } from "../interfaces/news.interface";

type NewsFilterProps = {
  placeHolder: string;
  excludeFilter?: "Publisher" | "Box Office" | "Country" | "Date";
  value: NewsFilters;
  setterValue: Dispatch<SetStateAction<any>>;
};
const NewsFilter = ({
  placeHolder,
  excludeFilter,
  value,
  setterValue,
}: NewsFilterProps) => {
  return (
    <div className="flex justify-between">
      <h1 className="font-bold text-xl my-1">{placeHolder}</h1>
      <div className="flex gap-4">
        <FilterSelection
          placeHolder={"Publisher"}
          values={PUBLISHER_FILTERS}
          value={value.publisher}
          setValues={setterValue}
          containerClassName="w-[200px]"
        />
        <FilterSelection
          placeHolder={"Box Office"}
          values={BOX_OFFICE_FILTERS}
          value={value.boxOffice}
          setValues={setterValue}
          containerClassName="w-[200px]"
        />
        {excludeFilter === "Country" ? null : (
          <FilterSelection
            placeHolder={"Country"}
            values={COUNTRY_FILTERS}
            value={value.country}
            setValues={setterValue}
            containerClassName="w-[200px]"
          />
        )}
        <FilterSelection
          placeHolder={"Date"}
          values={DATE_FILTERS}
          value={value.date}
          setValues={setterValue}
          containerClassName="w-[200px]"
        />
      </div>
    </div>
  );
};

export default NewsFilter;

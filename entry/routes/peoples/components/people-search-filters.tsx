"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterSelection from "@/shared/components/custom-ui/containers/filter-selection-container";
import {
  DEPARTMENT_FILTERS,
  GENDER_FILTERS,
  NATIONALITY_FILTERS,
} from "../constants/tmdb.constants";
import { Button } from "@/shared/components/ui/button";

type PeopleSearchFiltersProps = {
  setQueryParameters: Dispatch<
    SetStateAction<{ gender: number; department: string; nationality: string }>
  >;
  queryParameters: {
    gender: number;
    department: string;
    nationality: string;
  };
  containerClassName?: string;
};
const PeopleSearchFilters = ({
  queryParameters,
  setQueryParameters,
  containerClassName,
}: PeopleSearchFiltersProps) => {
  const [genderFilterValue, setGenderFilterValue] = useState<number>();
  const [nationalityFilterValue, setNationalityFilterValue] =
    useState<string>("");
  const [departmentFilterValue, setDepartmentFilterValue] =
    useState<string>("");

  useEffect(() => {
    const setValues = () => {
      switch (true) {
        case Boolean(queryParameters.gender !== genderFilterValue):
          setQueryParameters({
            nationality: nationalityFilterValue,
            department: departmentFilterValue,
            gender: genderFilterValue,
          });
          break;
        case Boolean(queryParameters.department !== departmentFilterValue):
          setQueryParameters({
            nationality: nationalityFilterValue,
            gender: genderFilterValue,
            department: departmentFilterValue,
          });
          break;
        case Boolean(queryParameters.nationality !== nationalityFilterValue):
          setQueryParameters({
            nationality: nationalityFilterValue,
            department: departmentFilterValue,
            gender: genderFilterValue,
          });
          break;
      }
    };
    setValues();
  }, [departmentFilterValue, genderFilterValue, nationalityFilterValue]);
  return (
    <div className={`flex gap-4 ${containerClassName}`}>
      <Button className="cursor-pointer">Reset filters</Button>
      <FilterSelection
        placeHolder={"Gender"}
        values={GENDER_FILTERS}
        value={genderFilterValue}
        setValues={setGenderFilterValue}
      />
      <FilterSelection
        placeHolder={"Nationality"}
        values={NATIONALITY_FILTERS}
        value={nationalityFilterValue}
        setValues={setNationalityFilterValue}
      />
      <FilterSelection
        placeHolder={"Department"}
        values={DEPARTMENT_FILTERS}
        value={departmentFilterValue}
        setValues={setDepartmentFilterValue}
      />
    </div>
  );
};

export default PeopleSearchFilters;

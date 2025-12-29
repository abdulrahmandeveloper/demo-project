"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterSelection from "@/shared/components/custom-ui/containers/filter-selection-container";
import {
  DEPARTMENT_FILTERS,
  GENDER_FILTERS,
  NATIONALITY_FILTERS,
} from "../constants/tmdb.constants";
import { Button } from "@/shared/components/ui/button";
import { PeopleSarchQueryParameters } from "../interfaces/people.interface";

type PeopleSearchFiltersProps = {
  setQueryParameters: Dispatch<SetStateAction<PeopleSarchQueryParameters>>;
  queryParameters: PeopleSarchQueryParameters;
  containerClassName?: string;
};
const PeopleSearchFilters = ({
  queryParameters,
  setQueryParameters,
  containerClassName,
}: PeopleSearchFiltersProps) => {
  const [genderFilterValue, setGenderFilterValue] = useState<number | null>(
    null
  );
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
            gender: genderFilterValue ?? null,
          });
          break;
        case Boolean(queryParameters.department !== departmentFilterValue):
          setQueryParameters({
            nationality: nationalityFilterValue,
            gender: genderFilterValue ?? null,
            department: departmentFilterValue,
          });
          break;
        case Boolean(queryParameters.nationality !== nationalityFilterValue):
          setQueryParameters({
            nationality: nationalityFilterValue,
            department: departmentFilterValue,
            gender: genderFilterValue ?? null,
          });
          break;
      }
    };
    setValues();
  }, [departmentFilterValue, genderFilterValue, nationalityFilterValue]);

  const handleRefreshClick = () => {
    setQueryParameters({ gender: null, nationality: "", department: "" });
    setGenderFilterValue(null);
    setNationalityFilterValue("");
    setDepartmentFilterValue("");
  };

  const showResetFilter: boolean = Boolean(
    queryParameters.gender !== null ||
      queryParameters.department.trim() ||
      queryParameters.nationality.trim()
  );

  return (
    <div className={`flex gap-4 ${containerClassName}`}>
      {showResetFilter && (
        <Button className="cursor-pointer" onClick={handleRefreshClick}>
          Reset filters
        </Button>
      )}
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

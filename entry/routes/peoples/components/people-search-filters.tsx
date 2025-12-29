"use client";

import React, { useState } from "react";
import FilterSelection from "@/shared/components/custom-ui/containers/filter-selection-container";
import {
  DEPARTMENT_FILTERS,
  GENDER_FILTERS,
  NATIONALITY_FILTERS,
} from "../constants/tmdb.constants";
import { Button } from "@/shared/components/ui/button";

type PeopleSearchFiltersProps = {
  containerClassName?: string;
};
const PeopleSearchFilters = ({
  containerClassName,
}: PeopleSearchFiltersProps) => {
  const [genderFilterValue, setGenderFilterValue] = useState();
  const [nationalityFilterValue, setNationalityFilterValue] = useState();
  const [departmentFilterValue, setDepartmentFilterValue] = useState();

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

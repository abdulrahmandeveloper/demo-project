import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/core/shared/components/ui/select";
import { Dispatch, SetStateAction } from "react";

type FilterSelectionProps = {
  placeHolder: string;
  values: any[];
  setValues: Dispatch<SetStateAction<[] | number>>;
  label?: string;
};
const FilterSelection = ({
  placeHolder,
  label,
  values,
  setValues,
}: FilterSelectionProps) => {
  const handleClick = (e) => {
    setValues(e);
  };

  return (
    <Select onValueChange={(e) => handleClick(e)}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {values.map((value, index) => (
            <SelectItem key={index} value={value.value}>
              {value?.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterSelection;

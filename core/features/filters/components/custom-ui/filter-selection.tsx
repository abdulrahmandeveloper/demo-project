import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Dispatch, SetStateAction } from "react";

type FilterSelectionProps<T> = {
  placeHolder: string;
  values: any[];
  setValues: Dispatch<SetStateAction<T>>;
  label?: string;
};
const FilterSelection = <T,>({
  placeHolder,
  label,
  values,
  setValues,
}: FilterSelectionProps<T>) => {
  const handleClick = (e: string) => {
    setValues(e as T);
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

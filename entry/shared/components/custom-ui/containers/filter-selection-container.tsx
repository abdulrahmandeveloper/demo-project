import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "entry/shared/components/ui/select";
import { Dispatch, SetStateAction } from "react";

type FilterValues = {
  name: string;
  value: string | number | null;
};

type FilterSelectionProps<T> = {
  placeHolder: string;
  values: FilterValues[];
  value?: T;
  setValues: Dispatch<SetStateAction<T>>;
  label?: string;
};
const FilterSelection = <T,>({
  placeHolder,
  label,
  values,
  value,
  setValues,
}: FilterSelectionProps<T>) => {
  const handleClick = (value: string) => {
    const selectedItem = values.find((item) => String(item.value) === value);

    if (selectedItem) {
      setValues(selectedItem.value as T);
    }
  };

  const selectValue =
    value === null || value === undefined || value === "" ? "" : String(value);

  return (
    <Select onValueChange={(e) => handleClick(e)} value={selectValue}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {values.map((item, index) => (
            <SelectItem key={index} value={String(item.value)}>
              {item?.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterSelection;

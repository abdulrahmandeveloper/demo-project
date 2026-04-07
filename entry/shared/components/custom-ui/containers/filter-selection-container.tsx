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
  containerClassName?: string;
};
const FilterSelection = <T,>({
  placeHolder,
  label,
  values,
  value,
  setValues,
  containerClassName,
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
    <div className={`${containerClassName}`}>
      <Select onValueChange={(e) => handleClick(e)} value={selectValue}>
        <SelectTrigger className={`${containerClassName}  cursor-pointer`}>
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent className={`${containerClassName}`}>
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {values.map((item, index) => (
              <SelectItem
                key={index}
                value={String(item.value)}
                className="  cursor-pointer"
              >
                {item?.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSelection;

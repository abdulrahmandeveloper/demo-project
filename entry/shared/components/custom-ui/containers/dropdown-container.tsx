import { useState } from "react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

type DropdownContainerProps = {
  placeholder: string;
  label: string;
  items: string[];
  triggerClassName?: string;
  selectMedia: (value: any) => void;
  defaultMediaType?: string;
};

const DropdownContainer = ({
  placeholder,
  label,
  items,
  triggerClassName,
  selectMedia,
  defaultMediaType,
}: DropdownContainerProps) => {
  const [selectedMedia, setSelectedMedia] = useState<string | undefined>(
    defaultMediaType
  );

  const handleSelectMedia = (value: string) => {
    const capidalizedMediaName = value.charAt(0).toUpperCase() + value.slice(1);
    setSelectedMedia(capidalizedMediaName);
    selectMedia(value);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className={`${triggerClassName} cursor-pointer`}
        >
          <Button variant="outline">{selectedMedia ?? placeholder}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {label && (
            <>
              <DropdownMenuLabel>{label}</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuGroup>
            {items.map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() => handleSelectMedia(item)}
                  className="cursor-pointer"
                >
                  {item}
                </DropdownMenuItem>
              </div>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownContainer;

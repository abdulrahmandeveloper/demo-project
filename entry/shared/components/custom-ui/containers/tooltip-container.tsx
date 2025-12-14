import React, { JSX } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

type TooltipContainerProps = {
  content: string | string[];
  className: string;
  trigger: JSX.Element;
};
const TooltipContainer = ({
  trigger,
  content,
  className,
}: TooltipContainerProps) => {
  const contentIsArray = Array.isArray(content);

  return (
    <div className={``}>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent
          className={`${className} bg-black! text-white!`}
          side="top"
          align="center"
          sideOffset={8}
        >
          {contentIsArray ? (
            content?.map((Item: string, index: number) => (
              <div key={index}>{Item}</div>
            ))
          ) : (
            <div>{content}</div>
          )}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default TooltipContainer;

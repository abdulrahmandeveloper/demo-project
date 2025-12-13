import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";

type DialogContainerProps = {
  conent: any;
};
const DialogContainer = ({ content }: DialogContainerProps) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="link"
            className="text-yellow-400 text-sm underline hover:text-yellow-300 transition cursor-pointer"
          >
            Read more
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-zinc-900 border border-yellow-400 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">
              {content.author}
            </DialogTitle>
          </DialogHeader>

          <div className="text-gray-300 whitespace-pre-line leading-relaxed max-h-[70vh] overflow-y-auto">
            {content.content}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogContainer;

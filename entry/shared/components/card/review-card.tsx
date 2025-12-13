import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { TMDBReviewsResponse } from "@/shared/interfaces/tmdb/tmdb.interface";
import { useEffect, useRef, useState } from "react";

type ReviewCardProps = {
  review: TMDBReviewsResponse;
  className?: string;
};

const ReviewCard = ({ review, className }: ReviewCardProps) => {
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const avatar = review.author_details.avatar_path
    ? `${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${review.author_details.avatar_path}`
    : "/images/avatar-placeholder.png"; // fallback avatar

  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [review.content]);

  return (
    <div
      className={`bg-zinc-900 border border-yellow-400 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 min-w-[300px] max-w-[380px] flex flex-col gap-3 ${className}`}
    >
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-yellow-400">
          <Image
            src={avatar}
            alt={`${review.author} avatar`}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-white">
            {review.author || "Reviewr"}
          </h3>
          <span className="text-yellow-400 text-sm">
            ⭐ {review.author_details.rating ?? "No Rating"} stars
          </span>
        </div>
      </div>

      {/* Review Content (Clamped) */}
      <p
        ref={contentRef}
        className="text-sm text-gray-300 line-clamp-4 leading-relaxed h-[95px]"
      >
        {review.content}
      </p>

      {isOverflowing && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="text-yellow-400 text-sm hover:text-yellow-300 transition cursor-pointer"
            >
              Read more
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-zinc-900 border border-yellow-400 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-yellow-400">
                {review.author}
              </DialogTitle>
            </DialogHeader>

            <div className="text-gray-300 whitespace-pre-line leading-relaxed max-h-[70vh] overflow-y-auto">
              {review.content}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReviewCard;

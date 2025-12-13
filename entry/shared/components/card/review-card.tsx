import { TMDBMOvieReviewsResponse } from "@/features/movie/interfaces/tmdb.interface";
import Image from "next/image";

type ReviewCardProps = {
  review: TMDBMOvieReviewsResponse;
  className?: string;
};

const ReviewCard = ({ review, className }: ReviewCardProps) => {
  const avatar = review.author_details.avatar_path
    ? `${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${review.author_details.avatar_path}`
    : "/images/avatar-placeholder.png"; // fallback avatar

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
      <p className="text-sm text-gray-300 line-clamp-4 leading-relaxed h-[95px]">
        {review.content}
      </p>

      {/* Read More Button */}
      <button className="text-yellow-400 text-sm underline hover:text-yellow-300 transition">
        Read more
      </button>
    </div>
  );
};

export default ReviewCard;

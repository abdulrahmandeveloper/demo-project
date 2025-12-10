import { TMDBMOvieReviewsResponse } from "@/features/movie/interfaces/tmdb.interface";
import React from "react";

type ReviewCardProps = {
  review: TMDBMOvieReviewsResponse[];
  className: string;
};
const ReviewCard = ({ review, className }: ReviewCardProps) => {
  return (
    <div className={`${className}`}>
      {review?.map((item, index) => (
        <div key={index}>
          <header>{item.author_details.username}</header>
          <p className="">{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;

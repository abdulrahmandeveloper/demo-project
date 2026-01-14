import React from "react";

interface MovieDescriptionPageProps {
  movieId: number;
}
const MovieDescriptionPage = ({ movieId }: MovieDescriptionPageProps) => {
  console.log(movieId);

  return <div>MovieDescriptionPage</div>;
};

export default MovieDescriptionPage;

import React from "react";

type KeywordsCardProps = {
  text: string;
  className?: string;
};

const KeywordsCard = ({ text, className }: KeywordsCardProps) => {
  return (
    <p
      className={`${className} bg-gray-900 border border-gray-500 rounded-lg px-1`}
    >
      {text}
    </p>
  );
};

export default KeywordsCard;

import React from "react";

type KeywordsCardProps = {
  text: string | string[];
  className?: string;
};

const KeywordsCard = ({ text, className }: KeywordsCardProps) => {
  if (Array.isArray(text)) {
    return text.map((item, index) => (
      <p
        key={index}
        className={`${className} bg-gray-900 border border-gray-500 rounded-lg px-1`}
      >
        {item}
      </p>
    ));
  } else
    return (
      <p
        className={`${className} bg-gray-900 border border-gray-500 rounded-lg px-1`}
      >
        {text}
      </p>
    );
};

export default KeywordsCard;

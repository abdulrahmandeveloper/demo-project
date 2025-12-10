import React from "react";

type VideoPlayerProps = {
  containerClassName: string;
};
const VideoPlayer = ({ containerClassName }: VideoPlayerProps) => {
  return <div className={`${containerClassName}`}>VideoPlayer</div>;
};

export default VideoPlayer;

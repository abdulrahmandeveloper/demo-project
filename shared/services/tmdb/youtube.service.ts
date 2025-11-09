export const getYoutubeTrailer = (data: {
  moviesVideoIds: string[];
  seiesesVideoIds: string[];
}): string[] => {
  let videosUrl = [];

  for (let i = 0; i < data.moviesVideoIds.length; i++) {
    if (data.moviesVideoIds[i] !== "null" && data.moviesVideoIds[i] !== null) {
      videosUrl.push(
        `${process.env.NEXT_PUBLIC_YOUTUBE_API}/${data.moviesVideoIds[i]}?autoplay=1&mute=1`
      );
    }
  }

  for (let i = 0; i < data.seiesesVideoIds.length; i++) {
    if (
      data.seiesesVideoIds[i] !== "null" &&
      data.seiesesVideoIds[i] !== null
    ) {
      videosUrl.push(
        `${process.env.NEXT_PUBLIC_YOUTUBE_API}/${data.seiesesVideoIds[i]}?autoplay=1&mute=1`
      );
    }
  }

  videosUrl = videosUrl.filter((video) => video !== null);

  //console.log("videosUrl: ", videosUrl);

  return videosUrl;
};

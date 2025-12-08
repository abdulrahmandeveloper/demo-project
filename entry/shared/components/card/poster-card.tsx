type PosterCardProps = { src: string; className?: string };

const PosterCard = ({ src, className }: PosterCardProps) => {
  return (
    <img
      src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}${src}`}
      alt="image"
      className={`${className} rounded-lg p-20`}
    />
  );
};

export default PosterCard;

// object-cover
// width: 300px height:450px

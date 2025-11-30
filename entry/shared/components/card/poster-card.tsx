type PosterCardProps = { src: string; className?: string };

const PosterCard = ({ src, className }: PosterCardProps) => {
  return (
    <div>
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}${src}`}
        alt="image"
        className={`${className} rounded-lg`}
      />
    </div>
  );
};

export default PosterCard;

// object-cover
// width: 300px height:450px

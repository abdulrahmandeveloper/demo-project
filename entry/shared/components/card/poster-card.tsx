import Link from "next/link";

type PosterCardProps = { src: string; linkPathTo?: string; className?: string };

const PosterCard = ({ src, className, linkPathTo }: PosterCardProps) => {
  return (
    <Link href={linkPathTo ?? "/homepage"}>
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}${src}`}
        alt="image"
        className={`${className} rounded-lg `}
      />
    </Link>
  );
};

export default PosterCard;

// object-cover
// width: 300px height:450px

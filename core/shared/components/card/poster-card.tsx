import Image from "next/image";

type posterCardProps = { src: string; className?: string };

const PosterCard = ({ src, className }: posterCardProps) => {
  return (
    <div>
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}${src}`}
        alt="image"
        className={className}
        width={0}
        height={0}
      />
    </div>
  );
};

export default PosterCard;

import { Eye, LucideProps } from "lucide-react";
import { AiFillHeart } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { AiFillSchedule } from "react-icons/ai";
import { AiFillBoxPlot } from "react-icons/ai";
import { AlignJustify } from "lucide-react";
import { IconType } from "react-icons";

interface FeatureItem {
  icon: IconType | React.ComponentType<LucideProps>;
  description: string;
}

export const featuresData: FeatureItem[] = [
  {
    icon: Eye,
    description:
      "Get your Letterboxd underway by visiting our Popular section and marking a few films you’ve seen.",
  },
  {
    icon: AiFillHeart,
    description:
      "Now that you’ve added some films, you can find them in the Films tab of your profile. As you add more content, your profile starts to reflect your taste.",
  },
  {
    icon: AlignJustify,
    description:
      "One of our most-loved features, the Watchlist, lets you keep a list of films you want to see.",
  },
  {
    icon: AiFillStar,
    description:
      "Click your username (at the top of each page) for shortcuts to the main sections of your account. Your Profile, Films, Diary, Watchlist and other pages are here.  ",
  },
  {
    icon: AiFillSchedule,
    description:
      "Log a film to tell us you watched it on a particular date, and to attach a review, rating and tags. ",
  },
  {
    icon: AiFillBoxPlot,
    description:
      "The best way to find members to follow is by reading reviews of films you like, to identify the voices and opinions you dig. Our Members page lists popular accounts.  ",
  },
];

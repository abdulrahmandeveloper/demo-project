import { Separator } from "@/shared/components/ui/separator";
import { TMDBMediaWatchProvidersResultsData } from "../interfaces/watch-providers.interface";

interface ProviderCardProps {
  provider: TMDBMediaWatchProvidersResultsData;
}
export const ProviderCard = ({ provider }: ProviderCardProps) => {
  return (
    <div
      className="flex gap-4 border border-gray-500/50 rounded-lg p-3"
      key={provider.logo_path}
    >
      <div className="w-3/10">
        {" "}
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${provider.logo_path}`}
          className="rounded-lg w-full h-full object-cover"
        ></img>
      </div>
      <div className="mx-1 ">
        <Separator orientation="vertical" className="border" />
      </div>
      <div className="flex justify-center flex-col flex-1">
        <h1 className="flex gap-2 items-center">
          <p className="font-semibold">Name: </p>{" "}
          <p className="">{provider.provider_name}</p>
        </h1>
        <div className="flex gap-1">
          <p className="font-semibold">Global Ranking: </p>{" "}
          {provider.display_priority + 1}
        </div>
        <div className="flex gap-1">
          <p className="font-semibold">Provider TMDB ID: </p>{" "}
          {provider.provider_id}
        </div>
      </div>
    </div>
  );
};

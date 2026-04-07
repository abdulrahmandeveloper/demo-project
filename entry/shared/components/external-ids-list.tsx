import { TMDBMovieExternalIdsResponse } from "@/features/movie/interfaces/tmdb.interface";
import { TMDBExternalIdsResponse } from "../interfaces/tmdb/tmdb.interface";
import { Badge } from "./ui/badge";

type ExternalIdsListProps = {
  list: TMDBExternalIdsResponse | TMDBMovieExternalIdsResponse | null;
};

export const ExternalIdsList = ({ list }: ExternalIdsListProps) => {
  const titlesClassnames = " font-medium text-white/60";
  const idsClassnames = "font- font-medium font-sans text-lg";
  const contanersClassname =
    " text-2xl flex items-center gap-2 font-bold bg-stone-900 px-4 py-5 rounded-lg";
  return (
    <>
      <div className={contanersClassname}>
        <span className={titlesClassnames}>TMDB ID:</span>
        <Badge variant="secondary" className={idsClassnames}>
          {list?.id || "N/A"}
        </Badge>
      </div>{" "}
      <div className={contanersClassname}>
        <span className={titlesClassnames}>Imdb ID:</span>
        <Badge variant="secondary" className={idsClassnames}>
          {list?.imdb_id || "N/A"}
        </Badge>
      </div>{" "}
      <div className={contanersClassname}>
        <span className={titlesClassnames}>Freebase mid ID:</span>
        <Badge variant="secondary" className={idsClassnames}>
          {list?.freebase_mid || "N/A"}
        </Badge>
      </div>{" "}
      <div className={contanersClassname}>
        <span className={titlesClassnames}>tvdb ID:</span>
        <Badge variant="secondary" className={idsClassnames}>
          {list?.tvdb_id || "N/A"}
        </Badge>
      </div>{" "}
      <div className={contanersClassname}>
        <span className={titlesClassnames}>tvrage ID:</span>
        <Badge variant="secondary" className={idsClassnames}>
          {list?.tvrage_id || "N/A"}
        </Badge>
      </div>{" "}
      <div className={contanersClassname}>
        <span className={titlesClassnames}>Wikidata ID:</span>
        <Badge variant="secondary" className={idsClassnames}>
          {list?.wikidata_id || "N/A"}
        </Badge>
      </div>{" "}
      <div className={contanersClassname}>
        <span className={titlesClassnames}>Facebook ID:</span>
        <Badge variant="secondary" className={idsClassnames}>
          {list?.facebook_id || "N/A"}
        </Badge>
      </div>{" "}
      <div className={contanersClassname}>
        <span className={titlesClassnames}>Instagram ID: </span>
        <Badge variant="secondary" className={idsClassnames}>
          {list?.instagram_id || "N/A"}
        </Badge>
      </div>{" "}
      <div className={contanersClassname}>
        <span className={titlesClassnames}>Twitter ID: </span>
        <Badge variant="secondary" className={idsClassnames}>
          {list?.twitter_id || "N/A"}
        </Badge>
      </div>{" "}
    </>
  );
};

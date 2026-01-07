import CastCard from "@/shared/components/card/cast-card";
import Link from "next/link";
import React from "react";

const SeriesDetailsPage = () => {
  return (
    <div>
      <div className=" w-full overflow-x-auto">
        <p className="text-xl font-bold mb-4">Crew: </p>
        <div className="flex gap-5  ">
          {crew.map((crew) => (
            <Link
              href={`/discover/people/${crew.id}`}
              className=""
              key={crew.id}
            >
              <CastCard
                name={crew.name}
                playedAs={crew.department}
                profilePath={crew.profile_path}
                className={"flex flex-col items-center w-full overflow-x-auto"}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsPage;

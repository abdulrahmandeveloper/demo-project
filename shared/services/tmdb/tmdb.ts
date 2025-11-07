import { collectionRespose } from "@/shared/interfaces/tmdb";
import { collectionsID } from "@/shared/lib/utils/constants/collections";

export const getCollectionFromTMDB = async () => {
  const collectionsData: collectionRespose[] = [];

  for (let i = 0; i < collectionsID.length; i++) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/collection/${collectionsID[i]}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    collectionsData.push(data);
  }
  console.log("collections :", collectionsData);
  console.log("collections :", collectionsData.length);

  return collectionsData;
};

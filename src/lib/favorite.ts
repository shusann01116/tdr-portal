"use client";

import { useEffect, useState } from "react";

type FacilityId = string;

const storeFavoriteList = (favoriteList: FacilityId[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
  }
};

const getFavoriteList = (): FacilityId[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const rawFavoriteList = localStorage.getItem("favoriteList");
  return rawFavoriteList ? JSON.parse(rawFavoriteList) : [];
};

/**
 * Hook to manage favorite status for a facility, using local storage to store the favorite list.
 * @param facilityId - The facility ID to toggle favorite status for
 * @returns An object containing the current favorite status and a function to toggle the favorite status
 */
export const useFavorite = (facilityId: string) => {
  const [isFavorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    const favorites = getFavoriteList();
    setFavorite(favorites.some((f: FacilityId) => f === facilityId));
  }, [facilityId]);

  const toggleFavorite = () => {
    setFavorite(!isFavorite);

    const favoriteList = getFavoriteList();
    const newFavoriteList = isFavorite
      ? favoriteList.filter((f) => f !== facilityId)
      : [...favoriteList, facilityId];
    storeFavoriteList(newFavoriteList);
  };

  return { isFavorite, toggleFavorite };
};

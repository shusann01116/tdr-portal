"use client";

import { StandbyCard } from "@/components/ui/standby-card";
import { areaList, getAreaByFacilityId } from "@/lib/area";
import { FacilityResp } from "@/lib/fetcher";
import { useState } from "react";

type Props = {
  standbyList: FacilityResp[];
};

export default function StandbyByArea({ standbyList }: Props) {
  const [favoriteList, setFavoriteList] = useState<Record<string, boolean>>(
    standbyList.reduce(
      (acc, facility) => {
        acc[facility.id] = false;
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  const groupedByArea = standbyList.reduce(
    (acc, facility) => {
      const area = getAreaByFacilityId(facility.id) ?? {
        AreaID: "9999",
        AreaName: "その他",
      };

      acc[area.AreaID] = acc[area.AreaID] || [];
      acc[area.AreaID].push(facility);
      return acc;
    },
    {} as Record<string, FacilityResp[]>,
  );

  return (
    <div className="space-y-6">
      {Object.entries(groupedByArea).map(([areaId, facilities]) => (
        <div key={areaId} className="w-full px-2">
          <h2 className="py-4 text-xl font-bold text-secondary-foreground lg:text-2xl">
            {areaList.find((area) => area.AreaID === areaId)?.AreaName ??
              "その他"}
          </h2>
          <ul className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <li key={facility.id}>
                <StandbyCard
                  facility={facility}
                  size="sm"
                  onFavorite={(id) => {
                    setFavoriteList((prev) => ({ ...prev, [id]: !prev[id] }));
                  }}
                  isFavorite={favoriteList[facility.id] ?? false}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

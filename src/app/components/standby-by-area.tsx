import { StandbyCard } from "@/components/ui/standby-card";
import { areaList, groupByArea } from "@/lib/tdr/area";
import type { Facility } from "@/lib/tdr/facility";
import { ParkType } from "@/lib/tdr/park";
import { getStandbys } from "@/lib/tdrofficial/fetcher";
import { Suspense } from "react";

export default async function StandbyByArea() {
  return (
    <div className="gap-y-6">
      <Suspense fallback={<div>Loading...</div>}>
        <_StandbyByArea
          groupedByAreaPromise={getStandbys(ParkType.ParkTypeTDL)}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <_StandbyByArea
          groupedByAreaPromise={getStandbys(ParkType.ParkTypeTDS)}
        />
      </Suspense>
    </div>
  );
}

const _StandbyByArea = async ({
  groupedByAreaPromise,
}: {
  groupedByAreaPromise: Promise<Facility[]>;
}) => {
  const groupedByArea = await groupedByAreaPromise;
  const standbyList = groupByArea(groupedByArea);

  return (
    <div className="gap-y-6">
      {Object.entries(standbyList).map(([areaId, facilities]) => (
        <div key={areaId} className="w-full px-2">
          <h2 className="sticky top-0 z-20 bg-gradient-to-t from-transparent to-background/50 py-4 font-bold text-secondary-foreground text-xl lg:text-2xl">
            {areaList.find((area) => area.AreaID === areaId)?.AreaName ??
              "その他"}
          </h2>
          <ul className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <li key={facility.id}>
                <StandbyCard facility={facility} size="sm" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

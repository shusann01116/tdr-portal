import { getFacilities } from "@/features/official/fetcher";
import { StandbyCard } from "@/features/standby/components/standby-card";
import { groupByArea } from "@/features/tdr/area";
import { AREA_LIST } from "@/features/tdr/const";
import type { Facility } from "@/features/tdr/facility";
import type { ParkType } from "@/features/tdr/park";
import Link from "next/link";
import { Suspense } from "react";

export default async function StandbyByArea({
  park,
}: {
  park: ParkType;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <_StandbyByArea facilityPromise={getFacilities(park)} />
    </Suspense>
  );
}

const _StandbyByArea = async ({
  facilityPromise,
}: {
  facilityPromise: Promise<Facility[]>;
}) => {
  const facilities = await facilityPromise;
  const facilitiesByGroup = groupByArea(facilities);

  return (
    <div className="space-y-6 px-2 md:px-0">
      {Object.entries(facilitiesByGroup).map(
        ([areaId, facilities], areaIndex) => (
          <div key={areaId} className="w-full">
            <h2 className="sticky top-0 z-20 bg-gradient-to-t from-background/0 to-background/90 py-4 font-bold text-secondary-foreground text-xl lg:text-2xl">
              {AREA_LIST.find((area) => area.AreaID === areaId)?.AreaName ??
                "その他"}
            </h2>
            <ul className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
              {facilities.map((facility) => (
                <li key={facility.id}>
                  <Link href={`/facilities/${facility.id}`}>
                    <StandbyCard
                      facility={facility}
                      size="sm"
                      priority={areaIndex === 0}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ),
      )}
    </div>
  );
};

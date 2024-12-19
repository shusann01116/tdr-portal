import { StandbyCard } from "@/components/ui/standby-card";
import { areaList, getAreaByFacilityId } from "@/lib/tdr/area";
import { type FacilityResp, getStandbys } from "@/lib/tdr/fetcher";

export default async function StandbyByArea() {
  const [standbyListTdl, standbyListTds] = await Promise.all([
    getStandbys("tdl"),
    getStandbys("tds"),
  ]);

  const standbyList = [...standbyListTdl, ...standbyListTds];
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
}

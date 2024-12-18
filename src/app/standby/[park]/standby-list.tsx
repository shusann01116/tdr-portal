import { badgeVariants } from "@/components/ui/badge";
import { type FacilityResp, type ParkType, getStandbys } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

const FacilityItem = ({ facility }: { facility: FacilityResp }) => {
  return (
    <li
      key={facility.id}
      className="flex gap-8 overflow-hidden bg-background py-4"
    >
      <section className="flex-1">
        <h2 className="text-wrap font-bold text-foreground text-xl">
          {facility.name}
        </h2>
        <p className="mt-2 flex">
          {facility.operatingStatus.name && (
            <span className="items-center text-muted-foreground text-sm">
              {facility.operatingStatus.name}
            </span>
          )}
        </p>
      </section>
      <section className="flex-col text-right text-lg sm:flex-none sm:text-base">
        {facility.standbyTime.time !== 0 && (
          <>
            <span className="block sm:inline">
              {facility.standbyTime.time}
              &nbsp;分
            </span>
            <p className="hidden sm:inline">待ち</p>
          </>
        )}
      </section>
    </li>
  );
};

export const StandbyList = async ({ park }: { park: ParkType }) => {
  const facilities = await getStandbys(park);

  if (!facilities) {
    return <div>No facilities found</div>;
  }

  return (
    <>
      <div className="flex gap-4 py-4">
        <Link
          href="/standby/tdl"
          className={cn(
            badgeVariants({ variant: "outline" }),
            "bg-muted text-muted-foreground",
            {
              "bg-background text-foreground": park === "tdl",
            },
          )}
        >
          DisneyLand
        </Link>
        <Link
          href="/standby/tds"
          className={cn(
            badgeVariants({ variant: "outline" }),
            "bg-muted text-muted-foreground",
            {
              "bg-background text-foreground": park === "tds",
            },
          )}
        >
          DisneySea
        </Link>
      </div>
      <Suspense fallback={<div>Loading facilities...</div>}>
        <ul className="w-full max-w-3xl divide-y">
          {facilities.map((facility) => (
            <FacilityItem facility={facility} key={facility.id} />
          ))}
        </ul>
      </Suspense>
      <div className="mt-4" />
    </>
  );
};

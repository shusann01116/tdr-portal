import { ParkType } from "@/features/tdr/park";
import { Suspense } from "react";
import StandbyByArea from "../features/standby/components/standby-by-area";

export const revalidate = 300;

export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-y-6">
        <Suspense fallback={<div>Loading...</div>}>
          <StandbyByArea park={ParkType.ParkTypeTDL} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <StandbyByArea park={ParkType.ParkTypeTDS} />
        </Suspense>
      </div>
    </>
  );
}

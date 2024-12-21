import { Suspense } from "react";
import StandbyByArea from "../features/standby/components/standby-by-area";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StandbyByArea />
    </Suspense>
  );
}

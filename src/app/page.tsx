import { Suspense } from "react";
import StandbyByArea from "./standby-by-area";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StandbyByArea />
    </Suspense>
  );
}

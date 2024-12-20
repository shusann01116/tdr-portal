import { Suspense } from "react";
import StandbyByArea from "./components/standby-by-area";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StandbyByArea />
    </Suspense>
  );
}

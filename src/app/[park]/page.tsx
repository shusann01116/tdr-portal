import StandbyByArea from "@/features/standby/components/standby-by-area";
import { toParkType } from "@/features/tdr/park";
import { Suspense } from "react";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ park: "tdl" }, { park: "tds" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ park: string }>;
}) {
  const { park } = await params;
  const parkType = toParkType(park);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StandbyByArea park={parkType} />
    </Suspense>
  );
}

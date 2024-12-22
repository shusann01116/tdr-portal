import { Card, CardContent } from "@/components/ui/card";
import type { Facility } from "@/features/tdr/facility";
import { Clock } from "lucide-react";
import Image from "next/image";

export default function FacilityRoot({
  facility,
}: {
  facility: Facility;
}) {
  return (
    <div className="h-full w-full space-y-4">
      <div className="space-y-2">
        <Image
          src={facility.facilityImage?.main.url ?? ""}
          alt={facility.facilityImage?.main.alt ?? ""}
          width={390}
          height={219}
          className="h-full w-full object-cover"
          priority
        />
        <section className="flex flex-col gap-2 px-2 md:px-0">
          <h1 className="font-bold text-2xl">{facility.name}</h1>
          {facility.facilityDescription && (
            <p className="text-muted-foreground text-xs">
              {facility.facilityDescription}
            </p>
          )}
        </section>
      </div>
      <Card className="mx-2 md:mx-0">
        <CardContent className="space-y-2 p-6">
          <h2 className="flex w-full flex-1 items-center justify-between font-light text-secondary-foreground text-xs">
            待ち時間
            <Clock className="size-4" />
          </h2>
          <p className="flex items-baseline gap-x-1 font-extrabold text-4xl">
            {facility.standbyTime.time}
            <span className="font-normal text-base">分</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { FacilityResp } from "@/lib/fetcher";
import { Card } from "./card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Clock, Star } from "lucide-react";
import { Badge, badgeVariants } from "./badge";
import { Button } from "./button";

type StandbyCardProps = {
  facility: FacilityResp;
  size: "sm" | "lg";
  onFavorite: (facilityId: string) => void;
  isFavorite: boolean;
  imageUrl?: string;
};

export const StandbyCard = ({
  facility,
  size,
  onFavorite,
  isFavorite,
  imageUrl,
}: StandbyCardProps) => {
  if (size === "sm") {
    return (
      <SmallStandbyCard
        facility={facility}
        onFavorite={onFavorite}
        isFavorite={isFavorite}
        imageUrl={imageUrl}
      />
    );
  }

  return <Card>StandbyCard</Card>;
};

const SmallStandbyCard = ({
  facility,
  isFavorite,
  imageUrl,
  onFavorite,
}: {
  facility: FacilityResp;
  isFavorite: boolean;
  imageUrl?: string;
  onFavorite: (facilityId: string) => void;
}) => {
  const defaultImage =
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80";
  return (
    <Card className="flex flex-row gap-4 p-0">
      <div className="relative w-[40%] max-w-[120px]">
        <Image
          src={imageUrl || defaultImage}
          alt="Photo by Drew Beamer"
          fill
          className="rounded-md rounded-r-none object-cover"
        />
      </div>
      <div className="mr-4 flex w-full flex-col gap-3 py-2">
        <section>
          <h1 className="line-clamp-1 w-full font-bold text-card-foreground">
            {facility.name}
          </h1>
          <p className="line-clamp-1 text-xs text-secondary-foreground">
            {facility.operatingStatus.name}
          </p>
        </section>
        <section className="flex gap-1">
          <Button
            variant="link"
            className={cn(
              badgeVariants({ variant: "outline" }),
              "flex h-6 items-center gap-1",
            )}
            onClick={() => onFavorite(facility.id)}
          >
            {isFavorite ? (
              <Star className="h-3 w-3 border-none fill-primary stroke-primary" />
            ) : (
              <Star className="h-3 w-3" />
            )}
          </Button>
          {facility.standbyTime !== 0 && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 font-light"
            >
              <Clock className="h-3 w-3" /> {facility.standbyTime}分待ち
            </Badge>
          )}
          <p className="ml-auto place-self-end font-mono text-[8px] text-muted-foreground">
            ID:{facility.id}
          </p>
        </section>
      </div>
    </Card>
  );
};

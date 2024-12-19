"use client";

import { useFavorite } from "@/lib/tdr/favorite";
import type { FacilityResp } from "@/lib/tdr/fetcher";
import { cn } from "@/lib/utils";
import { Clock, Star } from "lucide-react";
import Image from "next/image";
import { Badge, badgeVariants } from "./badge";
import { Button } from "./button";
import { Card } from "./card";

type StandbyCardProps = {
  facility: FacilityResp;
  size: "sm" | "lg";
  imageUrl?: string;
};

export const StandbyCard = ({ facility, size, imageUrl }: StandbyCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorite(facility.id);

  if (size === "sm") {
    return (
      <SmallStandbyCard
        facility={facility}
        onFavorite={toggleFavorite}
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
    <Card className="flex h-full flex-row gap-4 p-0">
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
          <p className="line-clamp-1 text-secondary-foreground text-xs">
            {facility.operatingStatus.name}
          </p>
        </section>
        <section className="mt-auto flex items-center gap-1">
          <Button
            aria-label="favorite"
            variant="link"
            className={cn(
              badgeVariants({ variant: "outline" }),
              "flex h-full items-center gap-1",
            )}
            onClick={() => onFavorite(facility.id)}
          >
            {isFavorite ? (
              <Star className="h-3 w-3 border-none fill-primary stroke-primary" />
            ) : (
              <Star className="h-3 w-3" />
            )}
          </Button>
          {facility.standbyTime.time !== 0 && (
            <Badge
              variant="outline"
              className="flex h-full items-center gap-1 font-light"
            >
              <Clock className="h-3 w-3" />
              <span className="flex items-baseline gap-[2px]">
                <span className="font-semibold text-sm">
                  {facility.standbyTime.time}
                </span>
                <span className="font-light text-xs">分待ち</span>
              </span>
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

import { ParkType } from "./park";

export interface Link {
  attraction: string;
  greeting: string;
}

const OFFICIAL_LINK_MAP = {
  tdl_attraction:
    "https://www.tokyodisneyresort.jp/_/realtime/tdl_attraction.json",
  tds_attraction:
    "https://www.tokyodisneyresort.jp/_/realtime/tds_attraction.json",
  tdl_greeting: "https://www.tokyodisneyresort.jp/_/realtime/tdl_greeting.json",
  tds_greeting: "https://www.tokyodisneyresort.jp/_/realtime/tds_greeting.json",
} as const;

export function getLink(park: ParkType): Link | null {
  switch (park) {
    case ParkType.ParkTypeTDL:
      return {
        attraction: OFFICIAL_LINK_MAP.tdl_attraction,
        greeting: OFFICIAL_LINK_MAP.tdl_greeting,
      };
    case ParkType.ParkTypeTDS:
      return {
        attraction: OFFICIAL_LINK_MAP.tds_attraction,
        greeting: OFFICIAL_LINK_MAP.tds_greeting,
      };
    default:
      return null;
  }
}

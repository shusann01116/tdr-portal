import { describe, expect, it } from "vitest";
import type { Link } from "../tdr/link";
import { getLink } from "../tdr/link";
import { ParkType } from "../tdr/park";

describe("getLink", () => {
  it("getLink for tdl", () => {
    const expected: Link = {
      attraction:
        "https://www.tokyodisneyresort.jp/_/realtime/tdl_attraction.json",
      greeting: "https://www.tokyodisneyresort.jp/_/realtime/tdl_greeting.json",
    };
    expect(getLink(ParkType.ParkTypeTDL)).toEqual(expected);
  });

  it("getLink for tds", () => {
    const expected: Link = {
      attraction:
        "https://www.tokyodisneyresort.jp/_/realtime/tds_attraction.json",
      greeting: "https://www.tokyodisneyresort.jp/_/realtime/tds_greeting.json",
    };
    expect(getLink(ParkType.ParkTypeTDS)).toEqual(expected);
  });
});

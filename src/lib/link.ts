export interface Link {
	attraction: string;
	greeting: string;
}

const links = {
	tdl_attraction:
		"https://www.tokyodisneyresort.jp/_/realtime/tdl_attraction.json",
	tds_attraction:
		"https://www.tokyodisneyresort.jp/_/realtime/tds_attraction.json",
	tdl_greeting: "https://www.tokyodisneyresort.jp/_/realtime/tdl_greeting.json",
	tds_greeting: "https://www.tokyodisneyresort.jp/_/realtime/tds_greeting.json",
} as const;

export type ParkType = "tdl" | "tds";

export function getLink(park: ParkType): Link | null {
	switch (park) {
		case "tdl":
			return {
				attraction: links.tdl_attraction,
				greeting: links.tdl_greeting,
			};
		case "tds":
			return {
				attraction: links.tds_attraction,
				greeting: links.tds_greeting,
			};
		default:
			return null;
	}
}

import type { FacilityResp } from "./fetcher";
import type { Facility } from "./types";

export function toFacilityRespFromAttraction(f: Facility): FacilityResp {
  return {
    id: f.FacilityID,
    name: f.FacilityName,
    operatingStatus: {
      id: f.OperatingStatusCD ?? f.FacilityStatusCD ?? "",
      name: f.OperatingStatus ?? f.FacilityStatus ?? "",
    },
    operatingHour: {
      from: new Date(`${f.OperatingHoursFromDate} ${f.OperatingHoursFrom}:00`),
      to: new Date(`${f.OperatingHoursToDate} ${f.OperatingHoursTo}:00`),
    },
    standbyTime: {
      dateTime: new Date(f.UpdateTime),
      time:
        typeof f.StandbyTime === "string"
          ? Number.parseInt(f.StandbyTime, 10)
          : 0,
    },
    updatedAt: new Date(f.UpdateTime),
  };
}

export function toFacilityRespFromGreeting(
  f: Facility,
): FacilityResp | undefined {
  const greeting = f.greeting;
  if (!greeting) return undefined;

  const operatingHours = greeting.operatinghours?.[0] || {};

  return {
    id: greeting.FacilityID,
    name: greeting.FacilityName,
    operatingStatus: {
      id: operatingHours.OperatingStatusCD ?? "",
      name: operatingHours.OperatingStatus ?? "",
    },
    operatingHour: {
      from: new Date(
        `${operatingHours.OperatingHoursFromDate} ${operatingHours.OperatingHoursFrom}:00`,
      ),
      to: new Date(
        `${operatingHours.OperatingHoursToDate} ${operatingHours.OperatingHoursTo}:00`,
      ),
    },
    standbyTime: {
      dateTime: new Date(greeting.UpdateTime),
      time:
        typeof greeting.StandbyTime === "string"
          ? Number.parseInt(greeting.StandbyTime, 10)
          : 0,
    },
    updatedAt: new Date(greeting.UpdateTime),
  };
}

import { describe, expect, it } from "vitest";
import type { Facility } from "../tdr/facility";
import { toFacilityFromAttraction, toFacilityFromGreeting } from "./fetcher";
import type { API_Facility } from "./types";

describe("toFacilityRespFromAttraction", () => {
  it("should transform a Facility object into a FacilityResp object", () => {
    const facility: API_Facility = {
      FacilityID: "1",
      FacilityName: "Test Attraction",
      OperatingStatusCD: "open",
      OperatingStatus: "Open",
      OperatingHoursFromDate: "2023-10-01",
      OperatingHoursFrom: "09:00",
      OperatingHoursToDate: "2023-10-01",
      OperatingHoursTo: "21:00",
      StandbyTime: "30",
      UpdateTime: "2023-10-01T12:00:00Z",
      FacilityKanaName: "",
      NewFlg: false,
      FacilityURLSP: null,
      FacilityStatusCD: null,
      FacilityStatus: null,
      SunsetFlg: false,
      Fsflg: false,
      FsStatusflg: null,
      FsStatus: null,
      FsStatusCD: null,
      FsStatusStartDate: null,
      FsStatusStartTime: null,
      FsStatusEndDate: null,
      FsStatusEndTime: null,
      UseLimitFlg: false,
      UseStandbyTimeStyle: false,
      OperatingChgFlg: false,
      operatingHours: [],
      greeting: {
        FacilityID: "1",
        FacilityName: "Test Attraction",
        FacilityKanaName: "",
        NewFlg: false,
        AreaJName: "",
        AreaMName: "",
        FacilityURLSP: null,
        FacilityStatusCD: null,
        FacilityStatus: null,
        StandbyTime: null,
        operatinghours: [],
        UseStandbyTimeStyle: false,
        UpdateTime: "",
      },
    };

    const expected: Facility = {
      id: "1",
      name: "Test Attraction",
      operatingStatus: { id: "open", name: "Open" },
      operatingHour: {
        from: new Date("2023-10-01T09:00:00"),
        to: new Date("2023-10-01T21:00:00"),
      },
      standbyTime: { dateTime: new Date("2023-10-01T12:00:00Z"), time: 30 },
      updatedAt: new Date("2023-10-01T12:00:00Z"),
      facilityImage: {
        main: {
          url: "",
          alt: "Test Attractionのメイン画像",
        },
      },
    };

    const result = toFacilityFromAttraction(facility);

    expect(result).toEqual(expected);
  });
});

describe("toFacilityRespFromGreeting", () => {
  it("should transform a Facility object with greeting into a FacilityResp object", () => {
    const facility: API_Facility = {
      greeting: {
        FacilityID: "2",
        FacilityName: "Test Greeting",
        operatinghours: [
          {
            OperatingStatusCD: "closed",
            OperatingStatus: "Closed",
            OperatingHoursFromDate: "2023-10-01",
            OperatingHoursFrom: "10:00",
            OperatingHoursToDate: "2023-10-01",
            OperatingHoursTo: "18:00",
            OperatingChgFlg: false,
            SunsetFlg: false,
          },
        ],
        StandbyTime: "15",
        UpdateTime: "2023-10-01T13:00:00Z",
        FacilityKanaName: "",
        NewFlg: false,
        AreaJName: "",
        AreaMName: "",
        FacilityURLSP: null,
        FacilityStatusCD: null,
        FacilityStatus: null,
        UseStandbyTimeStyle: false,
      },
      FacilityID: "",
      FacilityName: "",
      FacilityKanaName: "",
      NewFlg: false,
      FacilityURLSP: null,
      FacilityStatusCD: null,
      FacilityStatus: null,
      StandbyTime: null,
      OperatingHoursFromDate: "",
      OperatingHoursFrom: "",
      OperatingHoursToDate: "",
      OperatingHoursTo: "",
      OperatingStatusCD: "",
      OperatingStatus: "",
      SunsetFlg: false,
      Fsflg: false,
      FsStatusflg: null,
      FsStatus: null,
      FsStatusCD: null,
      FsStatusStartDate: null,
      FsStatusStartTime: null,
      FsStatusEndDate: null,
      FsStatusEndTime: null,
      UseLimitFlg: false,
      UseStandbyTimeStyle: false,
      OperatingChgFlg: false,
      UpdateTime: "",
      operatingHours: [],
    };

    const expected: Facility = {
      id: "2",
      name: "Test Greeting",
      operatingStatus: { id: "closed", name: "Closed" },
      operatingHour: {
        from: new Date("2023-10-01T10:00:00"),
        to: new Date("2023-10-01T18:00:00"),
      },
      standbyTime: { dateTime: new Date("2023-10-01T13:00:00Z"), time: 15 },
      updatedAt: new Date("2023-10-01T13:00:00Z"),
      facilityImage: {
        main: {
          url: "",
          alt: "Test Greetingのメイン画像",
        },
      },
    };

    const result = toFacilityFromGreeting(facility);

    expect(result).toEqual(expected);
  });

  it("should return undefined if greeting is not present", () => {
    const facility: API_Facility = {} as API_Facility;

    const result = toFacilityFromGreeting(facility);

    expect(result).toBeUndefined();
  });
});

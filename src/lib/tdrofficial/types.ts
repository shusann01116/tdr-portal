export interface API_FacilityOperatingHours {
  OperatingHoursFromDate: string;
  OperatingHoursFrom: string;
  OperatingHoursToDate: string;
  OperatingHoursTo: string;
  SunsetFlg: boolean;
  OperatingStatusCD: string | null;
  OperatingStatus: string | null;
  OperatingChgFlg: boolean;
}

export interface API_Facility {
  FacilityID: string;
  FacilityName: string;
  FacilityKanaName: string;
  NewFlg: boolean;
  FacilityURLSP: string | null;
  FacilityStatusCD: string | null;
  FacilityStatus: string | null;
  StandbyTime: boolean | string | null;
  OperatingHoursFromDate: string;
  OperatingHoursFrom: string;
  OperatingHoursToDate: string;
  OperatingHoursTo: string;
  OperatingStatusCD: string;
  OperatingStatus: string;
  SunsetFlg: boolean;
  Fsflg: boolean;
  FsStatusflg: string | null;
  FsStatus: string | null;
  FsStatusCD: string | null;
  FsStatusStartDate: string | null;
  FsStatusStartTime: string | null;
  FsStatusEndDate: string | null;
  FsStatusEndTime: string | null;
  UseLimitFlg: boolean;
  UseStandbyTimeStyle: boolean;
  OperatingChgFlg: boolean;
  UpdateTime: string;
  operatingHours: API_FacilityOperatingHours[];

  // greeting
  greeting: API_FacilityGreeting;
  cameraman?: API_FacilityCameraman;
}

export interface API_OperatingHours {
  OperatingHoursFromDate: string;
  OperatingHoursFrom: string;
  OperatingHoursToDate: string;
  OperatingHoursTo: string;
  OperatingStatusCD: string | null;
  OperatingStatus: string | null;
  OperatingChgFlg: boolean;
  SunsetFlg: boolean;
}

export interface API_FacilityGreeting {
  FacilityID: string;
  FacilityName: string;
  FacilityKanaName: string;
  NewFlg: boolean;
  AreaJName: string;
  AreaMName: string;
  FacilityURLSP: string | null;
  FacilityStatusCD: string | null;
  FacilityStatus: string | null;
  StandbyTime: string | null;
  operatinghours: API_OperatingHours[];
  UseStandbyTimeStyle: boolean;
  UpdateTime: string;
}

export interface API_FacilityCameraman {
  FacilityID: string;
  FacilityName: string;
  FacilityKanaName: string;
  FacilityStatusCD: string;
  FacilityStatus: string;
  operatinghours: API_OperatingHours[] | null;
  UpdateTime: string;
}

export interface API_Area {
  AreaJName: string;
  AreaMName: string;
  Facility: API_Facility[];
}

export interface API_Greetings {
  [key: string]: API_Area;
}

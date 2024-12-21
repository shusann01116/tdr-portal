export type Facility = {
  id: string;
  name: string;
  operatingStatus: OperatingStatus;
  operatingHour: OperatingHour;
  standbyTime: StandbyTime;
  updatedAt: Date;
};

export type OperatingStatus = {
  id: string;
  name: string;
};

export type OperatingHour = {
  from: Date;
  to: Date;
};

export type StandbyTime = {
  dateTime: Date;
  time: number;
};

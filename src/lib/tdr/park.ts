export enum ParkType {
  ParkTypeTDL = 0,
  ParkTypeTDS = 1,
}

export const toParkType = (park: string): ParkType => {
  if (park === "tdl") {
    return ParkType.ParkTypeTDL;
  }
  if (park === "tds") {
    return ParkType.ParkTypeTDS;
  }
  throw new Error("Invalid park type");
};

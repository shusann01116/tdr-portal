import { ParkType } from "@/features/tdr/park";
import type { Meta } from "@storybook/react";
import StandbyByArea from "./standby-by-area";

const meta: Meta<typeof StandbyByArea> = {
  component: StandbyByArea,
  args: {
    park: ParkType.ParkTypeTDL,
  },
};

export default meta;

export const Default = {};

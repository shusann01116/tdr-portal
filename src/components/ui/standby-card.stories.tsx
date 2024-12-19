import type { FacilityResp } from "@/lib/tdr/fetcher";
import type { Meta, StoryObj } from "@storybook/react";
import { StandbyCard } from "./standby-card";

const facility: FacilityResp = {
  id: "1",
  name: "ジャングルクルーズ：ワイルドライフエクスペディション",
  operatingStatus: { id: "1", name: "Open" },
  operatingHour: { from: new Date(), to: new Date() },
  standbyTime: { dateTime: new Date(), time: 10 },
  updatedAt: new Date(),
};

const meta: Meta<typeof StandbyCard> = {
  component: StandbyCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StandbyCard>;

export const Default: Story = {
  args: {
    facility,
    size: "sm",
  },
};

export const Favorite: Story = {
  args: {
    facility,
    size: "sm",
  },
};

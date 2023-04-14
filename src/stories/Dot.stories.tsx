import type { Meta, StoryObj } from "@storybook/react";

import Dot from "components/Dot";
import { string, number } from "prop-types";

const meta = {
  title: "Atom/Dot",
  component: Dot,
  tags: ["autodocs"],
  argTypes: {
    color: string,
    variant: string,
    sx: string,
    size: number,
  },
} satisfies Meta<typeof Dot>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: { size: 20, color: "primary" },
};

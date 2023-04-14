import React from "react";
import type { Preview } from "@storybook/react";
import { ConfigProvider } from "../src/contexts/ConfigContext";
import ThemeProvider from "../src/themes";
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </ConfigProvider>
    ),
  ],
};
export default preview;

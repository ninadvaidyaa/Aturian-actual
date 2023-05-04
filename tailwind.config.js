/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          primary: withOpacity("--color-text-primary"),
          muted: withOpacity("--color-text-muted"),
          inverted: withOpacity("--color-text-inverted"),
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity("--color-fill"),
          "fill-hover": withOpacity("--bg-fill-muted"),
          base: withOpacity("--bg-base"),
          "base-hover": withOpacity("--bg-hover"),
          "button-accent": withOpacity("--color-button-accent"),
          "button-accent-hover": withOpacity("--color-button-accent-hover"),
          "button-muted": withOpacity("--color-button-muted"),
        },
      },
      gradientColorStops: {
        skin: {
          hue: withOpacity("--color-fill"),
        },
      },
      ringColor:{
        skin: {
          primary: withOpacity("--bg-hover"),
        },
      }
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
  variants: {
    scrollbar: ["rounded"],
  },
};

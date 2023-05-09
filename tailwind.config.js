/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

function generateColors(color) {
  const colorMap = {};
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].forEach((index) => {
    colorMap[index] = withOpacity(`${color}-${index}`);
  });
  return colorMap;
}

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: generateColors("--clr-primary"),
      },
      gradientColorStops: {
        primary: generateColors("--clr-primary"),
      },
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          primary: withOpacity("--color-text-primary"),
          muted: withOpacity("--color-text-muted"),
          inverted: withOpacity("--color-text-inverted"),
        },
      },
      backgroundColor: {
        base: withOpacity("--bg-base"),
        "base-hover": withOpacity("--bg-hover"),
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
      ringColor: {
        skin: {
          primary: withOpacity("--bg-hover"),
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
  variants: {
    scrollbar: ["rounded"],
  },
};

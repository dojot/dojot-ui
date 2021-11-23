import dark from "./dark";
import light from "./light";

export const THEME_TYPES = Object.freeze({
  LIGHT: "light",
  DARK: "dark",
});

export const getThemeSchema = (alias) => {
  if (alias === THEME_TYPES.LIGHT) {
    return light;
  }
  return dark;
};

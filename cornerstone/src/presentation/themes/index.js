import dark from "./dark";
import light from "./light";

const THEME_TYPES = Object.freeze({
  LIGHT: "light",
  DARK: "dark",
});

const getThemeSchema = (alias) => {
  if (alias === THEME_TYPES.LIGHT) {
    return light;
  }
  return dark;
};

export { dark, light, THEME_TYPES, getThemeSchema };

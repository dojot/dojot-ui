import { dark, getThemeSchema, light, THEME_TYPES } from "./index";

describe("Theme Unit Tests", () => {
  it("1. should be able to get the light theme schema", () => {
    const theme = getThemeSchema(THEME_TYPES.LIGHT);
    expect(theme).toBe(light);
  });

  it("2. should be able to get the default theme schema", () => {
    const theme = getThemeSchema(THEME_TYPES.DARK);
    expect(theme).toBe(dark);
  });
});

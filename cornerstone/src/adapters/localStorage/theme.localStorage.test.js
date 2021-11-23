import { getTheme, setTheme } from "./theme.localStorage";

it("save in localStorage", () => {
  const defaultTheme = "light";
  setTheme(defaultTheme);
  const receivedTheme = localStorage.getItem("THEME_TYPE");
  expect(receivedTheme).toEqual(defaultTheme);
});

it("retrieve from localStorage", () => {
  localStorage.setItem("THEME_TYPE", "dark");
  const receivedTheme = getTheme();
  expect(receivedTheme).toEqual("dark");
});

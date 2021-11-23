import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";

import MainLayout from "./MainLayout";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("MainLayout", () => {
  it("1. should to able rendering the component ", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <MainLayout />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });
});

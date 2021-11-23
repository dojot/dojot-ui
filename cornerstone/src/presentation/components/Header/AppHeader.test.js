import React from "react";

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import AppHeader from "./AppHeader";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("AppHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const initialProps = {
    isMenuOpen: true,
    toggleMenu: jest.fn(),
    title: "title",
  };

  it("1. should to able simple render ", () => {
    const { container } = render(<AppHeader {...initialProps} />);

    const selectedItem = container.querySelector("h6");

    expect(selectedItem.innerHTML).toEqual("title");
    expect(container).toBeInTheDocument();
  });

  it("2. should be able to click on open button", () => {
    const { container } = render(<AppHeader {...initialProps} isMenuOpen={false} />);

    fireEvent.click(container.querySelector("#btnOpenMenu"));
    const btnClose = container.querySelector("#btnCloseMenu");

    expect(btnClose).toBeNull();
    expect(initialProps.toggleMenu).toHaveBeenCalled();
  });

  it("3. should be able to click on close button", () => {
    const { container } = render(<AppHeader {...initialProps} />);

    fireEvent.click(container.querySelector("#btnCloseMenu"));
    const btnOpen = container.querySelector("#btnOpenMenu");

    expect(btnOpen).toBeNull();
    expect(initialProps.toggleMenu).toHaveBeenCalled();
  });
});

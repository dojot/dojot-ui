import { act, fireEvent, render } from "@testing-library/react";

import { UserInfo } from "./index";

import * as storage from "../../../adapters/localStorage/login.localStorage";
import * as auth from "../../../adapters/services/authentication.service";

const mockNavigate = jest.fn().mockImplementation((path) => path);

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn().mockImplementation(() => mockNavigate),
}));

jest.spyOn(storage, "getUserInformation").mockReturnValueOnce({
  userName: "user",
  tenant: "tenant",
  profile: "profile",
});

jest.spyOn(auth, "logout").mockReturnValueOnce(true);

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("UserInfo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("1. should be able to simple render", () => {
    const { container } = render(<UserInfo />);
    expect(container).toBeInTheDocument();
  });

  it("2. should be able to open menu when button menu is clicked", () => {
    const { getByTestId } = render(<UserInfo />);
    const menuButton = getByTestId("menuButton");

    act(() => {
      fireEvent.click(menuButton);
    });

    const tenant = getByTestId("tenant");
    const version = getByTestId("version");
    const darkMode = getByTestId("darkMode");
    const changePassword = getByTestId("changePassword");
    const logout = getByTestId("logout");

    expect(tenant).toBeInTheDocument();
    expect(version).toBeInTheDocument();
    expect(darkMode).toBeInTheDocument();
    expect(changePassword).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });

  it("3. should change dark mode to light mode.", () => {
    const { getByTestId } = render(<UserInfo />);
    const menuButton = getByTestId("menuButton");

    act(() => {
      fireEvent.click(menuButton);
    });

    const darkMode = getByTestId("darkMode");
    act(() => {
      fireEvent.click(darkMode);
    });

    const lightMode = getByTestId("lightMode");
    expect(lightMode).toBeInTheDocument();
    expect(darkMode).not.toBeInTheDocument();
  });

  it("4. should send the user to change-password page. ", () => {
    const { getByTestId } = render(<UserInfo />);
    const menuButton = getByTestId("menuButton");

    act(() => {
      fireEvent.click(menuButton);
    });

    const changePassword = getByTestId("changePassword");
    act(() => {
      fireEvent.click(changePassword);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/change-password");
  });

  it("5. should send the user to login page. ", () => {
    const { getByTestId } = render(<UserInfo />);
    const menuButton = getByTestId("menuButton");

    act(() => {
      fireEvent.click(menuButton);
    });

    const logout = getByTestId("logout");
    act(() => {
      fireEvent.click(logout);
    });
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  // TODO: we should check the menu closing
});

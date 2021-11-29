import Alert from "@material-ui/lab/Alert";
import { act, fireEvent, render } from "@testing-library/react";
import { mount } from "enzyme";
import * as authenticationService from "./../../../adapters/services/authentication.service";

import * as api from "../../../adapters/services/http.api";

import Login from "./Login";

jest.mock("react-router-dom", () => ({
  Redirect: jest.fn((options) => <div>{options.to.pathname}</div>),
}));

const DEFAULT_JWT = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const updateFormikField = async (nativeFieldWrapper, targetName, value) => {
  await act(async () => {
    nativeFieldWrapper.simulate("change", {
      target: { name: targetName, value },
    });
  });
  await act(async () => {
    nativeFieldWrapper.simulate("blur", { target: { name: targetName } });
  });
};

const submitFormikForm = async (nativeFormWrapper) => {
  await act(async () => {
    nativeFormWrapper.simulate("submit", { preventDefault: () => {} });
  });
};

const setUserAndSubmit = async (wrapper, user, pass) => {
  const userField = wrapper.find("input[name='user']");
  await updateFormikField(userField, "user", user);
  const passwordField = wrapper.find("input[name='password']");
  await updateFormikField(passwordField, "password", pass);
  const htmlForm = wrapper.find("form");

  await submitFormikForm(htmlForm);
  wrapper.update();
};

describe("Login", () => {
  const DEFAULT_PASS = "test";
  const DEFAULT_USER = "test";

  it("shoud be show characters minimum message", async () => {
    const wrapper = mount(<Login />);
    await setUserAndSubmit(wrapper, "c", "c");
    const passwordField = wrapper.find("p[id='password-helper-text']");

    expect(passwordField.text()).toEqual("login:characters_minimum");
  });

  it("shoud be able to simple render Network error", async () => {
    jest.spyOn(authenticationService, "login").mockImplementationOnce(() => {
      throw new Error("404");
    });
    const wrapper = mount(<Login />);
    await setUserAndSubmit(wrapper, DEFAULT_USER, DEFAULT_PASS);
    expect(wrapper.find(Alert).at(0).text()).toEqual("login:network_error");
  });

  it("shoud be able to simple render Login Error", async () => {
    jest.spyOn(authenticationService, "login").mockImplementationOnce(() => {
      throw new Error("Erro ao efetuar login");
    });
    const wrapper = mount(<Login />);
    await setUserAndSubmit(wrapper, DEFAULT_USER, DEFAULT_PASS);
    expect(wrapper.find(Alert).at(0).text()).toEqual("login:login_error");
  });

  it("shoud be able to simple render", () => {
    const { container } = render(<Login />);
    expect(container).toBeInTheDocument();
  });

  it("user field should accepts data", () => {
    const { getByTestId } = render(<Login />);
    fireEvent.change(getByTestId("userTest"), {
      target: { value: DEFAULT_USER },
    });
    expect(getByTestId("userTest")).toHaveValue(DEFAULT_USER);
  });

  it("password field should accepts password", () => {
    const { getByTestId } = render(<Login />);
    fireEvent.change(getByTestId("passwordTest"), {
      target: { value: DEFAULT_PASS },
    });
    expect(getByTestId("passwordTest")).toHaveValue(DEFAULT_PASS);
  });

  it("should log in correctly", async () => {
    jest.spyOn(api, "unprotectedAPI").mockImplementationOnce(() => ({
      login: {
        jwt: DEFAULT_JWT,
      },
      user: { profile: "test", user: DEFAULT_USER },
    }));

    const wrapper = mount(<Login />);
    await setUserAndSubmit(wrapper, DEFAULT_USER, DEFAULT_PASS);
    expect(wrapper.find("div").text()).toEqual("/dashboard");
    wrapper.unmount();
  });
});

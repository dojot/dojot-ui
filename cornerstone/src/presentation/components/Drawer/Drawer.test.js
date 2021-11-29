import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterNoneIcon from "@mui/icons-material/DeviFilterNoneceHub";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Drawer } from ".";

const initialProps = {
  isMenuOpen: false,
  menuItems: [
    {
      visible: true,
      i18n: "devices",
      label: "Dispositivos",
      path: "/devices",
      icon: DevicesOtherIcon,
    },
    {
      visible: true,
      label: "Modelos",
      i18n: "templates",
      path: "/templates",
      icon: FilterNoneIcon,
    },
    {
      visible: false,
      i18n: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: DashboardIcon,
    },
  ],
};

describe("DrawerComponent Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("1. should be able to render only the visible menu items", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Drawer {...initialProps} />
      </MemoryRouter>,
    );

    const menuList = container.querySelector("ul");
    const menuItems = menuList.querySelectorAll("a");

    expect(container.querySelector(".MuiDrawer-root").outerHTML).toContain("drawerClose");
    expect(menuItems.length).toBe(2);
  });

  it("2. should be able simple render with device menu selected", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/devices"]}>
        <Drawer {...initialProps} />
      </MemoryRouter>,
    );

    const selectedItem = container
      .querySelector(".Mui-selected")
      .querySelectorAll("div")[1]
      .querySelector("span");

    expect(selectedItem.innerHTML).toEqual("Dispositivos");
  });

  it("3. should be able simple render with template menu option selected", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/templates"]}>
        <Drawer {...initialProps} />
      </MemoryRouter>,
    );

    const selectedItem = container
      .querySelector(".Mui-selected")
      .querySelectorAll("div")[1]
      .querySelector("span");

    expect(selectedItem.innerHTML).toEqual("Modelos");
  });

  it("4. should be able simple render opened drawer", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Drawer {...initialProps} isMenuOpen />
      </MemoryRouter>,
    );

    const image = container.querySelector("img");

    expect(image.className).toContain("Big");
    expect(container.querySelector(".MuiDrawer-root").outerHTML).toContain("drawerOpen");
  });

  it("5. should be able render the drawer as closed", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Drawer {...initialProps} isMenuOpen={false} />
      </MemoryRouter>,
    );

    const image = container.querySelector("img");

    expect(image.className).toContain("Small");
    expect(container.querySelector(".MuiDrawer-root").outerHTML).toContain("drawerClose");
  });

  it("6. should be able to render all visible menu items", () => {
    const { container } = render(
      <MemoryRouter>
        <Drawer {...initialProps} />
      </MemoryRouter>,
    );

    const menuList = container.querySelector("ul");
    const menuItems = menuList.querySelectorAll("a");

    expect(menuItems.length).toBe(2);
    expect(menuItems[0].href).toContain("/devices");
    expect(menuItems[1].href).toContain("/templates");

    expect(
      menuItems[0].querySelector("li").querySelectorAll("div")[1].querySelector("span").innerHTML,
    ).toBe("Dispositivos");

    expect(
      menuItems[1].querySelector("li").querySelectorAll("div")[1].querySelector("span").innerHTML,
    ).toBe("Modelos");
  });

  it("7. should be able to render with invalid location, showing no items selected", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/no-item-related"]}>
        <Drawer {...initialProps} />
      </MemoryRouter>,
    );

    const selectedItem = container.querySelector(".Mui-selected");

    expect(selectedItem).toBeNull();
  });
});

import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import ContentContainer from "./ContentContainer";
import RootContainer from "./RootContainer";
import ViewContainer from "./ViewContainer";

describe("Containers unit tests", () => {
  it("should to able simple render the RootContainer ", () => {
    const childElement = <div>test element</div>;

    const { container, getByText } = render(<RootContainer>{childElement}</RootContainer>);

    expect(container).toBeInTheDocument();
    expect(getByText(/test element/i)).toBeInTheDocument();
  });

  it("should to able simple render the ContentContainer ", () => {
    const childElement = <div>test element</div>;

    const { container, getByText } = render(<ContentContainer>{childElement}</ContentContainer>);

    expect(container).toBeInTheDocument();
    expect(getByText(/test element/i)).toBeInTheDocument();
  });

  it("should to able simple render the ViewContainer ", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ViewContainer headerTitle={"title"} setIsMenuOpen={() => null} isMenuOpen />
      </MemoryRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});

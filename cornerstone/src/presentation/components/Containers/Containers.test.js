import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import RootContainer from "./RootContainer";
import ContentContainer from "./ContentContainer";
import ViewContainer from "./ContentContainer";

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
      <ViewContainer headerTitle={"title"} setIsMenuOpen={null} isMenuOpen />,
    );

    expect(container).toBeInTheDocument();
  });
});

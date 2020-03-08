import React from "react";
import { render } from "@testing-library/react";

import { checker } from "./index";

type LastName = {
  readonly last: {
    readonly name: {
      readonly is: string;
    };
  };
};
type FirstName = {
  readonly my: {
    readonly first: {
      readonly name: {
        readonly is: string;
      };
    };
  };
};

type ComponentProps = {
  readonly my: LastName;
  readonly also: FirstName;
};
const Component = (props: ComponentProps) => (
  <>
    <div data-testid="last-name">{props.my.last.name.is}</div>
    <div data-testid="first-name">{props.also.my.first.name.is}</div>
  </>
);

beforeEach(() => {
  // silence console.error()
  console.error = jest.fn();
});

describe("checker HOC", () => {
  it("should throw an error when rerending an object an deep-equal property with a different value", () => {
    const Wrapped = checker(Component, true);
    const myLastName: LastName = { last: { name: { is: "LG" } } };
    const myFirstName: FirstName = {
      my: { first: { name: { is: "Florent" } } }
    };
    const myLastName2 = { ...myLastName };

    const { getByTestId, rerender } = render(
      <Wrapped my={myLastName} also={myFirstName} />
    );
    expect(getByTestId("last-name").textContent).toBe("LG");
    expect(getByTestId("first-name").textContent).toBe("Florent");

    expect(() => {
      rerender(<Wrapped my={myLastName2} also={myFirstName} />);
    }).toThrowError(
      "Rogntudju !!! There are different props but deep equal content on props [my]. This is usually caused by a mistake in your state or selectors implementation."
    );
  });

  it("should be enabled by default in tests", () => {
    const Wrapped = checker(Component);
    const myLastName: LastName = { last: { name: { is: "LG" } } };
    const myFirstName: FirstName = {
      my: { first: { name: { is: "Florent" } } }
    };
    const myLastName2 = { ...myLastName };

    const { getByTestId, rerender } = render(
      <Wrapped my={myLastName} also={myFirstName} />
    );

    expect(() => {
      rerender(<Wrapped my={myLastName2} also={myFirstName} />);
    }).toThrowError(
      "Rogntudju !!! There are different props but deep equal content on props [my]. This is usually caused by a mistake in your state or selectors implementation."
    );
  });

  it("should throw an error reporting all faulty props when rerending an object an deep-equal property with a different value", () => {
    const Wrapped = checker(Component, true);
    const myLastName: LastName = { last: { name: { is: "LG" } } };
    const myFirstName: FirstName = {
      my: { first: { name: { is: "Florent" } } }
    };
    const myLastName2 = { ...myLastName };
    const myFirstName2 = { ...myFirstName };
    const { getByTestId, rerender } = render(
      <Wrapped my={myLastName} also={myFirstName} />
    );

    expect(getByTestId("last-name").textContent).toBe("LG");
    expect(getByTestId("first-name").textContent).toBe("Florent");

    expect(() => {
      rerender(<Wrapped my={myLastName2} also={myFirstName2} />);
    }).toThrowError(
      "Rogntudju !!! There are different props but deep equal content on props [my, also]. This is usually caused by a mistake in your state or selectors implementation."
    );
  });

  it("should not throw an error when rerending an object an deep-equal property with a different value if checking is disabled", () => {
    const Wrapped = checker(Component, false);
    const myLastName: LastName = { last: { name: { is: "LG" } } };
    const myFirstName: FirstName = {
      my: { first: { name: { is: "Florent" } } }
    };
    const myLastName2 = { ...myLastName };
    const { getByTestId, rerender } = render(
      <Wrapped my={myLastName} also={myFirstName} />
    );

    expect(getByTestId("last-name").textContent).toBe("LG");
    expect(getByTestId("first-name").textContent).toBe("Florent");

    expect(() => {
      rerender(<Wrapped my={myLastName2} also={myFirstName} />);
    }).not.toThrow();
    expect(getByTestId("last-name").textContent).toBe("LG");
    expect(getByTestId("first-name").textContent).toBe("Florent");
  });

  it("should not throw an error when rerending an object an deep-equal property with the same value", () => {
    const Wrapped = checker(Component, true);
    const myLastName: LastName = { last: { name: { is: "LG" } } };
    const myFirstName: FirstName = {
      my: { first: { name: { is: "Florent" } } }
    };
    const { getByTestId, rerender } = render(
      <Wrapped my={myLastName} also={myFirstName} />
    );
    expect(getByTestId("last-name").textContent).toBe("LG");
    expect(getByTestId("first-name").textContent).toBe("Florent");

    expect(() => {
      rerender(<Wrapped my={myLastName} also={myFirstName} />);
    }).not.toThrow();
    expect(getByTestId("last-name").textContent).toBe("LG");
    expect(getByTestId("first-name").textContent).toBe("Florent");
  });

  it("should not throw an error when rerending an object with a complete different value", () => {
    const Wrapped = checker(Component, true);
    const myLastName: LastName = { last: { name: { is: "LG" } } };
    const myFirstName: FirstName = {
      my: { first: { name: { is: "Florent" } } }
    };
    const myFirstName2: FirstName = {
      my: { first: { name: { is: "Florent2" } } }
    };
    const { getByTestId, rerender } = render(
      <Wrapped my={myLastName} also={myFirstName} />
    );
    expect(getByTestId("last-name").textContent).toBe("LG");
    expect(getByTestId("first-name").textContent).toBe("Florent");

    expect(() => {
      rerender(<Wrapped my={myLastName} also={myFirstName2} />);
    }).not.toThrow();
    expect(getByTestId("last-name").textContent).toBe("LG");
    expect(getByTestId("first-name").textContent).toBe("Florent2");
  });
});

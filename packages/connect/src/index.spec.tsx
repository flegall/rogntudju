import React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { render, act } from "@testing-library/react";

import { rConnect } from "./index";

function counter(state: { value: number } = { value: 0 }) {
  return { ...state };
}

type ComponentProps = {
  readonly value: number[];
};
const Component = (props: ComponentProps) => (
  <div data-testid="value">{props.value.length}</div>
);

const mapsStateToProps = (state: { value: number }) => {
  const array = [];
  for (let i = 0; i < state.value; i++) {
    array.push(i);
  }
  return { value: array };
};

describe("rConnect()", () => {
  let originalError: typeof console.error | null = null;

  beforeEach(() => {
    originalError = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    if (originalError) {
      console.error = originalError;
    }
  });

  it("should build a specialized connect() implementation that checks for useless rerenders", () => {
    const store = createStore(counter);
    const rconnect = rConnect(connect, true);
    const ComponentWrapped = rconnect(mapsStateToProps)(Component);

    render(
      <Provider store={store}>
        <ComponentWrapped />
      </Provider>
    );

    expect(() => {
      act(() => {
        store.dispatch({ type: "NOTHING" });
      });
    }).toThrow();
  });

  it("should build a specialized connect() implementation that checks by default in dev mode", () => {
    const store = createStore(counter);
    const rconnect = rConnect(connect);
    const ComponentWrapped = rconnect(mapsStateToProps)(Component);

    render(
      <Provider store={store}>
        <ComponentWrapped />
      </Provider>
    );

    expect(() => {
      act(() => {
        store.dispatch({ type: "NOTHING" });
      });
    }).toThrow();
  });

  it("should build a specialized connect() implementation that doesn't checks for useless rerenders when check is disabled", () => {
    const store = createStore(counter);
    const rconnect = rConnect(connect, false);
    const ComponentWrapped = rconnect(mapsStateToProps)(Component);

    render(
      <Provider store={store}>
        <ComponentWrapped />
      </Provider>
    );

    expect(() => {
      act(() => {
        store.dispatch({ type: "NOTHING" });
      });
    }).not.toThrow();
  });
});

import { createStore } from "redux";

describe("rConnect()", () => {
  it("should build a specialized connect() implementation", () => {
    function counter(
      state: number = 0,
      action: { type: "INCREMENT" | "DECREMENT" }
    ) {
      switch (action.type) {
        case "INCREMENT":
          return state + 1;
        case "DECREMENT":
          return state - 1;
        default:
          return state;
      }
    }
    createStore(counter);
  });
});

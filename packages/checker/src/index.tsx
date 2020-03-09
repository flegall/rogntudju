import React, { Component, ComponentType } from "react";
import isEqual from "lodash.isequal";

export const checker = <P,>(
  ComponentToCheck: ComponentType<P>,
  checkEnabled: boolean = process.env.NODE_ENV !== "production"
): ComponentType<P> => {
  if (checkEnabled) {
    class Wrapper extends Component<P> {
      componentDidUpdate(previousProps: P) {
        const props = this.props;
        const errorKeys = [];

        for (const key in props) {
          const previousProp = (previousProps as any)[key] as never;
          const currentProp = (props as any)[key] as never;
          if (
            previousProp !== currentProp &&
            isEqual(previousProp, currentProp)
          ) {
            errorKeys.push(key);
          }
        }
        if (errorKeys.length > 0) {
          throw new Error(
            `Rogntudju !!! There are different props but deep equal content on props [${errorKeys.join(
              ", "
            )}]. This is usually caused by a mistake in your state or selectors implementation.`
          );
        }
      }
      render() {
        return <ComponentToCheck {...this.props} />;
      }
    }
    return Wrapper;
  }
  return ComponentToCheck;
};

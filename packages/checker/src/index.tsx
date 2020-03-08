import React from "react";
import isEqual from "lodash.isequal";

export const checker = <P,>(
  Component: React.ComponentType<P>,
  checkEnabled: boolean = process.env.NODE_ENV !== "production"
) => {
  if (checkEnabled) {
    class Wrapper extends React.Component<P> {
      componentDidUpdate(previousProps) {
        const props = this.props;
        const errorKeys = [];

        for (const key in props) {
          const previousProp = previousProps[key];
          const currentProp = props[key];
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
        return <Component {...this.props} />;
      }
    }
    return Wrapper;
  }
  return Component;
};

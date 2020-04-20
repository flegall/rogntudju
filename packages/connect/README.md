# A specialized redux connect() implementation that checks for useless re-renders

## Usage

```javascript
import { connect } from "react-redux";
import { rConnect } from "@rogntudju/connect";
import { Component } from "yourComponent.jsx";

// Builds your specialized redux connect that checks for useless re-renders
const rconnect = rConnect(connect);

// Wraps your component as usual
const ComponentWrapped = rconnect(mapsStateToProps)(Component);
```

## Enabling or disabling checks

By default, checks are enabled only in dev mode (`process.env.NODE_ENV !== "production"`).

If you wish to override this, there an optional parameter to the `rConnect()` function.

```typescript
const checkEnabled: boolean = isUselessRenderingCheckEnabled();
const rconnect = rConnect(connect, checkEnabled);
```

## Typescript

Intentionally this doesn't use the redux type definitions, as this would make the library tied to your exact redux version.

However, since this library makes a no real use of redux, as it forwards parameters to redux, just replaces the component to be wrapped), I've chosen not to use the redux type definitions.

Therefore rConnect is defined as `rConnect<C>`where C is redux's connect().

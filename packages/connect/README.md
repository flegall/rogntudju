# `@rogntudju/connect`

A specialized redux connect() implementation that detects useless re-renders in dev mode.

## Usage

```javascript
import { connect } from "react-redux";
import { buildConnect } from "@rogntudju/connect";
import { Component } from "yourComponent.jsx";

// Builds your specialized redux connect that checks for useless re-renders
const rconnect = buildConnect(connect);

// Wraps your component as usual
const ComponentWrapped = rconnect(mapsStateToProps)(Component);
```

## Enabling or disabling checks

By default, checks are enabled only in dev mode (`process.env.NODE_ENV !== "production"`).

If you wish to override this, there an optional parameter to the `buildConnect()` function.

```typescript
const checkEnabled: boolean = isUselessRenderingCheckEnabled();
const rconnect = buildConnect(connect, checkEnabled);
```

## Typescript

Intentionally this doesn't use the redux type definitions, as this would make the library tied to your exact redux version.

However, since this library makes a no real use of redux, as it forwards parameters to redux, just replaces the component to be wrapped), I've chosen not to use the redux type definitions.

Therefore buildConnect is defined as `buildConnect<C>`where C is redux's connect().

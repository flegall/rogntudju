# `@rogntudju/checker`

A specialized HOC that detects useless re-renders in dev mode.

## Usage

```javascript
import { checker } from "@rogntudju/checker";
import { Component } from "yourComponent.jsx";

// Builds your specialized component that checks for useless re-renders
const Wrapper = checker(connect);
```

## Enabling or disabling checks

By default, checks are enabled only in dev mode (`process.env.NODE_ENV !== "production"`).

If you wish to override this, there an optional parameter to the `checker()` function.

```typescript
const checkEnabled: boolean = isUselessRenderingCheckEnabled();
const Wrapper = checker(connect, checkEnabled);
```

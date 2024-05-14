[![npm](https://img.shields.io/npm/v/@globus/sdk?style=flat-square&logo=npm&color=000&label)](https://www.npmjs.com/package/@globus/sdk) [![Codecov](https://img.shields.io/codecov/c/gh/globus/globus-sdk-javascript?style=flat-square&logo=codecov)](https://app.codecov.io/gh/globus/globus-sdk-javascript)

The Globus SDK for JavaScript provides first class TypeScript support and makes it easy to call Globus services using idiomatic JavaScript APIs to build Node.js and web applications.

- [@globus/sdk API Documentation](https://globus.github.io/globus-sdk-javascript/)
- [Examples](./examples/README.md)

## Installation

If you are not using Typescript, you can install the SDK with the following command:

```sh
npm install @globus/sdk
```

### Typescript

`@globus/sdk` is written in Typescript and includes type definitions for its internal types, Globus platform types (i.e., API responses) are provided by the `@globus/types` package and must be installed separately.

```sh
npm install @globus/sdk @globus/types
```

## Supported Platforms

### Node.js

We aim to support all Active LTS [Node.js releases](https://nodejs.org/en/about/previous-releases). We intend to support all Maintenance LTS versions until their official end-of-life.

| Version    |                                                                                                                                                                                                                 |     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| Node.js 18 | [![lts/hydrogen](https://img.shields.io/github/actions/workflow/status/globus/globus-sdk-javascript/ci.yml?style=flat-square&label=)](https://github.com/globus/globus-sdk-javascript/actions/workflows/ci.yml) |     |
| Node.js 20 | [![lts/iron](https://img.shields.io/github/actions/workflow/status/globus/globus-sdk-javascript/ci.yml?style=flat-square&label=)](https://github.com/globus/globus-sdk-javascript/actions/workflows/ci.yml)     |     |
| Node.js 22 | [![lts/iron](https://img.shields.io/github/actions/workflow/status/globus/globus-sdk-javascript/ci.yml?style=flat-square&label=)](https://github.com/globus/globus-sdk-javascript/actions/workflows/ci.yml)     |     |

### Browser Support

Officially, the SDK supports widely adopted evergreen browsers: Edge, Chrome, Safari, and Firefox. Our bundled browser distributions target ECMAScript 2015 (ES6), which has [broader browser support](https://caniuse.com/es6) but may not be explicitly evaluated.

| Browser         |                                                                                                                                                                                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Google Chrome   | [![playwright](https://img.shields.io/github/actions/workflow/status/globus/globus-sdk-javascript/playwright.yml?style=flat-square&label=)](https://github.com/globus/globus-sdk-javascript/actions/workflows/playwright.yml) |
| Mozilla Firefox | [![playwright](https://img.shields.io/github/actions/workflow/status/globus/globus-sdk-javascript/playwright.yml?style=flat-square&label=)](https://github.com/globus/globus-sdk-javascript/actions/workflows/playwright.yml) |
| Microsoft Edge  | [![playwright](https://img.shields.io/github/actions/workflow/status/globus/globus-sdk-javascript/playwright.yml?style=flat-square&label=)](https://github.com/globus/globus-sdk-javascript/actions/workflows/playwright.yml) |
| Apple Safari    | [![playwright](https://img.shields.io/github/actions/workflow/status/globus/globus-sdk-javascript/playwright.yml?style=flat-square&label=)](https://github.com/globus/globus-sdk-javascript/actions/workflows/playwright.yml) |

### ESM, CommonJS, and UMD

We distribute our package targeting three different module systems: ESM, CommonJS, and UMD.

#### ESM

The ESM distribution is the `module` export of the package.

```js
import { transfer } from '@globus/sdk';
```

#### CommonJS

The CommonJS distribution is the `main` export of the package. It is intended for use in Node.js applications and environments that support the `require` statement.

```js
const transfer = require('@globus/sdk/cjs').transfer;
// or, import { transfer } from '@globus/sdk/cjs';
```

#### UMD

The UMD distribution is provided for use in web applications and environments that do not support ESM or CommonJS. Referencing the UMD distribution as a `<script>` tag will provide a global variable `globus` that contains all default exports from the package.

```html
<script src="https://unpkg.com/@globus/sdk/umd/globus.production.js"></script>
```

**Help guide the development of the `@globus/sdk` by [reporting issues or suggesting features](https://github.com/globus/globus-sdk-javascript/issues/new/choose)!**

---

[![npm](https://img.shields.io/npm/v/@globus/sdk?style=flat-square&logo=npm&color=000&label)](https://www.npmjs.com/package/@globus/sdk) [![Codecov](https://img.shields.io/codecov/c/gh/globus/globus-sdk-javascript?style=flat-square&logo=codecov)](https://app.codecov.io/gh/globus/globus-sdk-javascript)

The Globus SDK for JavaScript provides first class TypeScript support and makes it easy to call Globus services using idiomatic JavaScript APIs to build Node.js and web applications.

The primary goal of the SDK is to simplify the process of integrating with various [Globus service REST APIs](https://docs.globus.org/api/), using [consistent patterns](https://globus.github.io/globus-sdk-javascript/modules/_globus_sdk.html#key-concepts).

Integrating the optional [`AuthorizationManager`](https://globus.github.io/globus-sdk-javascript/classes/Authorization.AuthorizationManager.html) allows for further abstraction, by managing the [Globus Auth](https://docs.globus.org/api/auth/) authorization process and providing an easy way to manage access tokens used by Globus services.

- [@globus/sdk API Documentation](https://globus.github.io/globus-sdk-javascript/)
- [Examples](https://github.com/globus/globus-sdk-javascript/blob/main/examples/README.md)
- [Upgrading](https://github.com/globus/globus-sdk-javascript/blob/main/UPGRADING.md)
  - [Migrating from `v5` to `v6`](https://github.com/globus/globus-sdk-javascript/blob/main/UPGRADING.md#migrating-from-v5-to-v6)
  - [Migrating from `v4` to `v5`](https://github.com/globus/globus-sdk-javascript/blob/main/UPGRADING.md#migrating-from-v4-to-v5)
  - [Migrating from `v3` to `v4`](https://github.com/globus/globus-sdk-javascript/blob/main/UPGRADING.md#migrating-from-v3-to-v4)

## Installation

You can install the SDK with the following command:

```sh
npm install @globus/sdk
```

## Supported Platforms

### Node.js

We aim to support all Active LTS [Node.js releases](https://nodejs.org/en/about/previous-releases). We intend to support all Maintenance LTS versions until their official end-of-life. Removal of support for a Node.js version will be considered a breaking change and result in a major version bump of the SDK.

| Version    |                                                                                                                                                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Node.js 20 | [![lts/iron](https://img.shields.io/github/actions/workflow/status/globus/globus-sdk-javascript/ci.yml?style=flat-square&label=)](https://github.com/globus/globus-sdk-javascript/actions/workflows/ci.yml) |
| Node.js 22 | [![lts/jod](https://img.shields.io/github/actions/workflow/status/globus/globus-sdk-javascript/ci.yml?style=flat-square&label=)](https://github.com/globus/globus-sdk-javascript/actions/workflows/ci.yml)  |
| Node.js 24 | [![24.x](https://img.shields.io/github/actions/workflow/status/globus/globus-sdk-javascript/ci.yml?style=flat-square&label=)](https://github.com/globus/globus-sdk-javascript/actions/workflows/ci.yml)     |

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
import { GCS } from '@globus/sdk/constants';
```

#### CommonJS

The CommonJS distribution is the `main` export of the package. It is intended for use in Node.js applications and environments that support the `require` statement.

```js
const { transfer } = require('@globus/sdk');
```

You can also explicitly use the `cjs` namespace to import a CommonJS entrypoint.

```js
const transfer = require('@globus/sdk/cjs').transfer;
// or, import { transfer } from '@globus/sdk/cjs';
```

#### UMD

The UMD distribution is provided for use in web applications and environments that do not support ESM or CommonJS. Referencing the UMD distribution as a `<script>` tag will provide a global variable `globus` that contains all default exports from the package.

```html
<script src="https://unpkg.com/@globus/sdk/dist/umd/globus.production.js"></script>
```

Currently, the UMD distribution only provides the default entrypoint for the package.


## Releases
The `@globus/sdk` package follows semantic versioning and is published to [npm](https://www.npmjs.com/package/@globus/sdk).

### Stable Releases
Stable versions are published to npm with the `latest` tag and can be installed with:
```sh
npm install @globus/sdk
```

### Canary Builds
Canary builds are automatically published from the `main` branch on every commit, allowing you to integrate the latest changes before they're included in a stable release. These pre-release versions are tagged with `canary` on npm and can be installed with:
```sh
npm install @globus/sdk@canary
```
Note: Canary builds are intended for testing and edge-development purposes. They may contain breaking changes or unstable features and are not commonly used in production environments.

![@globus/sdk - test](https://github.com/globusonline/globus-sdk-javascript/actions/workflows/test.yml/badge.svg)

The Globus SDK for JavaScript provides first class TypeScript support and makes it easy to call Globus services using idiomatic JavaScript APIs to build Node.js and web applications.


- [@globus/sdk API Documentation](https://globus-jb.s3.amazonaws.com/@globus/sdk/index.html)
- [Globus SDK for JavaScript Developers Hub](http://globus-jb-02.s3-website-us-east-1.amazonaws.com/)


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

We aim to support all Active LTS [Node.js releases](https://nodejs.org/en/about/releases/). We intend to support all Maintenance LTS versions until their official end-of-life.

| Version    |         |       |
|------------|---------|-------|
| Node.js 16 |    ✅    ||
| Node.js 18 |    ✅    ||
| Node.js 20 |    🧪    ||


### Browser Support

Officially, the SDK supports widely adopted evergreen browsers: Edge, Chrome, Safari, and Firefox. Our bundled browser distributions target ECMAScript 2015 (ES6), which has [broader browser support](https://caniuse.com/es6) but may not be explicitly evaluated.

| Browser         | Version |
|-----------------|---------|
| Google Chrome   |         |
| Mozilla Firefox |         |
| Microsoft Edge  |         |
| Apple Safari    |         |

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
# Authorization

## Architecture

The general approach and architecture of our authorization utility is derived from [oidc-client-ts](https://github.com/authts/oidc-client-ts). The main difference is that our implementation is tightly coupled to the [Globus Auth implementation of OAuth and OIDC](https://docs.globus.org/api/auth/developer-guide/). The most notable differences are:

- Globus Auth is the authority for _many_ services (and tokens), so most OIDC client libraries will not work out of the box.
  Additionally, non-standard properties (e.g., ` other_tokens`, `resource_server`) in token responses require custom handling.
- Domain-specific error handling (i.e., "High Assurance")

## Key Concepts

### Authorization Manager (`index.ts`)

The `AuthorizationManager` class is responsible for managing the authorization process for an application.

### Events

The `AuthorizationManager` emits events to notify the application of changes in the authorization state. The application can listen to these events and respond accordingly.

### Storage

Where the `AuthorizationManager` stores tokens and other authorization data. The SDK provides an in-memory storage implementation and `localStorage`. Should a user want to use a different storage mechanism, they can implement the `Storage` interface – this should allow use of our authorization utility in most runtimes (e.g. Node.js, Browser, etc.).

Tokens are enumerated (e.g., `TokenManager.getAll()`, `AuthorizationManager.reset()`, `AuthorizationManager.revoke()`) using the `Storage` API (`length` and `key(index)`), so custom implementations **must** implement both. Items do not need to be exposed as own properties of the object.

### Transport (i.e. `RedirectTransport.ts`)

A "transport" is the actual mechanism the application will use to complete an authorization flow (grant). The supported
transports are the `RedirectTransport`, which will redirect the user's browser to Globus Auth using [PKCE](https://oauth.net/2/pkce/), and the experimental `PopupTransport`.
Both require a browser and a configured `redirect`; see [Native Applications](#native-applications-nodejs-clis-mcp-servers) for other environments.

The abstraction exists to support additional transports in the future, i.e., `PopupTransport,` `ServiceWorkerTransport,` etc.

### Token Manager

An instance of `TokenManager` is used to retrieve tokens from the token store. The token store is an instance of `Storage` (e.g., `localStorage`). An instance of `TokenManager` is made available on the `AuthorizationManager.tokens`.

### Native Applications (Node.js, CLIs, MCP servers)

The browser transports (`redirect`, `popup`) rely on `window` and `sessionStorage`. Applications without a browser context
can use `startAuthorization()` and `completeAuthorization()` instead. They implement the same PKCE flow, but leave
directing the user to Globus Auth, and receiving the `code`, to the application. The PKCE values are returned in
the `AuthorizationRequest` rather than written to storage. A `redirect` is not required in the configuration.

```ts
import { createServer } from 'node:http';
import { authorization } from '@globus/sdk';

const manager = authorization.create({
  client: CLIENT_ID,
  scopes: 'urn:globus:auth:scope:transfer.api.globus.org:all',
  useRefreshTokens: true,
  storage: new FileStorage('~/.my-app/tokens.json'), // Any `Storage` implementation.
});

// Option 1: Loopback redirect.
const redirect = 'http://127.0.0.1:8080/callback';
const request = await manager.startAuthorization({ redirect });
await new Promise<void>((resolve, reject) => {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', redirect);
    if (url.pathname !== '/callback') {
      res.statusCode = 404;
      res.end();
      return;
    }
    try {
      await manager.completeAuthorization(request, url);
      res.end('You can close this window.');
      resolve();
    } catch (e) {
      res.statusCode = 400;
      res.end('Authorization failed.');
      reject(e);
    } finally {
      server.close();
    }
  }).listen(8080, '127.0.0.1');
  openInBrowser(request.url); // e.g., `open`/`xdg-open`/`start`
});

// Option 2: The user copies the code from the Globus Auth "auth code" page (the default `redirect`).
const pasteRequest = await manager.startAuthorization();
console.log(`Log in at: ${pasteRequest.url}`);
await manager.completeAuthorization(pasteRequest, { code: await prompt('Code: ') });

// Get a token that is valid for at least 30 seconds (refreshed if necessary, one refresh at a time per resource server).
const token = await manager.getToken('transfer.api.globus.org', { minValidityMs: 30_000 });

// Log out: revokes access and refresh tokens, and clears storage.
const { failures } = await manager.revoke();
```

Unlike `login()`, `startAuthorization()`/`completeAuthorization()` never reset the instance, so they can also be
used to request additional consents. Call `manager.reset()` first for a "fresh" login.

## Implementation Notes

- Tokens are stored as `${client_id}:${resource_server}` keys in the token store. This allows multiple `AuthorizationManager` instances to be used in the same application without conflict (multiple `client_id`s).
  - The prefix (`${client_id}:`) can be changed with the `storageKeyPrefix` option, e.g., to isolate tokens for different Globus environments in a shared storage. A prefix should not be the start of another instance's prefix in the same storage; prefer `sandbox:${client_id}:` and `production:${client_id}:` over `${client_id}:` and `${client_id}:sandbox:`.
- Refreshes are "single-flight": `refreshToken()` keeps one in-flight request per resource server, and concurrent callers share its result. Service methods (`services/shared.ts`) refresh tokens that will expire within 60 seconds before making a request, and retry once on `401` when no refresh was attempted for the request.
- As of `@globus/sdk@6` the `Storage` interface only supports synchronous access – this may change in a future release.

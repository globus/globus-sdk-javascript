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

A "transport" is the actual mechanism the application will use to complete an authorization flow (grant). At the moment,
the only supported transport is the `RedirectTransport`, which will redirect the user's browser to Globus Auth using [PKCE](https://oauth.net/2/pkce/).

The abstraction exists to support additional transports in the future, i.e., `PopupTransport,` `ServiceWorkerTransport,` etc.

### Token Manager

An instance of `TokenManager` is used to retrieve tokens from the token store. The token store is an instance of `Storage` (e.g., `localStorage`). An instance of `TokenManager` is made available on the `AuthorizationManager.tokens`.

## Implementation Notes

- Tokens are stored in a single, versioned entry (`${client_id}:TokenManager`) in the token store, keyed by `access_token`. This allows multiple `AuthorizationManager` instances to be used in the same application without conflict (multiple `client_id`s), and multiple tokens for the same resource server (with different scopes).
  - Tokens stored in the legacy format (`${client_id}:${resource_server}` keys) are migrated when the `TokenManager` is created, and the legacy items are removed.
  - The entry is read on every access (not cached on the instance), so changes made by other instances, browser tabs, or processes sharing the storage are observed.
  - When multiple tokens match a lookup (e.g., `tokens.transfer`), the most recently stored token is returned. Adding a token replaces any token with the same resource server and scopes.

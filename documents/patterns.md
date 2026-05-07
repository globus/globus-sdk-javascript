## Service Version Support

Some Globus services expose multiple API generations. The SDK surfaces these under a version namespace on the service object (e.g, `transfer.v2`).

```ts
import { transfer } from '@globus/sdk';

await transfer.v2.bookmarks.getAll();
await transfer.v2.bookmarks.get({ bookmark_id: '...' });
await transfer.v2.bookmarks.create({ request: { data: { name, endpoint_id, path } } });
await transfer.v2.bookmarks.update({ bookmark_id: '...', request: { data: { name } } });
await transfer.v2.bookmarks.remove({ bookmark_id: '...' });

// Service-specific imports are also available.
import { bookmarks } from '@globus/sdk/tranfer/v2';
import { getAll } from '@globus/sdk/tranfer/v2/bookmarks';
```

As of `v6.x.x` the methods on the default namespace _may_ contain mixed version usage. The default namespace will likely be removed, or more formally aliased to the "latest" version of a service resource in an upcoming major release (breaking change).

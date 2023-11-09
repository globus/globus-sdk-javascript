import { policies } from "..";
import { createStorage } from "../../../core/storage";

import type { MirroredRequest } from "../../../../__mocks__/handlers";

test("policies - get", async () => {
  createStorage("memory");
  const result = await policies.get("6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9");
  const {
    req: { url, method, headers },
  } = (await result.json()) as unknown as MirroredRequest;

  expect({
    url,
    method,
    headers,
  }).toMatchInlineSnapshot(`
    {
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip,deflate",
        "connection": "close",
        "host": "groups.api.globus.org",
        "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
      },
      "method": "GET",
      "url": "https://groups.api.globus.org/v2/groups/6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9/policies",
    }
  `);
});

import { groups } from "..";
import { createStorage } from "../../../core/storage";

import type { MirroredRequest } from "../../../../__mocks__/handlers";

test("get", async () => {
  createStorage("memory");
  const result = await groups.get("6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9");
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
      "url": "https://groups.api.globus.org/v2/groups/6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9",
    }
  `);
});

test("getMyGroups", async () => {
  createStorage("memory");
  const result = await groups.getMyGroups({
    query: {
      statuses: ["active", "invited", "pending"],
    },
  });
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
      "url": "https://groups.api.globus.org/v2/groups/my_groups?statuses=active%2Cinvited%2Cpending",
    }
  `);
});

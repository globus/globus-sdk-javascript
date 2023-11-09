import { membership } from "..";
import { createStorage } from "../../../../lib/core/storage";

import type { MirroredRequest } from "../../../../__mocks__/handlers";

test("membership - act", async () => {
  createStorage("memory");
  const result = await membership.act("6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9", {
    payload: {
      reject: [
        {
          identity_id: "f13c9c26-223d-41cf-b6d7-971f3d3b5dfa",
        },
      ],
      decline: [
        {
          identity_id: "c237bf3e-ff0b-4d7f-9abc-5355040c49da",
        },
        {
          identity_id: "3d9cbcd8-beed-4f37-85ab-75d725623da8",
        },
      ],
    },
  });
  const {
    req: { url, method, headers, json },
  } = (await result.json()) as unknown as MirroredRequest;

  expect({
    url,
    method,
    headers,
    json,
  }).toMatchInlineSnapshot(`
    {
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip,deflate",
        "connection": "close",
        "content-length": "189",
        "content-type": "application/json",
        "host": "groups.api.globus.org",
        "user-agent": "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
      },
      "json": {
        "decline": [
          {
            "identity_id": "c237bf3e-ff0b-4d7f-9abc-5355040c49da",
          },
          {
            "identity_id": "3d9cbcd8-beed-4f37-85ab-75d725623da8",
          },
        ],
        "reject": [
          {
            "identity_id": "f13c9c26-223d-41cf-b6d7-971f3d3b5dfa",
          },
        ],
      },
      "method": "POST",
      "url": "https://groups.api.globus.org/v2/groups/6521a0c3-ffc9-4432-9cb6-41fa8fe2e4e9/policies",
    }
  `);
});

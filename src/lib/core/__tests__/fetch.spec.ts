import { fetchWithScope } from "../fetch";
import { SCOPES } from "../../services/flows/config";

describe("core - fetch", () => {
  it("SHOULD require a storage configuration", async () => {
    await expect(async () => {
      await fetchWithScope(SCOPES.VIEW_FLOWS, "https://globus.org/foobar");
    }).rejects.toThrowErrorMatchingInlineSnapshot(
      `"You must create a storage system."`
    );
  });

  it("SHOULD NOT require storage configuration when passing an Authorization header", () => {
    expect(async () => {
      await fetchWithScope(SCOPES.VIEW_FLOWS, "https://globus.org/foobar", {
        headers: {
          Authorization: "Bearer some-token",
        },
      });
    }).not.toThrowError();
  });
});

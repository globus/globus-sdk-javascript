import serviceTestSuite from "../../../../__utils__/service-test-suite";
import { flows } from "..";

serviceTestSuite("flows", "flows", (fetch) => {
  test("getAll", async () => {
    await flows.getAll();
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(`https://flows.globus.org/flows`, {
      headers: {},
    });
  });

  test("getAll - with headers", async () => {
    await flows.getAll({
      headers: {
        Authorization: "Bearer this-is-an-example-token",
      },
    });
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(`https://flows.globus.org/flows`, {
      headers: {
        Authorization: "Bearer this-is-an-example-token",
      },
    });
  });

  test("getAll - with headers and fetch overriders", async () => {
    await flows.getAll(
      {
        headers: {
          Authorization: "Bearer this-is-an-example-token",
        },
      },
      {
        fetch: {
          options: {
            headers: {
              "X-Test-Header": "test",
            },
          },
        },
      }
    );
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(`https://flows.globus.org/flows`, {
      headers: {
        Authorization: "Bearer this-is-an-example-token",
        "X-Test-Header": "test",
      },
    });
  });
});

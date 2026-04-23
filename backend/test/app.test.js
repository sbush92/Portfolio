const test = require("node:test");
const assert = require("node:assert/strict");

const createApp = require("../createApp");

async function createTestServer(db) {
  const app = createApp(db);

  return new Promise((resolve) => {
    const server = app.listen(0, "127.0.0.1", () => {
      const address = server.address();

      resolve({
        server,
        baseUrl: `http://127.0.0.1:${address.port}`,
      });
    });
  });
}

test("GET /test returns the sample shirt payload", async () => {
  const db = {
    query: async () => ({ rows: [] }),
  };
  const { server, baseUrl } = await createTestServer(db);

  try {
    const response = await fetch(`${baseUrl}/test`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      tshirt: "white",
      size: "xxl",
    });
  } finally {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }
});

test("POST /test/:id requires a logo", async () => {
  const db = {
    query: async () => ({ rows: [] }),
  };
  const { server, baseUrl } = await createTestServer(db);

  try {
    const response = await fetch(`${baseUrl}/test/42`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const body = await response.json();

    assert.equal(response.status, 418);
    assert.deepEqual(body, {
      message: "We need a logo!",
    });
  } finally {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }
});

test("GET /blog returns rows from the database client", async () => {
  const rows = [{ id: 1, title: "Hello" }];
  const db = {
    query: async (sql) => {
      assert.equal(sql, "SELECT * FROM blog_posts");

      return { rows };
    },
  };
  const { server, baseUrl } = await createTestServer(db);

  try {
    const response = await fetch(`${baseUrl}/blog`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, rows);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }
});
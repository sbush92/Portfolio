const db = require("./db/index");
const createApp = require("./createApp");
const PORT = 8080;

const app = createApp(db);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port http://localhost:${PORT}`),
);

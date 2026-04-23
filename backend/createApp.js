const express = require("express");
const cors = require("cors");

function createApp(db) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/blog", async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM blog_posts");
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/test", (req, res) => {
    res.status(200).send({
      tshirt: "white",
      size: "xxl",
    });
  });

  app.post("/test/:id", (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo) {
      res.status(418).send({ message: "We need a logo!" });
      return;
    }

    res.send({
      tshirt: `shirt with your ${logo} and ID of ${id}`,
    });
  });

  return app;
}

module.exports = createApp;
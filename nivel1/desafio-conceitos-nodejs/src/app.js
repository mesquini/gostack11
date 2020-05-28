const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const obj = {
    id: uuid(),
    title,
    url,
    techs: techs.split(", "),
    likes: 0,
  };

  repositories.push(obj);

  return response.json(obj);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  if (!isUuid(id)) return response.status(400).json({ error: "ID invalid!" });

  const repo = repositories.find((r) => r.id === id);

  if (!repo) return response.status(404).json({ error: "ID not found!" });

  repo.title = title ? title : repo.title;
  repo.url = url ? url : repo.url;
  repo.techs = techs ? techs.split(", ") : repo.techs;

  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  if (!isUuid(id)) return response.status(400).json({ error: "ID invalid!" });

  for (let i = 0; i < repositories.length; i++) {
    if (repositories[i].id === id) repositories.splice(i, 1);
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  if (!isUuid(id)) return response.status(400).json({ error: "ID invalid!" });

  const repo = repositories.find((r) => r.id === id);

  if (!repo) return response.status(400).json({ error: "Id not found" });

  repo.likes += 1;

  return response.json(repo);
});

module.exports = app;

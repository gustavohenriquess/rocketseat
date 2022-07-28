const express = require("express");

const app = express();

app.get("/courses", (request, response) => {
  return response.json(["Node.js", "React", "React Native"]);
});

app.post("/courses", (request, response) => {
  return response.json(["Node.js", "React", "React Native", "Elixir"]);
});

app.put("/courses/:id", (request, response) => {
  return response.json(["NodeJS", "React", "React Native", "Elixir"]);
});

app.patch("/courses/:id", (request, response) => {
  return response.json(["Node.js", "ReactJS", "React Native", "Elixir"]);
});

app.delete("/courses/:id", (request, response) => {
  return response.json(["Node.js", "React", "React Native"]);
});

app.listen(3333);

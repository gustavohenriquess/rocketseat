const express = require("express");

const app = express();
app.use(express.json());

app.get("/courses", (request, response) => {
  const query = request.query;
  console.log(query);

  return response.json(["Node.js", "React", "React Native"]);
});

app.post("/courses", (request, response) => {
  const body = request.body;
  console.log(body);

  return response.json(["Node.js", "React", "React Native", "Elixir"]);
});

app.put("/courses/:id", (request, response) => {
  const params = request.params;
  console.log(params);

  return response.json(["NodeJS", "React", "React Native", "Elixir"]);
});

app.patch("/courses/:id", (request, response) => {
  return response.json(["Node.js", "ReactJS", "React Native", "Elixir"]);
});

app.delete("/courses/:id", (request, response) => {
  return response.json(["Node.js", "React", "React Native"]);
});

app.listen(3333);

const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({
      error: "Customer already exists!",
    });
  }

  const id = uuidV4();

  customers.push({
    id,
    cpf,
    name,
    statement: [],
  });

  response.status(201).send();
});

app.get("/statement", (request, response) => {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Customer not found!" });
  }

  return response.json(customer.statement);
});

app.listen(3333);

const express = require("express");
const {v4: uuidv4} = require("uuid");

const app = express();
app.use(express.json());

// DB fake
const customers = [];

app.post("/account", (request, response) => {
  const {cpf, name } = request.body;
  
  const customersAlreadyExists = customers.some(
    customer => customer.cpf === cpf
  );

  if(customersAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!"});
  }

  customers.push({
    id: uuidv4(),
    cpf,
    name,
    statement: []
  });
  
  return response.status(201).send();
});

app.get("/statement", (request, response) => {
  const { cpf }= request.headers;
  
  const customerFound = customers.find((customer) => customer.cpf === cpf);
  
  if(!customerFound) {
    return response.status(400).json({erro: "customer not found!"});
  };

  return response.json(customerFound.statement);
});

app.listen(3333);
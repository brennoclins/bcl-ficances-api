const express = require("express");
const {v4: uuidv4} = require("uuid");

const app = express();
app.use(express.json());

// DB fake
const customers = [];

// middleware
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf }= request.headers;
  const customerFound = customers.find((customer) => customer.cpf === cpf);
  
  if(!customerFound) {
    return response.status(400).json({erro: "customer not found!"});
  };

  // repassando o CUSTOMER do meu meddleware para as rotas que chamarem ele
  request.customer = customerFound;

  return next();
};

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if(operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
};

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

//app.use(verifyIfExistsAccountCPF);

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    createdAt: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);
  if(balance < amount) {
    return response.status(400).json({error: "Insufficient funds!"});
  }

  const statementOperation = {
    amount,
    createdAt: new Date(),
    type: "debit"
  }

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.listen(3333);
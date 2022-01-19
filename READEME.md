# Brenno - BCL-ST

## FinAPI - Financeira

API para aplicações financeiras

### Requisitos

-[x] Criar uma conta
-[x] Buscar o extrato bancário do cliente
-[] Realizar um depósito
-[] Realizar um saque
-[] Buscar o extrato bancário do cliente por data
-[] Atualizar dados da conta do cliente
-[] Deletar uma conta

### Regras de negócio

-[x] Não deve cadastrar uma conta com CPF já existente
-[x] Não deve fazer depósito em uma conta não existente
-[] Não deve buscar extrato em uma conta não existente
-[] Não deve fazer saques em uma conta que não existe
-[] Não deve excluir uma conta não existente
-[] Não deve fazer saques quando o saldo for insuficiente

### Instalação

```
git clone https://github.com/brennoclins/bcl-finances-api

cd bcl-finances-api
yarn install
yarn dev
```
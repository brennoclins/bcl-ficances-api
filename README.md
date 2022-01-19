# Brenno - BCL-ST

## FinAPI - Financeira

API para aplicações financeiras

### Requisitos

-[x] Criar uma conta
-[x] Buscar o extrato bancário do cliente
-[x] Realizar um depósito
-[x] Realizar um saque
-[x] Buscar o extrato bancário do cliente por data
-[x] Atualizar dados da conta do cliente
-[x] Obter os dados da conta
-[x] Deletar uma conta

### Regras de negócio

-[x] Não deve cadastrar uma conta com CPF já existente
-[x] Não deve fazer depósito em uma conta não existente
-[x] Não deve buscar extrato em uma conta não existente
-[x] Não deve fazer saques em uma conta que não existe
-[x] Não deve fazer saques quando o saldo for insuficiente
-[x] Não deve excluir uma conta não existente

### Instalação

```
git clone https://github.com/brennoclins/bcl-finances-api

cd bcl-finances-api
yarn install
yarn dev
```
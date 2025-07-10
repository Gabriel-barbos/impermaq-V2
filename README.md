# 🏭 Impermaq Máquinas – Catálogo Virtual de Máquinas Industriais

[🔗 Acesse o site oficial](https://www.impermaq.com.br)

Website institucional e responsivo com design moderno, desenvolvido para apresentar o catálogo de máquinas industriais da empresa **Impermaq** de forma prática, visual e eficiente.

## 🧩 Funcionalidades

- 📦 **Painel administrativo** com autenticação para criação, edição e remoção de produtos.
- 💬 **Solicitação de orçamento personalizada** com base nas máquinas escolhidas pelo cliente.
- 🖥️ **Design responsivo e moderno**, adaptado para todos os dispositivos.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React, Tailwind CSS, CSS, JavaScript
- **Backend**: Node.js + Express
- **Banco de Dados**: MongoDB

## 🧑‍💻 Como Rodar Localmente

### Pré-requisitos

- Node.js instalado (v18+ recomendado)
- MongoDB (local ou via MongoDB Atlas)

### 🔧 Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/Gabriel-barbos/impermaq-V2.git
   cd impermaq-V2/server
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` com suas variáveis:
   ```env
   MONGO_URI=sua_string_de_conexao
   PORT=5000
   JWT_SECRET=sua_chave_secreta
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

### 💻 Frontend

1. Acesse a pasta:
   ```bash
   cd ../client
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o arquivo `.env` com a URL da API:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Inicie o projeto:
   ```bash
   npm run dev
   ```

O site estará disponível em `http://localhost:5173`.

## 🤝 Contribuição

Contribuições são bem-vindas! Caso queira sugerir melhorias ou relatar bugs, abra uma issue ou envie um pull request.

## 📄 Licença

Este projeto está sob a licença **MIT**.

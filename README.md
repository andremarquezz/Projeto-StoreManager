<img src="https://img.shields.io/github/issues/andremarquezz/Projeto-StoreManager"/> <img src="https://img.shields.io/github/forks/andremarquezz/Projeto-StoreManager"/> <img src="https://img.shields.io/github/stars/andremarquezz/Projeto-StoreManager"/> <img src="https://img.shields.io/github/license/andremarquezz/Projeto-StoreManager"/>

<h1 align="center">Projeto Store Manager</h1>
<p align="center">Um sistema de gerenciamento de vendas no formato dropshipping em que é possível criar, visualizar, atualizar e deletar, produtos e vendas.!</p>

# Sumário

</br>

• [Sobre o Projeto](#-sobre-o-projeto)

• [Tecnologias e Bibliotecas](#-tecnologias-e-bibliotecas-utilizadas-no-desenvolvimento-do-projeto)

• [Como executar o projeto](#-como-executar-o-projeto)

• [Dicas de scripts prontos](#-dicas-de-scripts-prontos)

### 📃 Sobre o Projeto

---

<p>Esta API RESTful é um sistema de gerenciamento de vendas no formato dropshipping em que é possível criar, visualizar, atualizar e deletar, produtos e vendas, a API foi desenvolvida dentro de containers docker utilizando um banco de dados MySQL</p>

- Você pode consultar informaçoes sobre as rotas **[aqui!](https://github.com/andremarquezz/Projeto-StoreManager/wiki/Endpoints)**
 
- Você pode consultar informaçoes sobre os testes **[aqui!](https://github.com/andremarquezz/Projeto-StoreManager/wiki/Testes)**

  

---

### 🛠 Tecnologias e Bibliotecas utilizadas no desenvolvimento do projeto

- **[Node.js](https://nodejs.org/en/)**

- **[MySQL](https://www.mysql.com/products/workbench/)**

- **[Mysql2](https://www.npmjs.com/package/mysql2)**

- **[Express](http://expressjs.com/pt-br/)**

- **[Nodemon](https://www.npmjs.com/package/nodemon)**

  > Veja o arquivo [package.json](https://github.com/andremarquezz/Projeto-StoreManager/blob/main/package.json)


---

### 🚀 Como executar o projeto

_Pré-requisitos_

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com),
[Node.js](https://nodejs.org/en/).

É recomendado utilizar algum cliente HTTP, como [Postman](https://www.postman.com/) ou o [Insomnia](https://insomnia.rest/download).

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

---

_1- Clonar o repositorio_

```jsx
https://github.com/andremarquezz/Projeto-StoreManager
```

---


<details>
  <summary><strong>:whale: Rodando no Docker</strong></summary><br />
  
  ## Com Docker
 
 
_Rode o serviço `node` com o comando_

```jsx
docker-compose up -d
```

- Esse serviço irá inicializar dois containers chamados `store_manager e store_manager_db`, respectivamente.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.

_Via CLI use o comando_
```jsx
docker exec -it store_manager bash
```
- Ele te dará acesso ao terminal interativo do container store_manager(node) criado pelo compose, que está rodando em segundo plano.

_Instale as dependências `dentro do container` com_

```jsx
npm install
```

⚠️Atenção: Caso opte por utilizar o Docker, TODOS os scripts disponíveis no package.json devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando docker exec.
  
  </details>
  
---
  
<details>
  <summary><strong>:computer: Rodando Localmente</strong></summary><br />
 
 _Instale as dependências com o comando_
 
 ```jsx
npm install
```
- Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `node` instalado em seu computador.
  - Recomenda-se a versão `^16`
  
 ⚠️Atenção: Não esqueça de renomear/configurar o arquivo .env.example
</details>

---


### 💡 Dicas de scripts prontos
<details>
  <summary><strong>Scripts</strong></summary><br />

  - Criar o banco de dados e gerar as tabelas:
  ```sh
    npm run migration
  ```

  - Limpar e popular o banco de dados:
  ```sh
    npm run seed
  ```

  - Iniciar o servidor Node:
  ```sh
    npm start
  ```

  - Iniciar o servidor Node com nodemon:
  ```sh
    npm run dev
  ```

  - Executar os testes de unidade:
  ```sh
    npm run test:mocha
  ```

  <br />
</details>

---

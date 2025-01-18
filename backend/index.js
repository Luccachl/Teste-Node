// Importa os pacotes necessários
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/database");

// Configura o dotenv para usar variáveis de ambiente
dotenv.config();

// Cria a aplicação Express
const app = express();

// Middlewares
app.use(express.json()); // Para interpretar JSON no corpo das requisições
app.use(cors()); // Habilita CORS para requisições de outros domínios

// Rotas
const enqueteRoutes = require("./routes/routes"); // Rotas de enquetes
app.use("/api/enquetes", enqueteRoutes);

// Configura a porta do servidor
const PORT = process.env.PORT || 3000;

// Sincroniza o banco de dados e inicia o servidor
sequelize
  .sync({ force: false }) // Altere force para true apenas se quiser recriar as tabelas
  .then(() => {
    console.log("Banco de dados sincronizado.");
    app.listen(PORT, () =>
      console.log(`Servidor rodando em http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Erro ao sincronizar banco de dados:", err);
  });

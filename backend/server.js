const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./config/database");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Rotas
const enqueteRoutes = require("./routes/enqueteRoutes");
app.use("/api/enquetes", enqueteRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
  console.log("Banco de dados sincronizado.");
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});

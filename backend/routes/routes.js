const express = require("express");
const Enquete = require("../models/enquete");
const Opt = require("../models/opt");
const router = express.Router();

// Criar enquete
router.post("/", async (req, res) => {
  const { titulo, data_inicio, data_fim, opt } = req.body;
  try {
    const enquete = await Enquete.create({ titulo, data_inicio, data_fim });
    const opcoesCriadas = await Promise.all(
      opt.map((descricao) =>
        Opt.create({ descricao, EnqueteId: enquete.id })
      )
    );
    res.status(201).json({ enquete, opt: opcoesCriadas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar enquetes (alterada para "/")
router.get("/", async (req, res) => { // Alterado de "/enquetes" para "/"
  try {
    const enquetes = await Enquete.findAll({ include: Opt });
    res.json(enquetes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Votar
router.post("/votar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const opt = await Opt.findByPk(id);
    if (!opt) return res.status(404).json({ error: "Opção não encontrada" });
    opt.votos += 1;
    await opt.save();
    res.json(opt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

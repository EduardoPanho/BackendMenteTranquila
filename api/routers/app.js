const express = require('express');
const router = express.Router();

const bd_cards_psicos = require('./caminho_para_pasta/bd_cards_psicos');

router.get('/', (req, res) => {
    res.json({ psicos: bd_cards_psicos });
});

router.post('/', (req, res) => {
    try {
        const { tipo, dados } = req.body;

        if (tipo !== "cards") {
            return res.status(400).json({ resposta: "tipo inválido" });
        }

        if (!dados || typeof dados !== 'object') {
            return res.status(400).json({ resposta: "dados inválidos" });
        }

        bd_cards_psicos.push(dados);
        res.status(201).json({ resposta: "adicionado com sucesso" });
    } catch (e) {
        console.error("Erro no POST:", e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

router.put('/', (req, res) => {
    try {
        const { tipo, nome, biografia, img, email, telefone, status } = req.body;

        if (tipo !== "cards") {
            return res.status(400).json({ resposta: "tipo inválido" });
        }

        const index = bd_cards_psicos.findIndex(p => p.nome === nome);

        if (index === -1) {
            return res.status(404).json({ resposta: "item não encontrado" });
        }

        bd_cards_psicos[index] = { nome, biografia, img, email, telefone, status };
        res.json({ resposta: "atualizado com sucesso" });
    } catch (e) {
        console.error("Erro no PUT:", e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

router.delete('/', (req, res) => {
    try {
        const { tipo, nome } = req.body;

        if (tipo !== "cards") {
            return res.status(400).json({ resposta: "tipo inválido" });
        }

        const index = bd_cards_psicos.findIndex(p => p.nome === nome);

        if (index === -1) {
            return res.status(404).json({ resposta: "item não encontrado" });
        }

        bd_cards_psicos.splice(index, 1);
        res.json({ resposta: "deletado com sucesso" });
    } catch (e) {
        console.error("Erro no DELETE:", e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

module.exports = router;

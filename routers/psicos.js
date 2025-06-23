const express = require('express');
const router = express.Router();
const bd_cards_psicos = require('../caminho_para_pasta/bd_cards_psicos');

router.get('/', (req, res) => {
    res.json(bd_cards_psicos);
});

router.post('/', (req, res) => {
    try {
        const { dados } = req.body;
        bd_cards_psicos.push(dados);
        res.json({ resposta: "Psicologo adicionado com sucesso" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

router.put('/', (req, res) => {
    try {
        const { nome, biografia, img, email, telefone, status } = req.body;
        const index = bd_cards_psicos.findIndex(p => p.nome === nome);

        if (index !== -1) {
            bd_cards_psicos[index] = { nome, biografia, img, email, telefone, status };
            res.json({ resposta: "Psicologo atualizado com sucesso" });
        } else {
            res.status(404).json({ resposta: "Psicologo não encontrado" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

router.delete('/', (req, res) => {
    try {
        const { nome } = req.body;
        const index = bd_cards_psicos.findIndex(p => p.nome === nome);

        if (index === -1) {
            return res.status(404).json({ resposta: "Psicologo não encontrado" });
        }

        bd_cards_psicos.splice(index, 1);
        res.json({ resposta: "Pisicologo deletado com sucesso" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

module.exports = router;

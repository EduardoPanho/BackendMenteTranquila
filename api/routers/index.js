const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = {

}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('psicos').get();
    const psicos = snapshot.docs.map(doc => ({
      ...doc.data(),
      uid: doc.id
    }));

    return res.json(psicos);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar psicologos" });
  }
});

app.post('/', async (req, res) => {
  try {
    const docRef = await db.collection('psicos').add(req.body);
    res.status(201).send({ id: docRef.id });
  } catch (err) {
    res.status(500).send(err.message)
  }
});

app.put('/:id', async (req, res) => {
  try {
    await db.collection('psicos').doc(req.params.id).update(req.body);
    res.send({ message: 'Atualizado com secesso' })
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/:id', async (req, res) => {
  try {
    await db.collection('psicos').doc(req.params.id).delete();
    res.send({ message: 'Deletado com sucesso' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


module.exports = app;
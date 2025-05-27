const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3023;

app.use(express.json());
app.use(express.static('public'));

const FILE = 'quiz.json';

app.get('/perguntas', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

app.post('/adicionar-pergunta', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  data.push(req.body);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  res.sendStatus(200);
});

app.put('/editar-pergunta/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  const id = parseInt(req.params.id);
  data[id] = req.body;
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  res.sendStatus(200);
});

app.delete('/excluir-pergunta/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  const id = parseInt(req.params.id);
  data.splice(id, 1);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

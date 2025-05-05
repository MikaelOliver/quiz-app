const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const QUIZ_FILE = path.join(__dirname, 'quiz.json');

app.use(express.json());
app.use(express.static('public'));

// Endpoint para adicionar pergunta
app.post('/adicionar-pergunta', (req, res) => {
  const novaPergunta = req.body;

  fs.readFile(QUIZ_FILE, 'utf8', (err, data) => {
    let perguntas = [];

    if (!err && data) {
      try {
        perguntas = JSON.parse(data);
      } catch (e) {
        console.error('Erro ao fazer parse do JSON');
      }
    }

    perguntas.push(novaPergunta);

    fs.writeFile(QUIZ_FILE, JSON.stringify(perguntas, null, 2), err => {
      if (err) {
        console.error('Erro ao salvar:', err);
        return res.status(500).send('Erro ao salvar');
      }

      res.send('Pergunta salva com sucesso!');
    });
  });
});

// Endpoint para obter perguntas
app.get('/perguntas', (req, res) => {
  fs.readFile(QUIZ_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erro ao ler arquivo');
    res.send(data);
  });
});

app.listen(3010, () => console.log('Servidor rodando em http://localhost:3010'));

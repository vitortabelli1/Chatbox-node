const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');  // Para ler o arquivo JSON

const app =express(); 

// Definindo o diretório de views e template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Usando body-parser para processar formulários
app.use(bodyParser.urlencoded({ extended: false }));

// Rota para a página de login
app.get('/', (req, res) => {
  res.render('login');
});

// Rota para processar o login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Lendo o arquivo JSON para obter os dados dos usuários
  fs.readFile('users.json', (err, data) => {
    if (err) {
      return res.status(500).send('Erro ao ler os dados de usuários.');
    }

    const users = JSON.parse(data).users;
    
    // Verificando se o usuário e a senha estão corretos
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      // Login bem-sucedido, redireciona para o painel de inventário (dashboard)
      res.redirect('/dashboard');
    } else {
      // Redireciona para o login em caso de falha
      res.redirect('/');
    }
  });
});

// Rota para o painel de inventário (dashboard)
app.get('/dashboard', (req, res) => {
  res.render('dashboard');  // Renderiza o arquivo dashboard.ejs
});

// Inicializando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

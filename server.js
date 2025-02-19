const express = require('express');
const path = require('path');

const app = express();

// Definindo o diretório de views e template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rota para o painel de inventário (dashboard)
app.get('/', (req, res) => {
  res.render('dashboard');  // Agora a página inicial já carrega o dashboard diretamente
});

// Inicializando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

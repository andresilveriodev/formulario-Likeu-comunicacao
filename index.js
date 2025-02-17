const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const upload = multer(); 
const app = express();
const port = 3001;
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const sendEmail = require('./sendEmail');

// Permitir CORS para todas as origens
app.use(cors());
app.use(express.json()); // Middleware para processar dados JSON

// Função que envia um e-mail
async function enviarEmail(formData, res) {
  try {
    await sendEmail(formData); // Chama a função sendEmail para enviar o e-mail
    res.status(200).send("E-mail enviado com sucesso");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).send("Erro ao enviar e-mail");
  }
}

app.post('/send-email', upload.any(), (req, res) => {
  // Os campos do formulário estarão disponíveis em req.body (como strings)
  const formData = req.body;
  enviarEmail(formData, res);
});


// Rota para enviar o e-mail
app.post('/send-email', (req, res) => {
  const formData = req.body;
  enviarEmail(formData, res);
});

// Rota para enviar o e-mail utilizando Multer para tratar multipart/form-data
app.post('/send-email', upload.any(), (req, res) => {
  // Os campos de texto estarão em req.body e os arquivos em req.files
  // Cria um campo "anexar-arquivos" contendo os nomes dos arquivos
  const filesInfo = req.files.map(file => file.originalname).join(', ');
  const formData = {
    ...req.body,
    'anexar-arquivos': filesInfo
  };
  
  enviarEmail(formData, res);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`emailformProject is listening at http://localhost:${port}`);
});
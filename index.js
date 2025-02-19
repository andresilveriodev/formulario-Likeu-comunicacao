const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const app = express();
const port = 3001;
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const sendEmail = require('./sendEmail');

// Configuração do Multer para armazenamento em memória com limites aumentados
const upload = multer({
  storage: multer.memoryStorage(), // Armazena arquivos na memória
  limits: {
    fileSize: 50 * 1024 * 1024, // Limite de 50MB por arquivo
    files: 10 // Número máximo de arquivos
  }
});

// Permitir CORS para todas as origens
app.use(cors());
app.use(express.json()); // Middleware para processar dados JSON

// Função que envia um e-mail
async function enviarEmail(formData, files, res) {
  try {
    await sendEmail(formData, files); // Chama a função sendEmail para enviar o e-mail
    res.status(200).send("E-mail enviado com sucesso");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).send("Erro ao enviar e-mail");
  }
}

// Rota para enviar o e-mail utilizando Multer para tratar multipart/form-data
app.post('/send-email', upload.any(), (req, res) => {
  // Extrai os nomes dos arquivos para um campo (opcional)
  const filesInfo = req.files.map(file => file.originalname).join(', ');
  // Cria o objeto formData unindo os campos do body e os nomes dos arquivos
  const formData = {
    ...req.body,
    'anexar-arquivos': filesInfo // Esse campo serve apenas para exibir os nomes no corpo do e-mail
  };
  
  // Chama a função enviarEmail passando também os arquivos
  enviarEmail(formData, req.files, res);
});

app.listen(port, () => {
  console.log(`emailformProject is listening at http://localhost:${port}`);
});

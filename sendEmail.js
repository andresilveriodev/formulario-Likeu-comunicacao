// Importa o Nodemailer e carrega as variáveis de ambiente do .env
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuração do transportador do Nodemailer utilizando OAuth2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD, // Remova se não for necessário para OAuth2
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  },
  logger: true,
  debug: true
});

// Função auxiliar para converter um campo em array, se necessário.
// Se o campo já for um array, retorna-o; se for uma string JSON, faz o parse;
// caso contrário, retorna um array com o próprio valor.
function parseArrayField(field) {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  try {
    return JSON.parse(field);
  } catch (e) {
    return [field];
  }
}

// Função para enviar o e-mail
// - formData: objeto com os dados do formulário
// - files: array com os arquivos enviados (obtidos via Multer)
async function sendEmail(formData, files = []) {
  // Cria o array de anexos para o Nodemailer a partir dos arquivos enviados
  const attachments = files.map(file => ({
    filename: file.originalname,
    content: file.buffer
  }));

  

  // Configuração padrão do e-mail
  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    // to: 'iluminismos@gmail.com', // Adicione outros destinatários se necessário
    to: 'iluminismos@gmail.com, likeucomunicacao@gmail.com, atendimento@likeucomunicacao.com.br ', // Adicione outros destinatários se necessário
    subject: 'Formulario Briefing Likeu',
    html: '<!-- Conteúdo HTML padrão -->',
    attachments
  };

  // Verifica o tipo de formulário e gera o HTML adequado
  if (formData.tipoFormulario === 'BriefingComunicacao360') {
    // Monta o HTML para Briefing Comunicação 360
    mailOptions.html = `
      <h1 style="color: #e91531;">Dados do Formulário Briefing Comunicação 360</h1>
      <h3 style="color: #e91531;"><strong>Empresa cliente:</strong></h3>
      <p>${formData.empresa || 'Não informado'}</p>
      <h3 style="color: #e91531;"><strong>Solicitante:</strong></h3>
      <p>${formData.solicitante || 'Não informado'}</p>
      <h3 style="color: #e91531;"><strong>Data:</strong></h3>
      <p>${formData.data || 'Não informado'}</p>
      <h3 style="color: #e91531;"><strong>1. O que deseja comunicar?</strong></h3>
      <p>${formData['material-a-ser-produzido'] || 'Não informado'}</p>
      <h3 style="color: #e91531;"><strong>2. Qual é o objetivo desta produção?</strong></h3>
      <p>${formData['objetivo_desta_producao'] || 'Não informado'}</p>
      <h3 style="color: #e91531;"><strong>3. Qual é o Público-Alvo da ação:</strong></h3>
      <p>${formData['Publico-Alvo'] || 'Não informado'}</p>
      <h3 style="color: #e91531;"><strong>4. Qual é a mensagem fundamental que deseja comunicar? Como ela ressoa com os valores e necessidades do público-alvo?</strong></h3>
      <p>${formData['mensagem-fundamental'] || 'Não informado'}</p>
      <h3 style="color: #e91531;"><strong>5. Existem plataformas/mídias específicas onde deseja realizar a campanha? Se sim, liste quais:</strong></h3>
      <p>${formData.canais || 'Não informado'}</p>
      <h3 style="color: #e91531;"><strong>6. Qual é a data limite para que esta demanda esteja finalizada? Seja específico nos prazos de cada etapa do trabalho que está solicitando:</strong></h3>
      <p>${formData['cronograma-detalhado'] || 'Não informado'}</p>
      <h3 style="color: #e91531;"><strong>7. Em caso de produções / criações com formatos já pré-estabelecidos, nos explique todas as especificações técnicas dos materiais a serem desenvolvidos:</strong></h3>
      <p>${formData['formatos_e_especificacoes'] || 'Não informado'}</p>
      <h3 style="color: #e91531;"><strong>8. Inclua qualquer informação adicional que possa impactar a execução do projeto, como limitações legais, alterações climáticas, sazonalidades de mercado, prazos inegociáveis, particularidades culturais e qualquer outro potencial obstáculo ao projeto pretendido:</strong></h3>
      <p>${formData['informacao-adicional'] || 'Não informado'}</p>
      <h3 style="color: #e91531;"><strong>9. Documentos anexados:</strong></h3>
      <p>${formData['anexar-arquivos'] || 'Não informado'}</p>
      <h3 style="color: #e91531;"><strong>10. Explique sobre o material que está subindo:</strong></h3>
      <p>${formData.material || 'Não informado'}</p>
      <br/><br/>
      <p>likeucomunicacao.com.br</p>
      <p>© Copyright, Likeu Comunicação</p>
    `;
  } else if (formData.tipoFormulario === 'BriefingConteudosOnline') {
    // Para o Briefing Conteúdos Online, converte os campos que devem ser arrays
    const platforms = parseArrayField(formData.platforms);
    const interviewees = parseArrayField(formData.interviewees);

    // Geração do HTML para as plataformas e objetivos
    const plataformasHtml = platforms && platforms.length > 0
      ? `<h3 style="color: #13435C;"><strong>11. Plataformas e objetivos específicos:</strong></h3>
           ${platforms.map(platform => `
             <p><strong>Plataforma:</strong> ${platform.plataforma || 'Não informado'}</p>
             <p><strong>Objetivo:</strong> ${platform.objetivo || 'Não informado'}</p>
             <br/>
           `).join('')}`
      : `<h3 style="color: #13435C;"><strong>11. Plataformas e objetivos:</strong></h3><p>Nenhuma plataforma especificada</p>`;

    // Geração do HTML para as pessoas a serem entrevistadas
    const pessoasEntrevistadasHtml = interviewees && interviewees.length > 0
      ? `<h3 style="color: #13435C;"><strong>12. Pessoas a serem entrevistadas:</strong></h3>
           ${interviewees.map(interviewee => `
             <p><strong>Nome:</strong> ${interviewee.name || 'Não informado'}</p>
             <p><strong>Cargo/Função:</strong> ${interviewee.role || 'Não informado'}</p>
             <p><strong>Contato:</strong> ${interviewee.contact || 'Não informado'}</p>
             <br/>
           `).join('')}`
      : `<h3 style="color: #13435C;"><strong>12. Pessoas a serem entrevistadas:</strong></h3><p>Nenhuma pessoa especificada</p>`;

    // Monta o HTML completo para o Briefing Conteúdos Online
    mailOptions.html = `
      <h1 style="color: #13435C;">Dados do Formulário Briefing Conteúdos Online</h1>
      <h3 style="color: #13435C;"><strong>1. Empresa cliente:</strong></h3>
      <p>${formData.profissional || 'Não informado'}</p>
      <h3 style="color: #13435C;"><strong>2. Solicitante:</strong></h3>
      <p>${formData.solicitante || 'Não informado'}</p>
      <h3 style="color: #13435C;"><strong>3. Departamento:</strong></h3>
      <p>${formData.departamento || 'Não informado'}</p>
      <h3 style="color: #13435C;"><strong>4. Data da solicitação:</strong></h3>
      <p>${formData['Data da solicitação'] || 'Não informado'}</p>
      <h3 style="color: #13435C;"><strong>5. Nome do pedido:</strong></h3>
      <p>${formData.retranca || 'Não informado'}</p>
      <h3 style="color: #13435C;"><strong>6. Data e horário do evento:</strong></h3>
      <p>${formData['data e horário do evento'] || 'Não informado'}</p>
      <h3 style="color: #13435C;"><strong>7. Local completo:</strong></h3>
      <p>${formData.local || 'Não informado'}</p>
      <h3 style="color: #13435C;"><strong>8. Assunto da pauta:</strong></h3>
      <p>${formData['assunto da pauta'] || 'Não informado'}</p>
      <h3 style="color: #13435C;"><strong>9. Objetivo do conteúdo:</strong></h3>
      <p>${formData['objetivo do conteúdo'] || 'Não informado'}</p>
      <h3 style="color: #13435C;"><strong>10. Detalhes da produção:</strong></h3>
      <p>${formData.detalhista || 'Não informado'}</p>
      <h3 style="color: #13435C;"><strong>11. Restrições:</strong></h3>
      <p>${formData.restricoes || 'Não informado'}</p>
      <h3 style="color: #13435C;"><strong>12. Responsável:</strong></h3>
      <p>${formData.profissional_responsavel || 'Não informado'}</p>
      <h3 style="color: #13435C;"><strong>13. Quantidade de conteúdos:</strong></h3>
      <p>${formData.quantidade || 'Não informado'}</p>
      <h3 style="color: #13435C;"><strong>14. Link da nuvem:</strong></h3>
      <p>${formData['link da nuvem'] || 'Não informado'}</p>
      <h3 style="color: #13435C;"><strong>15. Informações para cards:</strong></h3>
      <p>${formData['informacoes cards'] || 'Não informado'}</p>
      ${plataformasHtml}
      ${pessoasEntrevistadasHtml}
      <h3 style="color: #13435C;"><strong>16. Informações adicionais:</strong></h3>
      <p>${formData['departamentos envolvidos'] || 'Não informado'}</p>
      <br/><br/>
      <p>likeucomunicacao.com.br</p>
      <p>© Copyright, Likeu Comunicação</p>
    `;
  }

  // Tenta enviar o e-mail utilizando o transportador do Nodemailer
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado: ' + info.response);
  } catch (error) {
    console.log('Erro ao enviar e-mail: ' + error);
  }
}

// Exporta a função sendEmail para uso em outros módulos
module.exports = sendEmail;

const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuração do transportador Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD, // Caso necessário para OAuth2, senão pode ser removido
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

async function sendEmail(formData) {
    // Configuração do e-mail
    let mailOptions = {
        from: process.env.MAIL_USERNAME, // Seu endereço de e-mail configurado nas variáveis de ambiente
        to: 'iluminismos@gmail.com',
        subject: 'Briefing para demandas de Comunicação e Marketing', // Assunto do e-mail
        html: `
            <h2>Dados do Formulário</h2>
            <p><strong>Departamento:</strong> ${formData.departamento}</p>
            <p><strong>Solicitante:</strong> ${formData.solicitante}</p>
            <p><strong>Data:</strong> ${formData.data}</p>
            <p><strong>Material a ser Produzido:</strong> ${formData['material a ser produzido']}</p>
            <p><strong>Objetivo desta Produção:</strong> ${formData['objetivo desta produção']}</p>
            <p><strong>Público-Alvo:</strong> ${formData['Público-Alvo']}</p>
            <p><strong>Canais por meio dos quais as ações serão divulgadas:</strong> ${formData['mensagem fundamental']}</p>
            <p><strong>Mensagem Fundamental:</strong> ${formData['mensagem fundamental']}</p>
            <p><strong>Cronograma Detalhado:</strong> ${formData['cronograma detalhado']}</p>
            <p><strong>Formatos e Especificações:</strong> ${formData['formatos e as especificações']}</p>
            <p><strong>Informação Adicional:</strong> ${formData['informação adicional']}</p>
        `
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado: ' + info.response);
    } catch (error) {
        console.log('Erro ao enviar e-mail: ' + error);
    }
}

module.exports = sendEmail;

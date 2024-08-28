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

async function sendEmail(formData, formType) {
    let htmlContent = '';

    if (formType === 'BriefingMarketing') {
        htmlContent = `
            <h2>Dados do Formulário Briefing Marketing</h2>
            <p><strong>Departamento:</strong> ${formData.departamento}</p>
            <p><strong>Solicitante:</strong> ${formData.solicitante}</p>
            <p><strong>Data:</strong> ${formData.data}</p>
            <p><strong>Material a ser Produzido:</strong> ${formData['material a ser produzido']}</p>
            <p><strong>Objetivo desta Produção:</strong> ${formData['objetivo desta produção']}</p>
            <p><strong>Público-Alvo:</strong> ${formData['Público-Alvo']}</p>
            <p><strong>mensagem fundamental que deseja comunicar:</strong> ${formData['mensagem fundamental']}</p>
            <p><strong>Liste todos os canais por meio dos quais as ações serão divulgadas:</strong> ${formData['canais']}</p>
            <p><strong>Cronograma Detalhado:</strong> ${formData['cronograma detalhado']}</p>
            <p><strong>Formatos e Especificações:</strong> ${formData['formatos e as especificações']}</p>
            <p><strong>Informação Adicional:</strong> ${formData['informação adicional']}</p>
        `;
    } else if (formType === 'BriefingRedesSociais') {
        htmlContent = `
            <h2>Dados do Formulário Briefing Redes Sociais</h2>
            <p><strong>Departamento:</strong> ${formData.departamento}</p> 
            <p><strong>Solicitante:</strong> ${formData.solicitante}</p>
            <p><strong>Profissional:</strong> ${formData.profissional}</p> 
            <p><strong>Data da solicitação:</strong> ${formData['Data da solicitação']}</p> 
            <p><strong>Retranca:</strong> ${formData['retranca']}</p> 
            <p><strong>Cobertura:</strong> ${formData['cobertura']}</p>
            <p><strong>Data e horário do evento:</strong> ${formData['data e horário do evento']}</p>
            <p><strong>Local (endereço completo):</strong> ${formData['local']}</p>
            <p><strong>Assunto da pauta:</strong> ${formData['assunto da pauta']}</p>
            <p><strong>Objetivo do conteúdo:</strong> ${formData['objetivo do conteúdo']}</p>//
            <p><strong>Tipo de imagem que se pretende obter nesta cobertura:</strong> ${formData['detalhista']}</p>
            <p><strong>Quantidade de Conteúdos Derivados:</strong> ${formData['quantidade']}</p>//
            <p><strong>Plataformas e objetivos específicos:</strong> ${`objetivo-${plataforma}` `Objetivo para ${plataforma}`}</p>
            <p><strong>Pessoas a serem entrevistadas:</strong> ${formData[`interviewees[${index}].name`]}</p>
            <p><strong>Informações adicionais:</strong> ${formData['departamentos envolvidos']}</p>
        `;
    }

    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: 'iluminismos@gmail.com',
        subject: `Briefing para demandas de Comunicação e Marketing (${formType})`,
        html: htmlContent,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado: ' + info.response);
    } catch (error) {
        console.log('Erro ao enviar e-mail: ' + error);
    }
}

module.exports = sendEmail;







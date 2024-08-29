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
        subject: 'Formulario Pai Eterno - Marketing / Redes Sociais', // Assunto do e-mail
    };

    // Verificar o tipo de formulário e configurar o conteúdo do e-mail
    if (formData.tipoFormulario === 'BriefingMarketing') {
        mailOptions.html = `
            <h2 style="color: #B80D46;">Dados do Formulário Briefing Marketing</h2>
            <p><strong>Departamento:</strong> ${formData.departamento}</p>
            <p><strong>Solicitante:</strong> ${formData.solicitante}</p>
            <p><strong>Data:</strong> ${formData.data}</p>
            <p><strong>Material a ser Produzido:</strong> ${formData['material a ser produzido']}</p>
            <p><strong>Objetivo desta Produção:</strong> ${formData['objetivo desta produção']}</p>
            <p><strong>Público-Alvo:</strong> ${formData['Público-Alvo']}</p>
            <p><strong>Mensagem fundamental que deseja comunicar:</strong> ${formData['mensagem fundamental']}</p>
            <p><strong>Canais:</strong> ${formData['canais']}</p>
            <p><strong>Cronograma Detalhado:</strong> ${formData['cronograma detalhado']}</p>
            <p><strong>Formatos e Especificações:</strong> ${formData['formatos e as especificações']}</p>
            <p><strong>Informação Adicional:</strong> ${formData['informação adicional']}</p>
            <br/><br/>
            <p>© Copyright, Pai Eterno</p>
        `;
    } else if (formData.tipoFormulario === 'BriefingRedesSociais') {
        
        console.log('Objetivos recebidos no backend:', formData.objetivos);


        // Gera o HTML para as plataformas e objetivos
        const plataformasHtml = formData.platforms && formData.platforms.length > 0
              ? formData.platforms.map(platforms => `
                  <p>13º Plataformas e objetivos específicos:</p>
                  <p><strong>plataforma:</strong> ${platforms.plataforma}</p>
                  <p><strong>objetivo:</strong> ${platforms.objetivo}</p>
                  `).join('')
             : `<p><strong>Não há plataformas e objetivos.</strong></p>`;
      

        // Gera o HTML para as pessoas a serem entrevistadas
        const pessoasEntrevistadasHtml = formData.interviewees && formData.interviewees.length > 0
            ? formData.interviewees.map(interviewee => `
                <p>14º Pessoas a serem entrevistadas:</p>
                <p><strong>Nome:</strong> ${interviewee.name}</p>
                <p><strong>Cargo/Função:</strong> ${interviewee.role}</p>
                <p><strong>Contato:</strong> ${interviewee.contact}</p>
              `).join('')
            : `<p><strong>Não há pessoas a serem entrevistadas especificadas.</strong></p>`;

        // Configuração do conteúdo do e-mail
        mailOptions.html = `
            <h2 style="color: #13435C;"> Dados do Formulário Briefing Redes Sociais</h2>
            <p> <strong>1º Departamento:</strong> ${formData.departamento}</p>
            <p> <strong>2º Solicitante:</strong> ${formData.solicitante}</p>
            <p> <strong>3º Profissional:</strong> ${formData.profissional}</p>
            <p> <strong>4º Data da solicitação:</strong> ${formData['Data da solicitação']}</p>
            <p> <strong>5º Retranca:</strong> ${formData['retranca']}</p>
            <p> <strong>6º Cobertura:</strong> ${formData['cobertura']}</p>
            <p> <strong>7º Data e horário do evento:</strong> ${formData['data e horário do evento']}</p>
            <p> <strong>8º Local (endereço completo):</strong> ${formData['local']}</p>
            <p> <strong>9º Assunto da pauta:</strong> ${formData['assunto da pauta']}</p>
            <p> <strong>10º Objetivo do conteúdo:</strong> ${formData['objetivo do conteúdo']}</p>
            <p> <strong>11º Tipo de imagem que se pretende obter nesta cobertura:</strong> ${formData['detalhista']}</p>
            <p> <strong>12º Quantidade de Conteúdos Derivados:</strong> ${formData['quantidade']}</p>
            ${plataformasHtml}
            ${pessoasEntrevistadasHtml}
            <p><strong>15º Informações adicionais:</strong> ${formData['departamentos envolvidos']}</p>
            <br/><br/>
            <p>© Copyright, Pai Eterno</p>
            
        `;
    }

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado: ' + info.response);
    } catch (error) {
        console.log('Erro ao enviar e-mail: ' + error);
    }
}

module.exports = sendEmail;








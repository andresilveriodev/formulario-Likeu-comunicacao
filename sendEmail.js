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
            <h1 style="color: #B80D46;">Dados do Formulário Briefing Marketing</h1>
            <h3 style="color: #B80D46;"><strong>Departamento:</strong> ${formData.departamento}</h3>
            <h3 style="color: #B80D46;"><strong>Solicitante:</strong> ${formData.solicitante}</h3>
            <h3 style="color: #B80D46;"><strong>Data:</strong> ${formData.data}</h3>
            <h3 style="color: #B80D46;"><strong>Material a ser Produzido:</strong> ${formData['material a ser produzido']}</h3>
            <h3 style="color: #B80D46;"><strong>Objetivo desta Produção:</strong> ${formData['objetivo desta produção']}</h3>
            <h3 style="color: #B80D46;"><strong>Público-Alvo:</strong> ${formData['Público-Alvo']}</h3>
            <h3 style="color: #B80D46;"><strong>Mensagem fundamental que deseja comunicar:</strong> ${formData['mensagem fundamental']}</h3>
            <h3 style="color: #B80D46;"><strong>Canais:</strong> ${formData['canais']}</h3>
            <h3 style="color: #B80D46;"><strong>Cronograma Detalhado:</strong> ${formData['cronograma detalhado']}</h3>
            <h3 style="color: #B80D46;"><strong>Formatos e Especificações:</strong> ${formData['formatos e as especificações']}</h3>
            <h3 style="color: #B80D46;"><strong>Informação Adicional:</strong> ${formData['informação adicional']}</h3>
            <br/><br/>
            <p>paieterno.com.br</p>
            <p>© Copyright, Pai Eterno</p>
        `;
    } else if (formData.tipoFormulario === 'BriefingRedesSociais') {
        
        console.log('Objetivos recebidos no backend:', formData.objetivos);


        // Gera o HTML para as plataformas e objetivos
        const plataformasHtml = formData.platforms && formData.platforms.length > 0
              ? formData.platforms.map(platforms => `
                  <h3><strong>13º Plataformas e objetivos específicos:</strong></h3>
                  <h3><strong>Plataforma:</strong> ${platforms.plataforma}</h3>
                  <h3><strong>Objetivo:</strong> ${platforms.objetivo}</h3>
                  `).join('')
             : `<h3><strong>Não há plataformas e objetivos.</strong></h3>`;
      

        // Gera o HTML para as pessoas a serem entrevistadas
        const pessoasEntrevistadasHtml = formData.interviewees && formData.interviewees.length > 0
            ? formData.interviewees.map(interviewee => `
                <h3><strong>14º Pessoas a serem entrevistadas:</strong></h3>
                <h3><strong>Nome:</strong> ${interviewee.name}</h3>
                <h3><strong>Cargo/Função:</strong> ${interviewee.role}</h3>
                <h3><strong>Contato:</strong> ${interviewee.contact}</h3>
              `).join('')
            : `<h3><strong>Não há pessoas a serem entrevistadas especificadas.</strong></h3>`;

        // Configuração do conteúdo do e-mail
        mailOptions.html = `
            <h1 style="color: #13435C;"> Dados do Formulário Briefing Redes Sociais</h1>
            <h3 style="color: #13435C;"> <strong>1º Departamento:</strong> ${formData.departamento}</h3>
            <h3 style="color: #13435C;"> <strong>2º Solicitante:</strong> ${formData.solicitante}</h3>
            <h3 style="color: #13435C;"> <strong>3º Profissional:</strong> ${formData.profissional}</h3>
            <h3 style="color: #13435C;"> <strong>4º Data da solicitação:</strong> ${formData['Data da solicitação']}</h3>
            <h3 style="color: #13435C;"> <strong>5º Retranca:</strong> ${formData['retranca']}</h3>
            <h3 style="color: #13435C;"> <strong>6º Cobertura:</strong> ${formData['cobertura']}</h3>
            <h3 style="color: #13435C;"> <strong>7º Data e horário do evento:</strong> ${formData['data e horário do evento']}</h3>
            <h3 style="color: #13435C;"> <strong>8º Local (endereço completo):</strong> ${formData['local']}</h3>
            <h3 style="color: #13435C;"> <strong>9º Assunto da pauta:</strong> ${formData['assunto da pauta']}</h3>
            <h3 style="color: #13435C;"> <strong>10º Objetivo do conteúdo:</strong> ${formData['objetivo do conteúdo']}</h3>
            <h3 style="color: #13435C;"> <strong>11º Tipo de imagem que se pretende obter nesta cobertura:</strong> ${formData['detalhista']}</h3>
            <h3 style="color: #13435C;"> <strong>12º Quantidade de Conteúdos Derivados:</strong> ${formData['quantidade']}</h3>
            ${plataformasHtml}
            ${pessoasEntrevistadasHtml}
            <h3><strong>15º Informações adicionais:</strong> ${formData['departamentos envolvidos']}</h3>
            <br/><br/>
            <p>paieterno.com.br</p>
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








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
            <h3 style="color: #B80D46;"><strong>Departamento:</strong></h3><p>${formData.departamento}</p>
            <h3 style="color: #B80D46;"><strong>Solicitante:</strong> </h3><p>${formData.solicitante}</p>
            <h3 style="color: #B80D46;"><strong>Data:</strong> </h3><p>${formData.data}</p>
            <h3 style="color: #B80D46;"><strong>Material a ser Produzido:</strong> </h3><p>${formData['material a ser produzido']}</p>
            <h3 style="color: #B80D46;"><strong>Objetivo desta Produção:</strong></h3><p>${formData['objetivo desta produção']}</p>
            <h3 style="color: #B80D46;"><strong>Público-Alvo:</strong> </h3><p>${formData['Público-Alvo']}</p>
            <h3 style="color: #B80D46;"><strong>Mensagem fundamental que deseja comunicar:</strong> </h3><p>${formData['mensagem fundamental']}</p>
            <h3 style="color: #B80D46;"><strong>Canais:</strong> </h3><p>${formData['canais']}</p>
            <h3 style="color: #B80D46;"><strong>Cronograma Detalhado:</strong> </h3><p>${formData['cronograma detalhado']}</p>
            <h3 style="color: #B80D46;"><strong>Formatos e Especificações:</strong> </h3><p>${formData['formatos e as especificações']}</p>
            <h3 style="color: #B80D46;"><strong>Informação Adicional:</strong> </h3><p>${formData['informação adicional']}</p>
            <br/><br/>
            <p>paieterno.com.br</p>
            <p>© Copyright, Pai Eterno</p>
        `;
    } else if (formData.tipoFormulario === 'BriefingRedesSociais') {
        
        console.log('Objetivos recebidos no backend:', formData.objetivos);


        // Gera o HTML para as plataformas e objetivos
        const plataformasHtml = formData.platforms && formData.platforms.length > 0
              ? formData.platforms.map(platforms => `
                  <h3><strong>13º Plataformas e objetivos específicos:</strong></h3><p> </p>
                  <h3><strong>Plataforma:</strong> </h3><p>${platforms.plataforma}</p>
                  <h3><strong>Objetivo:</strong> </h3><p>${platforms.objetivo}</p>
                  `).join('')
             : `<h3><strong>Não há plataformas e objetivos.</strong></h3>`;
      

        // Gera o HTML para as pessoas a serem entrevistadas
        const pessoasEntrevistadasHtml = formData.interviewees && formData.interviewees.length > 0
            ? formData.interviewees.map(interviewee => `
                <h3><strong>14º Pessoas a serem entrevistadas:</strong></h3>
                <h3><strong>Nome:</strong></h3><p>${interviewee.name}</p>
                <h3><strong>Cargo/Função:</strong> </h3><p>${interviewee.role}</p>
                <h3><strong>Contato:</strong> </h3><p>${interviewee.contact}</p>
              `).join('')
            : `<h3><strong>Não há pessoas a serem entrevistadas especificadas.</strong></h3>`;

        // Configuração do conteúdo do e-mail
        mailOptions.html = `
            <h1 style="color: #13435C;"> Dados do Formulário Briefing Redes Sociais</h1>
            <h3 style="color: #13435C;"> <strong>1º Departamento:</strong> </h3><p>${formData.departamento}</p>
            <h3 style="color: #13435C;"> <strong>2º Solicitante:</strong> </h3><p>${formData.solicitante}</p>
            <h3 style="color: #13435C;"> <strong>3º Profissional:</strong> </h3><p>${formData.profissional}</p>
            <h3 style="color: #13435C;"> <strong>4º Data da solicitação:</strong> </h3><p>${formData['Data da solicitação']}</p>
            <h3 style="color: #13435C;"> <strong>5º Retranca:</strong> </h3><p>${formData['retranca']}</p>
            <h3 style="color: #13435C;"> <strong>6º Cobertura:</strong> </h3><p>${formData['cobertura']}</p>
            <h3 style="color: #13435C;"> <strong>7º Data e horário do evento:</strong> </h3><p>${formData['data e horário do evento']}</p>
            <h3 style="color: #13435C;"> <strong>8º Local (endereço completo):</strong> </h3><p>${formData['local']}</p>
            <h3 style="color: #13435C;"> <strong>9º Assunto da pauta:</strong> </h3><p>${formData['assunto da pauta']}</p>
            <h3 style="color: #13435C;"> <strong>10º Objetivo do conteúdo:</strong> </h3><p>${formData['objetivo do conteúdo']}</p>
            <h3 style="color: #13435C;"> <strong>11º Tipo de imagem que se pretende obter nesta cobertura:</strong> </h3><p>${formData['detalhista']}</p>
            <h3 style="color: #13435C;"> <strong>12º Quantidade de Conteúdos Derivados:</strong> </h3><p>${formData['quantidade']}</p>
            ${plataformasHtml}
            ${pessoasEntrevistadasHtml}
            <h3 style="color: #13435C;"><strong>15º Informações adicionais:</strong> </h3><p>${formData['departamentos envolvidos']}</p>
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








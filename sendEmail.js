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
    },
    logger: true, // Adicione este
    debug: true  // Adicione este
});

async function sendEmail(formData) {
    // Configuração do e-mail
    let mailOptions = {
        from: process.env.MAIL_USERNAME, // Seu endereço de e-mail configurado nas variáveis de ambiente
        to: 'iluminismos@gmail.com', // Múltiplos destinatários separados por vírgula
        // to: 'atendimento@likeucomunicacao.com.br, likeucomunicacao@gmail.com', // Múltiplos destinatários separados por vírgula
        subject: 'Formulario Briefing Likeu', // Assunto do e-mail
    };



    // Verificar o tipo de formulário e configurar o conteúdo do e-mail
    if (formData.tipoFormulario === 'BriefingComunicacao360') {
        mailOptions.html = `
            <h1 style="color: #B80D46;">Dados do Formulário Briefing Comunicação 360</h1>
            <h3 style="color: #B80D46;"><strong>Empresa cliente:</strong></h3><p>${formData.empresa || 'Não informado'}</p>
            <h3 style="color: #B80D46;"><strong>Solicitante:</strong> </h3><p>${formData.solicitante || 'Não informado'}</p>
            <h3 style="color: #B80D46;"><strong>Data:</strong> </h3><p>${formData.data}</p>
            <h3 style="color: #B80D46;"><strong>Material a ser produzido:</strong> </h3><p>${formData['material-a-ser-produzido'] || 'Não informado'}</p>
            <h3 style="color: #B80D46;"><strong>Objetivo desta produção:</strong></h3><p>${formData['objetivo_desta_producao'] || 'Não informado'}</p>
            <h3 style="color: #B80D46;"><strong>Público-Alvo:</strong> </h3><p>${formData['Público-Alvo'] || 'Não informado'}</p>
            <h3 style="color: #B80D46;"><strong>Mensagem fundamental:</strong> </h3><p>${formData['mensagem-fundamental'] || 'Não informado'}</p>
            <h3 style="color: #B80D46;"><strong>Canais:</strong> </h3><p>${formData.canais || 'Não informado'}</p>
            <h3 style="color: #B80D46;"><strong>Cronograma detalhado:</strong> </h3><p>${formData['cronograma-detalhado'] || 'Não informado'}</p>
            <h3 style="color: #B80D46;"><strong>Formatos e especificações:</strong> </h3><p>${formData['formatos_e_especificacoes'] || 'Não informado'}</p>
            <h3 style="color: #B80D46;"><strong>Informação adicional:</strong> </h3><p>${formData['informação-adicional'] || 'Não informado'}</p>
            <h3 style="color: #B80D46;"><strong>Material explicativo:</strong> </h3><p>${formData.material || 'Não informado'}</p>
            <br/><br/>
            <p>likeucomunicacao.com.br/</p>
            <p>© Copyright, Likeu Comunicação</p>
        `;
    } else if (formData.tipoFormulario === 'BriefingConteudosOnline') {
        // Gera o HTML para as plataformas e objetivos
        const plataformasHtml = formData.platforms && formData.platforms.length > 0
            ? `<h3 style="color: #13435C;"><strong>11. Plataformas e objetivos específicos:</strong></h3>
                ${formData.platforms.map(platform => `
                    <p><strong>Plataforma:</strong> ${platform.plataforma || 'Não informado'}</p>
                    <p><strong>Objetivo:</strong> ${platform.objetivo || 'Não informado'}</p>
                    <br/>
                `).join('')}`
            : `<h3 style="color: #13435C;"><strong>11. Plataformas e objetivos:</strong></h3><p>Nenhuma plataforma especificada</p>`;
    
        // Gera o HTML para as pessoas a serem entrevistadas
        const pessoasEntrevistadasHtml = formData.interviewees && formData.interviewees.length > 0
            ? `<h3 style="color: #13435C;"><strong>12. Pessoas a serem entrevistadas:</strong></h3>
                ${formData.interviewees.map(interviewee => `
                    <p><strong>Nome:</strong> ${interviewee.name || 'Não informado'}</p>
                    <p><strong>Cargo/Função:</strong> ${interviewee.role || 'Não informado'}</p>
                    <p><strong>Contato:</strong> ${interviewee.contact || 'Não informado'}</p>
                    <br/>
                `).join('')}`
            : `<h3 style="color: #13435C;"><strong>12. Pessoas a serem entrevistadas:</strong></h3><p>Nenhuma pessoa especificada</p>`;
    
        // Configuração do conteúdo do e-mail
        mailOptions.html = `
            <h1 style="color: #13435C;">Dados do Formulário Briefing Conteúdos Online</h1>
            <h3 style="color: #13435C;"><strong>1. Empresa cliente:</strong></h3><p>${formData.profissional || 'Não informado'}</p>
            <h3 style="color: #13435C;"><strong>2. Solicitante:</strong></h3><p>${formData.solicitante || 'Não informado'}</p>
            <h3 style="color: #13435C;"><strong>3. Departamento:</strong></h3><p>${formData.departamento || 'Não informado'}</p>
            <h3 style="color: #13435C;"><strong>4. Data da solicitação:</strong></h3><p>${formData['Data da solicitação'] || 'Não informado'}</p>
            <h3 style="color: #13435C;"><strong>5. Nome do pedido:</strong></h3><p>${formData.retranca || 'Não informado'}</p>
            <h3 style="color: #13435C;"><strong>6. Data e horário do evento:</strong></h3><p>${formData['data e horário do evento'] || 'Não informado'}</p>
            <h3 style="color: #13435C;"><strong>7. Local completo:</strong></h3><p>${formData.local || 'Não informado'}</p>
            <h3 style="color: #13435C;"><strong>8. Assunto da pauta:</strong></h3><p>${formData['assunto da pauta'] || 'Não informado'}</p>
            <h3 style="color: #13435C;"><strong>9. Objetivo do conteúdo:</strong></h3><p>${formData['objetivo do conteúdo'] || 'Não informado'}</p>
            <h3 style="color: #13435C;"><strong>10. Detalhes da produção:</strong></h3><p>${formData.detalhista || 'Não informado'}</p>
            <h3 style="color: #13435C;"><strong>11. Restrições:</strong></h3><p>${formData.restricoes || 'Não informado'}</p>
            <h3 style="color: #13435C;"><strong>12. Responsável:</strong></h3><p>${formData.profissional_responsavel || 'Não informado'}</p>
            <h3 style="color: #13435C;"><strong>13. Quantidade de conteúdos:</strong></h3><p>${formData.quantidade || 'Não informado'}</p>
            <h3 style="color: #13435C;"><strong>14. Link da nuvem:</strong></h3><p>${formData['link da nuvem'] || 'Não informado'}</p>
            <h3 style="color: #13435C;"><strong>15. Informações para cards:</strong></h3><p>${formData['informacoes cards'] || 'Não informado'}</p>
            
            ${plataformasHtml}
            ${pessoasEntrevistadasHtml}
            
            <h3 style="color: #13435C;"><strong>16. Informações adicionais:</strong></h3><p>${formData['departamentos envolvidos'] || 'Não informado'}</p>
    
            <br/><br/>
            <p>likeucomunicacao.com.br/</p>
            <p>© Copyright, Likeu Comunicação</p>
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

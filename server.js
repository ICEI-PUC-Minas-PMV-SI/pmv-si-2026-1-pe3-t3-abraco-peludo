require('dotenv').config();

const crypto = require('crypto');
const path = require('path');
const jsonServer = require('json-server');
const nodemailer = require('nodemailer');
const cors = require('cors');

const APP_URL = process.env.APP_URL || 'http://127.0.0.1:5500';
const RESET_PATH = '/pages/login/resetPassword/resetPassword.html';
const DB_PATH = path.join(__dirname, 'src/public/data/db.json');

const server = jsonServer.create();
const router = jsonServer.router(DB_PATH);
const middlewares = jsonServer.defaults();

server.use(cors({
    origin: [
        'https://pmv-si-2026-1-pe3-t3-abraco-peludo-eight.vercel.app',
        'http://127.0.0.1:5500',
        'http://localhost:5500'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

function criarTransportador() {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        return null;
    }

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
}

async function enviarEmailRecuperacao(email, link) {
    const transportador = criarTransportador();

    if (!transportador) {
        console.log(`[DEV] Link de recuperação para ${email}: ${link}`);
        return { modoDev: true, link };
    }

    await transportador.sendMail({
        from: `"Abraço Peludo" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Recuperação de senha - Abraço Peludo',
        html: `
            <div style="font-family: Arial, sans-serif; color: #4D3227; max-width: 520px;">
                <h2>Recuperação de senha</h2>
                <p>Recebemos uma solicitação para redefinir a senha da sua conta no Abraço Peludo.</p>
                <p>Clique no botão abaixo para criar uma nova senha. O link expira em 1 hora.</p>
                <p style="margin: 24px 0;">
                    <a href="${link}" style="background:#FF8C42;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;">
                        Redefinir senha
                    </a>
                </p>
                <p>Se você não solicitou essa alteração, ignore este e-mail.</p>
                <p style="font-size:12px;color:#666;">Ou copie e cole este link no navegador:<br>${link}</p>
            </div>
        `
    });

    return { modoDev: false };
}

function buscarUsuarioPorEmail(db, email) {
    const adotante = db.get('adotantes').find({ email }).value();
    if (adotante) {
        return { tipo: 'adotante', usuarioId: adotante.id };
    }

    const instituicao = db.get('instituicoes').find({ email }).value();
    if (instituicao) {
        return { tipo: 'instituicao', usuarioId: instituicao.id };
    }

    return null;
}

server.use(middlewares);
server.use(require('body-parser').json({ limit: '15mb' }));
server.use(require('body-parser').urlencoded({ extended: true, limit: '15mb' }));

server.post('/recuperar-senha', async (req, res) => {
    const email = req.body?.email?.trim().toLowerCase();

    if (!email) {
        return res.status(400).json({ mensagem: 'Informe o e-mail.' });
    }

    const mensagemSucesso = 'Se o e-mail estiver cadastrado, você receberá um link de recuperação em instantes.';

    try {
        const db = router.db;
        const usuario = buscarUsuarioPorEmail(db, email);

        if (!usuario) {
            return res.json({ mensagem: mensagemSucesso });
        }

        const token = crypto.randomUUID();
        const expiraEm = new Date(Date.now() + 60 * 60 * 1000).toISOString();

        db.get('tokensRecuperacao')
            .push({
                token,
                email,
                tipo: usuario.tipo,
                usuarioId: usuario.usuarioId,
                expiraEm,
                usado: false,
                criadoEm: new Date().toISOString()
            })
            .write();

        const link = `${APP_URL}${RESET_PATH}?token=${token}`;
        const resultadoEmail = await enviarEmailRecuperacao(email, link);

        const resposta = { mensagem: mensagemSucesso };

        if (resultadoEmail.modoDev) {
            resposta.linkDev = link;
        }

        return res.json(resposta);
    } catch (erro) {
        console.error('Erro ao recuperar senha:', erro);
        return res.status(500).json({ mensagem: 'Não foi possível enviar o e-mail. Tente novamente.' });
    }
});

server.post('/redefinir-senha', (req, res) => {
    const token = req.body?.token;
    const senha = req.body?.senha;

    if (!token || !senha) {
        return res.status(400).json({ mensagem: 'Token e nova senha são obrigatórios.' });
    }

    if (senha.length < 6) {
        return res.status(400).json({ mensagem: 'A senha deve ter no mínimo 6 caracteres.' });
    }

    const db = router.db;
    const registroToken = db.get('tokensRecuperacao').find({ token, usado: false }).value();

    if (!registroToken) {
        return res.status(400).json({ mensagem: 'Link inválido ou já utilizado.' });
    }

    if (new Date(registroToken.expiraEm) < new Date()) {
        return res.status(400).json({ mensagem: 'Este link expirou. Solicite uma nova recuperação de senha.' });
    }

    const colecao = registroToken.tipo === 'adotante' ? 'adotantes' : 'instituicoes';
    const usuario = db.get(colecao).find({ id: registroToken.usuarioId }).value();

    if (!usuario) {
        return res.status(400).json({ mensagem: 'Usuário não encontrado.' });
    }

    db.get(colecao)
        .find({ id: registroToken.usuarioId })
        .assign({ senha })
        .write();

    db.get('tokensRecuperacao')
        .find({ token })
        .assign({ usado: true })
        .write();

    return res.json({ mensagem: 'Senha redefinida com sucesso!' });
});

server.use(router);

server.listen(3000, () => {
    console.log('API Abraço Peludo rodando em http://localhost:3000');

    if (!process.env.SMTP_USER) {
        console.log('SMTP não configurado. Links de recuperação serão exibidos no terminal (modo dev).');
    }
});
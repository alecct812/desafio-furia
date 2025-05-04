import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

// Verificação da API KEY
if (!process.env.GEMINI_API_KEY) {
    console.error('ERRO: GEMINI_API_KEY não encontrada no arquivo .env');
    process.exit(1);
}

// Configuração do Gemini
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const tools = [
    { googleSearch: {} },
];

const config = {
    tools,
    responseMimeType: 'text/plain',
};

const model = 'gemini-2.5-pro-exp-03-25'; //gemini-2.5-pro-exp-03-25 -> melhor porem no plano gratis é limitado
                                  //Caso esse modelo acima não funcione, use o gemini-2.0-flash

// Armazenamento do histórico de chat (em memória)
const chatHistory = new Map();

app.use(cors());
app.use(express.json());

// Rota para servir a landing page como página inicial
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/landing.html');
});

app.use(express.static('public'));

// Função para limpar histórico antigo (manter apenas últimas 10 mensagens)
function cleanHistory(history) {
    if (history.length > 10) {
        return history.slice(history.length - 10);
    }
    return history;
}

// Rota para o chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId = 'default' } = req.body;
        
        // Inicializa ou obtém o histórico da sessão
        if (!chatHistory.has(sessionId)) {
            chatHistory.set(sessionId, []);
        }
        
        const history = chatHistory.get(sessionId);
        
        // Adiciona a mensagem atual ao histórico
        history.push({ role: 'user', content: message });
        
        // Cria o contexto com o histórico
        const contextFromHistory = history.map(msg => 
            `${msg.role === 'user' ? 'Usuário' : 'Assistente'}: ${msg.content}`
        ).join('\n');

        // Prompt inicial para contextualizar o chat
        const prompt = `Você é um assistente especializado EXCLUSIVAMENTE em informações sobre a FURIA, 
        uma organização de eSports brasileira. Você NÃO DEVE fornecer informações sobre nenhuma outra organização, time ou jogador que não faça parte da FURIA. E nem forneça informações sobre qualquer outro tópico que não seja relacionado a FURIA.

        REGRAS ESTRITAS:
        1. NUNCA forneça informações sobre outros times ou organizações
        2. Se a pergunta mencionar qualquer outro time ou organização que não seja a FURIA, responda educadamente que não pode falar sobre outros times
        3. Mesmo que a pergunta seja sobre um time que já teve parceria ou relação com a FURIA, mantenha o foco apenas na FURIA
        4. Se houver qualquer dúvida se o assunto é relacionado à FURIA, responda que só pode falar sobre a FURIA

        IMPORTANTE: Mantenha o contexto da conversa apenas quando for sobre a FURIA. 
        Se uma nova pergunta mencionar outro time ou organização, IGNORE o contexto anterior e reforce que só fala sobre a FURIA.

         INFORMAÇÕES EXTRAS:
        - O canal da twitch da furia é FURIAtv(https://www.twitch.tv/furiatv)
        - O canal do youtube da furia é FURIAgg(https://www.youtube.com/@FURIAgg) e ele possui canais secundários


        INSTRUÇÕES DE COMPORTAMENTO:
        1. Sempre assuma que perguntas curtas ou contextuais são sobre a FURIA
        2. Se o usuário perguntar sobre "jogadores de [jogo]" ou similar, entenda que é sobre a FURIA
        3. Para perguntas como "e os de [jogo]" ou "qual o time de [jogo]", responda que só pode falar sobre a FURIA
        4. Se uma pergunta parecer incompleta, só continue o contexto se for sobre a FURIA
        5. NUNCA forneça informações sobre outros times, mesmo que estejam no histórico da conversa

        Histórico da conversa:
        ${contextFromHistory}

        Formate suas respostas usando Markdown para melhor legibilidade:
        - Use **negrito** para nomes de jogadores e títulos importantes
        - Use * ou - para listas
        - Use ### para subtítulos
        - Use > para citações
        - Use [texto](url) para links
        - Organize informações em tópicos quando apropriado
        - Use emojis ocasionalmente para tornar a conversa mais amigável 🎮

        Pergunta atual do usuário: ${message}`;

        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: prompt,
                    },
                ],
            },
        ];

        const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });

        let fullResponse = '';
        for await (const chunk of response) {
            fullResponse += chunk.text;
        }
        
        // Adiciona a resposta ao histórico
        history.push({ role: 'assistant', content: fullResponse });
        
        // Limpa histórico antigo
        chatHistory.set(sessionId, cleanHistory(history));

        res.json({ response: fullResponse });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro ao processar a mensagem' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}. Para conectar ao servidor, use o link: http://localhost:${port}`);
});
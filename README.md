# Chat Furioso - FURIA

![FURIA Logo](public/resources/images/furia_small.png)

## 📋 Sobre o Projeto

O Chat Furioso é um assistente virtual especializado em informações sobre a FURIA, uma das principais organizações de eSports do Brasil. Este chatbot utiliza inteligência artificial para fornecer respostas precisas e atualizadas sobre a FURIA, incluindo:

- Informações sobre jogadores
- Estatísticas de jogos
- Histórico de conquistas
- Escalações atuais
- E muito mais!

## 🚀 Tecnologias Utilizadas

- **Backend:**

  - Node.js
  - Express.js
  - Google Gemini AI

- **Frontend:**
  - HTML5
  - CSS3
  - Tailwind CSS
  - JavaScript

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- Uma chave de API do Google Gemini AI

### 🔑 Como obter a chave de API do Google Gemini AI

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Gemini AI para seu projeto
4. Acesse o [Google AI Studio](https://makersuite.google.com/app/apikey)
5. Faça login com a mesma conta Google usada no Cloud Console
6. Clique em "Get API key" ou "Obter chave de API"
7. Selecione o projeto criado no Cloud Console
8. Se solicitado, aceite os termos de serviço
9. Uma nova chave de API será gerada automaticamente
10. Copie a chave gerada e guarde-a em um local seguro

- [Documentação Gemini Api](https://ai.google.dev/gemini-api/docs/quickstart?hl=pt-br&lang=node)

> **Importante:**
>
> - A chave de API é sensível e deve ser mantida em segredo. Nunca compartilhe ou exponha sua chave publicamente.
> - É necessário ter um projeto no Google Cloud Console para usar a API do Gemini AI.
> - O uso da API pode estar sujeito a limites e custos dependendo do seu plano.

## 🔑 Configuração do Ambiente

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITÓRIO]
cd desafio-furia
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API e a porta na qual vai ser executada:

```env
GEMINI_API_KEY=sua_chave_api_aqui
PORT=sua_porta_aqui
```

## 🏃‍♂️ Como Executar

1. Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

2. Para produção:

```bash
npm start
```

3. Acesse o projeto em seu navegador:

```
http://localhost:3000
```


## 🔧 Configurações Adicionais

- **Porta do Servidor:** Por padrão, o servidor roda na porta 3000. Para alterar, modifique a variável `PORT` no arquivo `.env`.

- **Modelo de IA:** O projeto utiliza o modelo `gemini-2.0-flash` por padrão. Para alterar, modifique a constante `model` no arquivo `server.js`.

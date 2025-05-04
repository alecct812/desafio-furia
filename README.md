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
  - Tailwind CSS (na landing page)
  - CSS customizado (na página do chat)
  - JavaScript

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente já vem com o Node.js)
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
> - O uso da API pode estar sujeito a limites e custos dependendo do seu plano.
> - O modelo da I.A que está sendo utilizando por padrão é o gemini-2.5-pro-exp-03-25 por ser mais robusto, porém por ser a versão pro, caso o seu plano seja o grátis, ele vai ter limites de interação. Caso opte por não ter tanta limitação e continuar grátis, mude o modelo para o gemini-2.0-flash

## 🔑 Configuração do Ambiente

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITORIO]
cd desafio-furia
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API e a porta desejada:

```env
GEMINI_API_KEY=sua_chave_api_aqui
PORT=3000
```

## 🏗️ Build do Tailwind CSS

A landing page utiliza Tailwind CSS. Para gerar o CSS final, execute:

```bash
npm run build
```

Esse comando irá compilar o arquivo `public/style/landing.css` (que importa o Tailwind e estilos customizados) para `public/style/output.css`, que é utilizado na landing page.

> **Obs:** A página do chat (`chat.html`) utiliza apenas CSS customizado (`public/style/styles.css`).

## 🏃‍♂️ Como Executar Localmente

1. Gere o CSS do Tailwind (se ainda não fez):

```bash
npm run build
```

2. Inicie o servidor em modo desenvolvimento (com recarregamento automático):

```bash
npm run dev
```

Ou, para rodar em modo produção:

```bash
npm start
```

3. Acesse o projeto em seu navegador:

```
http://localhost:3000
```

- A landing page estará disponível na raiz.
- O chat pode ser acessado pelo botão "Acessar Chat" ou diretamente em `/chat.html`.


## 📂 Estrutura de Pastas

```
public/
  landing.html         # Landing page (usa Tailwind)
  chat.html            # Página do chat (CSS customizado)
  style/
    landing.css        # Entrada do Tailwind + customizações
    output.css         # CSS gerado pelo Tailwind (não editar manualmente)
    styles.css         # CSS customizado do chat
  scripts/
    script.js          # Lógica do chat
  resources/
    images/            # Imagens usadas no site
    favicon/           # Favicon
.env                   # Variáveis de ambiente (não versionado)
server.js              # Servidor Express + API Gemini
vercel.json            # Configuração de deploy na Vercel
package.json           # Dependências e scripts
```
Se tiver dúvidas, sugestões ou quiser contribuir, fique à vontade para abrir uma issue ou PR!

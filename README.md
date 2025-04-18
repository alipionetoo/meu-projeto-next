# meu-projeto-next

Este é o repositório da aplicação **Teste Prático Next.js**, desenvolvida por **Alipio Neto da Silva**. O objetivo deste projeto é demonstrar o uso de **Next.js** (App Router), **TypeScript**, **Tailwind CSS**, **Middleware**, **API Routes**, **autenticação simples**, **roteamento estático e dinâmico** e boas práticas de performance.

---

## 📦 Tecnologias

- **Next.js** (v15 App Router)
- **TypeScript**
- **Tailwind CSS** para estilização utilitária
- **Middleware** para logging e proteção de rota
- **API Routes** para login/logout e gerenciamento de cookies
- **Fetch** com cache, SSR e Client Components

---

## 🌐 Estrutura de Rotas

| Rota            | Descrição                                                                                                  |
|-----------------|------------------------------------------------------------------------------------------------------------|
| `/`             | Página inicial estática com links de navegação                                                             |
| `/users`        | Client Component que consome a API [RandomUser](https://randomuser.me) e exibe usuários com botão de copiar |
| `/posts/[id]`   | Rota dinâmica que carrega posts do JSONPlaceholder e atualiza a URL ao selecionar                            |
| `/login`        | Formulário de login (Client Component) que valida credenciais armazenadas no LocalStorage                    |
| `/protected`    | Página protegida via **Middleware**, carrega artigo aleatório da Wikipédia e valida cookie de sessão       |
| `/api/login`    | API Route que valida login e seta cookie `token=MEU_TOKEN_SECRETO`                                          |
| `/api/logout`   | API Route que limpa o cookie e redireciona para `/`                                                        |

---

## 🚀 Como executar localmente

### Pré-requisitos

- Node.js (>=18)
- npm ou yarn

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/alipionetoo/meu-projeto-next.git
   cd meu-projeto-next
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Variáveis de ambiente**

   - Nenhuma configuração adicional necessária. Usuários e tokens são definidos em memória.

4. **Executar em modo de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
   Acesse: [http://localhost:3000](http://localhost:3000)

5. **Build e start para produção**
   ```bash
   npm run build
   npm run start
   # ou
   yarn build && yarn start
   ```

---

## ⚙️ Funcionamento Interno

### Autenticação

- `/users` busca usuários fictícios e armazena em LocalStorage
- `/login` valida credenciais do LocalStorage e seta cookie `token`
- **Middleware** (`middleware.ts`) registra requisições e protege `/protected`

### Middleware

- Loga `method` e `pathname` de cada requisição
- Redireciona usuários não autenticados de `/protected` para `/login`

### Consumo de APIs

- **RandomUser API**: exibe perfis e credenciais no client
- **JSONPlaceholder**: rota dinâmica de posts com URL controlada via dropdown
- **Wikimedia REST API**: resumo de artigo aleatório em português na área protegida

### Estilização e UX

- **Tailwind CSS** com configurações em `globals.css`
- Layout consistente: cartões, botões com hover, transições suaves
- Componentes separados em Server e Client conforme necessidade

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

> Desenvolvido por **Alipio Neto da Silva**


# Guia de Setup Inicial — OpenAI Codex CLI

> **Tutorial completo para extrair o máximo do Codex CLI.**
> Atualizado em março de 2026.

---

## 1. Instalação e Autenticação

```bash
# Instalar via npm (requer Node.js 18+)
npm install -g codex

# Atualizar para a versão mais recente
npm update -g codex

# Autenticar (abre o navegador para OAuth do ChatGPT)
codex login

# Alternativa: autenticar com API key
printenv OPENAI_API_KEY | codex login --with-api-key
```

> **Planos compatíveis:** ChatGPT Plus, Pro, Business, Edu e Enterprise.

---

## 2. Estrutura de Diretórios — Visão Geral

```
~/.codex/                          ← CODEX_HOME (global)
├── config.toml                    ← Configuração principal
├── AGENTS.md                      ← Instruções globais
├── AGENTS.override.md             ← Override temporário global
├── skills/                        ← Skills globais
│   └── minha-skill/
│       └── SKILL.md
└── themes/                        ← Temas customizados para o TUI

meu-projeto/                       ← Raiz do repositório
├── AGENTS.md                      ← Instruções do projeto
├── AGENTS.override.md             ← Override temporário do projeto
├── .codex/
│   └── config.toml                ← Config do projeto (sandbox, modelo, agents)
├── .agents/
│   └── skills/                    ← Skills do repositório
│       └── deploy/
│           └── SKILL.md
└── services/
    └── api/
        └── AGENTS.override.md     ← Override por subdiretório
```

---

## 3. Conceitos-Chave do Codex CLI

| Conceito | Arquivo / Local | Descrição |
|----------|----------------|-----------|
| Instruções globais | `~/.codex/AGENTS.md` | Regras que valem para todos os repositórios |
| Instruções do projeto | `AGENTS.md` na raiz do repo | Contexto e regras específicas do projeto |
| Override temporário | `AGENTS.override.md` | Prioridade sobre o AGENTS.md do mesmo nível |
| Configuração global | `~/.codex/config.toml` | Modelo, sandbox, aprovações, MCP, profiles |
| Configuração do projeto | `.codex/config.toml` | Overrides de config por repositório |
| Skills | `~/.codex/skills/` ou `.agents/skills/` | Pacotes de instruções reutilizáveis (feature flag `skills`) |
| Multi-agents | `[agents.*]` no config.toml | Sub-agentes paralelos especializados (experimental) |
| MCP Servers | `[[mcp.servers]]` no config.toml | Integrações com ferramentas externas |
| Notificações | `notify` no config.toml | Executa programa ao fim de um turno (`agent-turn-complete`) |
| Modo não-interativo | `codex exec "..."` (alias: `codex e`) | Para CI/automação, sem TUI |
| Retomar sessão | `codex resume --last` | Reabre sessão anterior com contexto preservado |
| Slash commands | `/review`, `/skills`, `/model`, `/theme` | Atalhos dentro do TUI + custom commands |

---

## 4. Configuração Global — `~/.codex/config.toml`

Este é o coração da configuração. Copie apenas o que precisa.

```toml
################################################################################
# Modelo e Raciocínio
################################################################################
model = "gpt-5.4"                          # Modelo padrão
model_reasoning_effort = "medium"          # low | medium | high

################################################################################
# Políticas de Aprovação e Sandbox
################################################################################
# "untrusted"  → pede aprovação para TUDO (read-only)
# "on-request" → pede aprovação antes de executar comandos (padrão interativo)
# "never"      → executa tudo sem perguntar (use só em CI/ambientes isolados)
approval_policy = "on-request"

# "read-only"         → só lê arquivos
# "workspace-write"   → escreve dentro do workspace
# "danger-full-access" → acesso total (use com cautela)
sandbox_mode = "workspace-write"

# Permitir rede no sandbox workspace-write (útil para npm install, etc.)
[sandbox_workspace_write]
allow_network = true

################################################################################
# Web Search
################################################################################
# "cached" (padrão) | "live" (resultados em tempo real) | "disabled"
web_search = "live"

################################################################################
# Features Experimentais
################################################################################
[features]
skills = true            # Habilitar skills
multi_agent = true       # Habilitar multi-agents
shell_snapshot = true    # Acelerar comandos repetidos

################################################################################
# Notificações
################################################################################
# Executa um programa quando o agent termina um turno
# Único evento suportado por enquanto: agent-turn-complete
notify = ["bash", "-lc", "osascript -e 'display notification \"Codex terminou!\" with title \"Codex CLI\"'"]
# Linux: notify = ["notify-send", "Codex CLI", "Tarefa concluída"]

################################################################################
# MCP Servers
################################################################################
[[mcp.servers]]
name = "github"
command = "npx"
args = ["@modelcontextprotocol/server-github"]

[[mcp.servers]]
name = "filesystem"
command = "npx"
args = ["@modelcontextprotocol/server-filesystem", "/caminho/do/projeto"]

################################################################################
# Fallback de Nomes de Arquivo de Instruções
################################################################################
# Se seu repo já usa outro nome (ex: TEAM_GUIDE.md), adicione aqui
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
project_doc_max_bytes = 65536    # Padrão: 32768 (32 KiB)

################################################################################
# Profiles (experimental — permite alternar configs rapidamente)
################################################################################
# Uso: codex --profile deep-review
[profiles.deep-review]
model = "gpt-5-pro"
model_reasoning_effort = "high"
approval_policy = "never"

[profiles.rapido]
model = "gpt-4.1"
model_reasoning_effort = "low"
approval_policy = "on-request"

################################################################################
# Multi-Agents
################################################################################
[agents]
max_depth = 1                  # Profundidade máxima de sub-agents
max_concurrent_agents = 3      # Máximo de agents paralelos

[agents.reviewer]
description = "Encontra riscos de segurança, bugs e problemas em código."
config_file = "./agents/reviewer.toml"

[agents.explorer]
description = "Explora a codebase e responde perguntas sobre arquitetura."
config_file = "./agents/explorer.toml"

[agents.implementer]
description = "Implementa features seguindo specs e testes."
config_file = "./agents/implementer.toml"
```

---

## 5. AGENTS.md Global — `~/.codex/AGENTS.md`

Instruções globais que se aplicam a **todos** os repositórios.

```markdown
# Convenções Globais — Ecommerce Puro

## Identidade
- Você é um agente de desenvolvimento para a Ecommerce Puro, consultoria
  especializada no mercado de e-commerce brasileiro.
- Sempre responda em português brasileiro quando interagir comigo.

## Padrões de Código
- Prefira TypeScript sobre JavaScript puro.
- Use pnpm como gerenciador de pacotes.
- Siga o padrão de nomenclatura camelCase para variáveis e PascalCase para
  componentes/classes.
- Sempre rode `pnpm lint` antes de considerar uma tarefa completa.
- Sempre rode `pnpm test` após modificar arquivos .ts ou .tsx.

## Commits e PRs
- Mensagens de commit em português, no imperativo:
  "Adiciona endpoint de listagem de produtos"
- PRs devem incluir: contexto, mudanças, e como testar.

## Segurança
- Nunca commite secrets, API keys ou tokens.
- Peça confirmação antes de adicionar dependências de produção.
- Não execute comandos destrutivos (rm -rf, DROP TABLE, etc.) sem perguntar.

## Preferências de Comunicação
- Seja direto e objetivo nas explicações.
- Quando houver trade-offs, apresente as opções antes de decidir.
- Não explique conceitos básicos a menos que eu peça.
```

---

## 6. AGENTS.md do Projeto — Na Raiz do Repositório

Instruções específicas para cada projeto, na raiz do repositório.

```markdown
# AGENTS.md — Plataforma Ecommerce Puro

## Visão Geral do Projeto
Plataforma SaaS de gestão de e-commerce para lojistas brasileiros.
Stack: Next.js 14 (App Router) + tRPC + Prisma + PostgreSQL + Redis.

## Estrutura do Projeto
- `src/app/` — Rotas do Next.js (App Router)
- `src/server/` — Backend: tRPC routers, services, repositories
- `src/lib/` — Utilitários compartilhados
- `src/components/` — Componentes React reutilizáveis
- `prisma/` — Schema e migrações do banco
- `scripts/` — Scripts de automação e seed

## Comandos Essenciais
- `pnpm dev` — Servidor de desenvolvimento
- `pnpm build` — Build de produção
- `pnpm test` — Rodar todos os testes (Vitest)
- `pnpm test:e2e` — Testes E2E (Playwright)
- `pnpm lint` — ESLint + Prettier
- `pnpm db:migrate` — Aplicar migrações do Prisma
- `pnpm db:seed` — Popular banco com dados de teste

## Regras do Projeto
- Toda rota de API deve ter validação com Zod.
- Novos endpoints precisam de testes unitários E de integração.
- Componentes UI usam shadcn/ui + Tailwind CSS.
- Internacionalização: todo texto visível ao usuário deve usar i18n keys.
- Nunca altere migrações já aplicadas — crie novas.

## Variáveis de Ambiente
- `.env.example` tem todas as vars necessárias.
- Nunca altere `.env.local` sem necessidade.

## Contexto de Negócio
- Lojistas = "sellers", Compradores = "buyers"
- Marketplace unificado com múltiplos sellers
- Integrações: Mercado Livre, Shopee, Amazon BR, VTEX
- Campos obrigatórios de NFe para produtos fiscais
```

---

## 7. AGENTS.override.md — Overrides Temporários

O Codex usa `AGENTS.override.md` como uma camada que **tem prioridade** sobre o `AGENTS.md` do mesmo diretório. Útil para sprints, migrações ou experimentos temporários.

```markdown
# AGENTS.override.md — Sprint de Migração (temporário)

## Contexto Atual
Estamos migrando de Pages Router para App Router no Next.js.

## Regras Temporárias
- Ao tocar em qualquer arquivo em `src/pages/`, migre-o para `src/app/`.
- Mantenha backward compatibility com redirects em `next.config.js`.
- Priorize testes E2E para rotas migradas.
- Ao concluir uma migração, remova o arquivo antigo de `src/pages/`.
```

> **Dica:** remova o `AGENTS.override.md` quando a sprint terminar para voltar ao comportamento padrão.

---

## 8. Cadeia de Instruções — Ordem de Precedência

O Codex monta as instruções em camadas, do global para o local. Instruções mais próximas do diretório atual aparecem **depois** no prompt (e portanto têm prioridade):

```
1. ~/.codex/AGENTS.override.md  (ou AGENTS.md se não existir override)
        ↓
2. <raiz-do-projeto>/AGENTS.md  (ou override, ou fallback names)
        ↓
3. <subdiretório>/AGENTS.md     (caminhando até o cwd)
        ↓
4. <cwd>/AGENTS.override.md     (prioridade máxima)
```

O Codex só lê **um** arquivo por diretório (o primeiro não-vazio na ordem: override → AGENTS.md → fallback names).

---

## 9. Skills — O Sistema de Habilidades Reutilizáveis

Skills são "pacotes de instruções" que o Codex carrega sob demanda. Cada skill é uma pasta com um `SKILL.md`.

### Habilitando Skills

```bash
# Via CLI
codex features enable skills

# Ou no config.toml
[features]
skills = true
```

### Criando uma Skill Global

```bash
mkdir -p ~/.codex/skills/ecommerce-api
```

```markdown
# ~/.codex/skills/ecommerce-api/SKILL.md
---
name: ecommerce-api
description: >
  Use quando o usuário pedir para criar ou modificar endpoints de API
  para a plataforma de e-commerce. Cobre rotas tRPC, validação Zod,
  e integração com Prisma. NÃO use para componentes frontend.
---

## Padrão de Endpoint tRPC

Sempre siga esta estrutura ao criar um novo router:

1. Definir o schema Zod de input/output em `src/server/schemas/`
2. Criar o service em `src/server/services/`
3. Criar o router em `src/server/routers/`
4. Registrar no `src/server/routers/_app.ts`
5. Criar testes em `src/server/__tests__/`

## Template de Router

```typescript
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { NomeService } from "../services/nome.service";

export const nomeRouter = createTRPCRouter({
  listar: protectedProcedure
    .input(z.object({ page: z.number().min(1).default(1) }))
    .query(async ({ input, ctx }) => {
      return NomeService.listar(input, ctx.session.user.id);
    }),
});
```

## Regras
- Todo input deve ser validado com Zod.
- Usar `protectedProcedure` por padrão (requer auth).
- Nomear arquivos em kebab-case: `nome-do-router.ts`.
- Services nunca acessam `ctx` diretamente — recebem parâmetros explícitos.
```

### Criando uma Skill no Repositório

```bash
mkdir -p .agents/skills/deploy
```

```markdown
# .agents/skills/deploy/SKILL.md
---
name: deploy
description: >
  Use quando o usuário pedir para fazer deploy, configurar CI/CD,
  ou resolver problemas de infraestrutura. NÃO use para código
  de aplicação.
---

## Processo de Deploy
1. Build: `pnpm build`
2. Testes: `pnpm test && pnpm test:e2e`
3. Push para a branch `staging`
4. Aguardar CI (GitHub Actions)
5. Após aprovação, merge em `main` → deploy automático

## Ambientes
- staging: vercel preview
- production: vercel production

## Checklist Pré-Deploy
- [ ] Migrações de banco aplicadas
- [ ] Variáveis de ambiente atualizadas
- [ ] Testes passando
- [ ] Changelog atualizado
```

### Usando Skills

```
# No prompt interativo, use $ para mencionar uma skill
$ deploy Preciso configurar o pipeline de CI para o novo microserviço

# Ou use o comando /skills para listar e selecionar
/skills

# Codex também ativa skills automaticamente quando o prompt
# corresponde à description do SKILL.md
```

### Instalando Skills de Terceiros

```bash
# Usando o skill-installer integrado
# No prompt do Codex:
$skill-installer Instalar skills de feiskyer/codex-settings
```

---

## 10. Multi-Agents — Paralelizando Tarefas

O sistema de multi-agents permite que o Codex spawne sub-agentes especializados que trabalham em paralelo.

### Habilitando

```bash
codex features enable multi_agent
# Ou via /experimental no TUI
```

### Configurando Roles no config.toml

**Arquivo global ou do projeto:**

```toml
[agents]
max_depth = 1
max_concurrent_agents = 4

[agents.security-reviewer]
description = "Analisa código em busca de vulnerabilidades de segurança."
config_file = "./agents/security.toml"

[agents.test-writer]
description = "Escreve testes unitários e de integração para código existente."
config_file = "./agents/test-writer.toml"

[agents.refactorer]
description = "Refatora código para melhor legibilidade e performance."
config_file = "./agents/refactorer.toml"
```

**Arquivo de config de cada role (ex: `agents/security.toml`):**

```toml
model = "gpt-5.4"
model_reasoning_effort = "high"
developer_instructions = """
Você é um especialista em segurança de aplicações web.
Foque em: SQL injection, XSS, CSRF, autenticação/autorização,
exposição de dados sensíveis, e dependências vulneráveis.
Reporte findings no formato: SEVERIDADE | LOCAL | DESCRIÇÃO | RECOMENDAÇÃO.
"""
```

### Usando Multi-Agents

```
# Prompt que dispara paralelismo automaticamente
Revise o PR atual nos seguintes aspectos, usando um agent por item:
1. Segurança
2. Cobertura de testes
3. Qualidade e legibilidade do código
Espere todos terminarem e me dê um resumo consolidado.

# O Codex pode decidir sozinho ou você pode pedir explicitamente
Spawne um agent para explorar a estrutura de rotas e outro para mapear
as dependências do módulo de pagamentos.
```

---

## 11. Notify — O "Hook" do Codex

O sistema de hooks do Codex ainda está em fase inicial. Atualmente, o Codex suporta apenas o evento `agent-turn-complete` via a chave `notify` no config.toml. Mais eventos estão em desenvolvimento.

### Configuração

```toml
# macOS — notificação nativa
notify = ["bash", "-lc", "osascript -e 'display notification \"Codex terminou!\" with title \"Codex\"'"]

# macOS — som
notify = ["bash", "-lc", "afplay /System/Library/Sounds/Blow.aiff"]

# Linux — notify-send
notify = ["notify-send", "Codex CLI", "Turno concluído"]

# Webhook (ex: Slack, Discord)
notify = ["bash", "-lc", "curl -s -X POST -H 'Content-Type: application/json' -d '{\"text\":\"Codex terminou uma tarefa\"}' https://hooks.slack.com/services/XXX/YYY/ZZZ"]
```

> **Limitação:** o sistema de hooks do Codex está em desenvolvimento ativo. A comunidade já solicitou mais eventos (veja [Discussion #2150](https://github.com/openai/codex/discussions/2150)). Por enquanto, `notify` é o máximo disponível.

---

## 12. Config do Projeto — `.codex/config.toml`

Para configs específicas do projeto (versionável no Git):

```toml
# .codex/config.toml (na raiz do repositório)

# O Codex só carrega esta config se o projeto for marcado como "trusted"
# Na primeira vez, o Codex pergunta se você confia no projeto

model = "gpt-5.4"
approval_policy = "on-request"
sandbox_mode = "workspace-write"

[sandbox_workspace_write]
allow_network = true
additional_writable_roots = ["/tmp"]

# MCP servers específicos do projeto
[[mcp.servers]]
name = "database"
command = "npx"
args = ["@modelcontextprotocol/server-postgres", "postgresql://localhost:5432/ecommerce"]
```

---

## 13. Workflows do Dia a Dia

### Interativo (padrão)

```bash
# Abrir TUI no diretório do projeto
cd ~/projetos/plataforma-ecommerce
codex

# Abrir com prompt inicial
codex "Analise a estrutura do projeto e sugira melhorias"

# Abrir com profile específico
codex --profile deep-review
```

### Não-interativo (CI/automação)

```bash
# Executar tarefa única
codex exec "Rode os testes e corrija os que falharem"

# Com sandbox mais permissivo
codex exec --sandbox workspace-write "Atualize todas as dependências"

# Output em JSON (para parsing em pipelines)
codex exec --json "Liste todos os endpoints da API"

# Full auto (sem perguntas — USE COM CUIDADO)
codex exec --yolo "Corrija todos os erros de lint"
```

### Code Review

```bash
# No TUI, use:
/review
# Opções:
#   - Review against base branch (compara com main/develop)
#   - Review uncommitted changes
#   - Review a specific commit
#   - Custom review instructions
```

### Retomar Sessões

```bash
# Picker interativo de sessões recentes
codex resume

# Retomar a última sessão
codex resume --last

# Retomar sessão específica
codex resume <SESSION_ID>

# Fork de sessão (cria nova thread preservando histórico)
codex fork <SESSION_ID>
```

---

## 14. Atalhos e Truques no TUI

| Atalho | Ação |
|--------|------|
| `@` | Busca fuzzy de arquivos no workspace |
| `!comando` | Executa comando shell local |
| `Enter` (durante execução) | Injeta instrução no turno atual |
| `Tab` (durante execução) | Enfileira prompt para o próximo turno |
| `Esc` `Esc` | Editar mensagem anterior (fork) |
| `Ctrl+G` | Abrir editor externo ($VISUAL ou $EDITOR) |
| `Ctrl+L` | Limpar tela (sem limpar histórico) |
| `Ctrl+C` ou `/exit` | Encerrar sessão |
| `/clear` | Limpar chat e começar do zero |
| `/copy` | Copiar última saída do Codex |
| `/model` | Trocar modelo durante a sessão |
| `/theme` | Alterar tema visual |
| `/skills` | Listar e ativar skills |
| `/review` | Abrir modo de code review |

---

## 15. Checklist de Setup para Novo Projeto

```bash
# 1. Inicializar o repositório
cd ~/projetos/novo-projeto
git init

# 2. Criar estrutura Codex
mkdir -p .codex
mkdir -p .agents/skills

# 3. Criar AGENTS.md do projeto
cat > AGENTS.md << 'EOF'
# Instruções do Projeto

## Sobre
[Descreva o projeto, stack, e contexto de negócio]

## Estrutura
[Mapeie os diretórios principais]

## Comandos
[Liste os comandos de dev, test, build, deploy]

## Regras
[Defina padrões de código, testes obrigatórios, etc.]
EOF

# 4. Criar config do projeto (opcional)
cat > .codex/config.toml << 'EOF'
sandbox_mode = "workspace-write"

[sandbox_workspace_write]
allow_network = true
EOF

# 5. Confiar no projeto (na primeira execução o Codex pergunta,
#    ou defina manualmente)
# project_trust = "trusted"  # no .codex/config.toml

# 6. Rodar o Codex
codex
```

---

## 16. Dicas Finais

**Sobre Memória:** o Codex não tem um sistema de memória persistente entre sessões. Para manter contexto ao longo do tempo, use o `AGENTS.md` do projeto como fonte de verdade e atualize-o conforme o projeto evolui. Você também pode criar skills que carregam contexto sob demanda.

**Sobre Hooks:** o sistema de notificações do Codex atualmente cobre apenas o evento `agent-turn-complete`. Para proteger arquivos ou controlar execuções, use as approval policies e configurações de sandbox. A funcionalidade de hooks mais granulares está em desenvolvimento ativo.

**Fallback de Nomes de Arquivo:** se seu repositório já usa outro nome para instruções (como `TEAM_GUIDE.md`), adicione-o à lista de fallback filenames no config.toml:

```toml
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
```

**Compatibilidade de Skills:** o Codex segue o padrão aberto `agentskills.io`, o que significa que skills são portáveis entre diferentes ferramentas de coding agents que adotem o mesmo padrão.

---

> **Referências oficiais:**
> - [Codex CLI Docs](https://developers.openai.com/codex/cli/)
> - [AGENTS.md Guide](https://developers.openai.com/codex/guides/agents-md/)
> - [Config Reference](https://developers.openai.com/codex/config-reference/)
> - [Multi-agents](https://developers.openai.com/codex/multi-agent/)
> - [Skills](https://developers.openai.com/codex/skills/)
> - [Sample Config](https://developers.openai.com/codex/config-sample/)

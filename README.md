
# SIR-TP1-SVELTE

Aplicação web para gerir alunos e cursos, feita em **Svelte 5** + **Tailwind CSS v3** (com Vite).
Consome uma API REST com MongoDB alojada no Render.

## Funcionalidades

- Listar alunos com o respetivo curso e ano curricular
- Criar, editar e apagar alunos
- Criar cursos

## Como correr

    npm install
    npm run dev

Depois abre o endereço que aparece no terminal (normalmente http://localhost:5173).

> A API está no Render: o primeiro pedido pode demorar cerca de um minuto a responder.

## Estrutura

- `src/App.svelte`: página principal e tabela de alunos
- `src/lib/AlunoModal.svelte` e `CursoModal.svelte`: modais de criar/editar
- `src/lib/api.js`: pedidos à API

## Link Site Render

- https://sir-tp1-svelte.onrender.com/

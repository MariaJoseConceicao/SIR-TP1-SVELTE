<script>
  import { onMount } from 'svelte'
  import * as api from './lib/api.js'
  import AlunoModal from './lib/AlunoModal.svelte'
  import CursoModal from './lib/CursoModal.svelte'

  let alunos = $state([])
  let cursos = $state([])
  let aCarregar = $state(true)
  let alunoModal = $state()
  let cursoModal = $state()

  async function carregarTudo() {
    try {
      const [listaAlunos, listaCursos] = await Promise.all([
        api.getAlunos(),
        api.getCursos(),
      ])
      alunos = listaAlunos
      cursos = listaCursos
    } catch (erro) {
      console.error(erro)
      alert('Não foi possível carregar os dados.')
    } finally {
      aCarregar = false
    }
  }

  onMount(carregarTudo)

  function nomeCurso(idCurso) {
    const curso = cursos.find((c) => String(c._id) === String(idCurso))
    return curso ? curso.nomeDoCurso : 'Curso desconhecido'
  }

  async function guardarAluno(dados) {
    if (dados._id) {
      await api.updateAluno(dados._id, dados)
    } else {
      await api.addAluno(dados)
    }
    alunos = await api.getAlunos()
  }

  async function guardarCurso(dados) {
    await api.addCurso(dados)
    cursos = await api.getCursos()
    alunos = await api.getAlunos()
  }

  async function apagar(id) {
    if (!confirm('Tens a certeza que queres apagar este aluno?')) return

    try {
      await api.deleteAluno(id)
      alunos = await api.getAlunos()
    } catch (erro) {
      console.error(erro)
      alert('Não foi possível apagar o aluno.')
    }
  }
</script>

<h1 class="mx-auto mb-[30px] max-w-[1100px] text-center text-[32px] font-bold text-blue-900 min-[701px]:text-[42px]">
  Alunos
</h1>

<div class="mx-auto mb-2.5 flex max-w-[1100px] flex-wrap justify-center gap-3">
  <button
    onclick={() => alunoModal.abrir()}
    class="inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-linear-to-br from-blue-600 to-blue-700 px-6 text-[15px] font-bold text-white shadow-[0_6px_16px_rgba(37,99,235,0.35)] transition hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(37,99,235,0.45)] active:translate-y-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-600/35 max-[700px]:w-full"
  >
    <span class="text-xl leading-none">+</span> Criar Aluno
  </button>

  <button
    onclick={() => cursoModal.abrir()}
    class="inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-linear-to-br from-emerald-500 to-emerald-600 px-6 text-[15px] font-bold text-white shadow-[0_6px_16px_rgba(16,185,129,0.35)] transition hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(16,185,129,0.45)] active:translate-y-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-600/35 max-[700px]:w-full"
  >
    <span class="text-xl leading-none">+</span> Criar Curso
  </button>
</div>

<h2 class="mx-auto mb-[15px] mt-[30px] max-w-[1100px] text-[21px] font-bold text-blue-800 min-[701px]:text-2xl">
  Lista de Alunos
</h2>

<table
  class="mx-auto w-full max-w-[1100px] overflow-hidden rounded-[14px] border-separate border-spacing-0 bg-white shadow-[0_8px_25px_rgba(30,64,175,0.12)] max-[700px]:block max-[700px]:overflow-x-auto max-[700px]:whitespace-nowrap"
>
  <thead class="bg-blue-600 text-white">
    <tr>
      {#each ['Nome', 'Apelido', 'Curso', 'Ano Curricular', 'Ações'] as titulo}
        <th class="border-b border-gray-200 p-3 text-left text-[15px] font-bold min-[701px]:p-[15px]">{titulo}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#if aCarregar}
      <tr>
        <td colspan="5" class="p-[15px] text-center text-sm text-slate-500">A carregar...</td>
      </tr>
    {/if}

    {#each alunos as aluno (aluno._id)}
      <tr class="transition-colors hover:bg-blue-50 [&:last-child>td]:border-b-0">
        <td class="border-b border-gray-200 p-3 text-sm min-[701px]:p-[15px]">{aluno.nome}</td>
        <td class="border-b border-gray-200 p-3 text-sm min-[701px]:p-[15px]">{aluno.apelido}</td>
        <td class="border-b border-gray-200 p-3 text-sm min-[701px]:p-[15px]">{nomeCurso(aluno.idCurso)}</td>
        <td class="border-b border-gray-200 p-3 text-sm min-[701px]:p-[15px]">{aluno.anoCurricular}</td>
        <td class="border-b border-gray-200 p-3 text-sm min-[701px]:p-[15px]">
          <button
            onclick={() => alunoModal.abrir(aluno)}
            class="mr-1.5 min-h-[34px] cursor-pointer rounded-lg bg-amber-100 px-3.5 text-[13px] font-bold text-amber-700 transition hover:-translate-y-px hover:bg-amber-200"
          >Editar</button>
          <button
            onclick={() => apagar(aluno._id)}
            class="mr-1.5 min-h-[34px] cursor-pointer rounded-lg bg-red-100 px-3.5 text-[13px] font-bold text-red-700 transition hover:-translate-y-px hover:bg-red-200"
          >Apagar</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<AlunoModal bind:this={alunoModal} {cursos} onGuardar={guardarAluno} />
<CursoModal bind:this={cursoModal} onGuardar={guardarCurso} />
<script>
  let { cursos, onGuardar } = $props()

  let dialog
  let id = $state(null)
  let nome = $state('')
  let apelido = $state('')
  let idCurso = $state('')
  let anoCurricular = $state('')

  export function abrir(aluno = null) {
    id = aluno?._id ?? null
    nome = aluno?.nome ?? ''
    apelido = aluno?.apelido ?? ''
    idCurso = aluno?.idCurso ?? ''
    anoCurricular = aluno?.anoCurricular ?? ''
    dialog.showModal()
  }

  async function submeter(e) {
    e.preventDefault()

    try {
      await onGuardar({
        _id: id,
        nome,
        apelido,
        idCurso,
        anoCurricular: Number(anoCurricular),
      })
      dialog.close()
    } catch (erro) {
      console.error(erro)
      alert('Ocorreu um erro ao guardar o aluno.')
    }
  }
</script>

<dialog
  bind:this={dialog}
  class="m-auto w-[min(92vw,460px)] rounded-[18px] border-none bg-white p-5 text-gray-800 shadow-[0_25px_60px_rgba(15,23,42,0.35)] backdrop:bg-slate-900/55 backdrop:backdrop-blur-[3px] open:animate-modal-entrada open:backdrop:animate-fundo-entrada min-[701px]:p-7"
>
  <h2 class="mb-5 border-b-2 border-indigo-100 pb-3.5 text-[22px] font-bold text-blue-900">
    {id ? 'Editar Aluno' : 'Criar Aluno'}
  </h2>

  <form onsubmit={submeter} class="flex flex-col gap-1.5">
    <label for="nome" class="rotulo">Nome Aluno:</label>
    <input class="campo" type="text" id="nome" placeholder="Nome do aluno" bind:value={nome} required />

    <label for="apelido" class="rotulo">Apelido Aluno:</label>
    <input class="campo" type="text" id="apelido" placeholder="Apelido do aluno" bind:value={apelido} required />

    <label for="idCurso" class="rotulo">Curso:</label>
    <select class="campo" id="idCurso" bind:value={idCurso} required>
      <option value="">Seleciona um curso</option>
      {#each cursos as curso (curso._id)}
        <option value={curso._id}>{curso.nomeDoCurso}</option>
      {/each}
    </select>

    <label for="anoCurricular" class="rotulo">Ano Curricular:</label>
    <input class="campo" type="number" id="anoCurricular" placeholder="Ano curricular" min="1" bind:value={anoCurricular} required />

    <div class="mt-[22px] flex gap-2.5 max-[700px]:flex-col-reverse">
      <button
        type="submit"
        class="min-h-[42px] flex-1 cursor-pointer rounded-[10px] bg-gradient-to-br from-blue-600 to-blue-700 px-[18px] text-sm font-bold text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(37,99,235,0.4)]"
      >
        {id ? 'Guardar' : 'Criar Aluno'}
      </button>
      <button
        type="button"
        onclick={() => dialog.close()}
        class="min-h-[42px] flex-1 cursor-pointer rounded-[10px] border border-slate-300 bg-slate-100 px-[18px] text-sm font-bold text-slate-600 transition hover:-translate-y-px hover:bg-slate-200"
      >
        Cancelar
      </button>
    </div>
  </form>
</dialog>
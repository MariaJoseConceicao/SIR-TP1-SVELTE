<script>
  let { onGuardar } = $props()

  let dialog
  let nome = $state('')
  let coordenador = $state('')

  export function abrir() {
    nome = ''
    coordenador = ''
    dialog.showModal()
  }

  async function submeter(e) {
    e.preventDefault()

    try {
      await onGuardar({ nomeDoCurso: nome, coordenador })
      dialog.close()
    } catch (erro) {
      console.error(erro)
      alert('Ocorreu um erro ao guardar o curso.')
    }
  }
</script>

<dialog
  bind:this={dialog}
  class="m-auto w-[min(92vw,460px)] rounded-[18px] border-none bg-white p-5 text-gray-800 shadow-[0_25px_60px_rgba(15,23,42,0.35)] backdrop:bg-slate-900/55 backdrop:backdrop-blur-[3px] open:animate-modal-entrada open:backdrop:animate-fundo-entrada min-[701px]:p-7"
>
  <h2 class="mb-5 border-b-2 border-indigo-100 pb-3.5 text-[22px] font-bold text-blue-900">Criar Curso</h2>

  <form onsubmit={submeter} class="flex flex-col gap-1.5">
    <label for="nomeCurso" class="rotulo">Nome do Curso:</label>
    <input class="campo" type="text" id="nomeCurso" placeholder="Nome do curso" bind:value={nome} required />

    <label for="coordenador" class="rotulo">Coordenador:</label>
    <input class="campo" type="text" id="coordenador" placeholder="Coordenador" bind:value={coordenador} required />

    <div class="mt-[22px] flex gap-2.5 max-[700px]:flex-col-reverse">
      <button
        type="submit"
        class="min-h-[42px] flex-1 cursor-pointer rounded-[10px] bg-gradient-to-br from-emerald-500 to-emerald-600 px-[18px] text-sm font-bold text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(16,185,129,0.4)]"
      >Criar Curso</button>
      <button
        type="button"
        onclick={() => dialog.close()}
        class="min-h-[42px] flex-1 cursor-pointer rounded-[10px] border border-slate-300 bg-slate-100 px-[18px] text-sm font-bold text-slate-600 transition hover:-translate-y-px hover:bg-slate-200"
      >Cancelar</button>
    </div>
  </form>
</dialog>

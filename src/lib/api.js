const API_URL = 'https://sir-tp1-mongodb.onrender.com'
const JSON_HEADERS = { 'Content-Type': 'application/json' }

function proximoId(lista) {
  const ids = lista.map((x) => Number(x._id)).filter(Number.isInteger)
  return String(ids.length > 0 ? Math.max(...ids) + 1 : 1)
}

async function pedir(caminho, opcoes, mensagemErro) {
  const response = await fetch(`${API_URL}${caminho}`, opcoes)
  if (!response.ok) throw new Error(mensagemErro)
  return response
}

/* ---------- CURSOS ---------- */

export async function getCursos() {
  const r = await pedir('/cursos', undefined, 'Erro ao carregar cursos')
  return r.json()
}

export async function addCurso({ nomeDoCurso, coordenador }) {
  const cursos = await getCursos()
  const curso = { _id: proximoId(cursos), nomeDoCurso, coordenador }

  await pedir(
    '/cursos',
    { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(curso) },
    'Erro ao criar curso'
  )
}

/* ---------- ALUNOS ---------- */

export async function getAlunos() {
  const r = await pedir('/alunos', undefined, 'Erro ao carregar alunos')
  return r.json()
}

export async function addAluno({ nome, apelido, idCurso, anoCurricular }) {
  const alunos = await getAlunos()
  const aluno = { _id: proximoId(alunos), nome, apelido, idCurso, anoCurricular }

  await pedir(
    '/alunos',
    { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(aluno) },
    'Erro ao criar aluno'
  )
}

export async function updateAluno(id, { nome, apelido, idCurso, anoCurricular }) {
  await pedir(
    `/alunos/${id}`,
    {
      method: 'PUT',
      headers: JSON_HEADERS,
      body: JSON.stringify({ nome, apelido, idCurso, anoCurricular }),
    },
    'Erro ao atualizar aluno'
  )
}

export async function deleteAluno(id) {
  await pedir(`/alunos/${id}`, { method: 'DELETE' }, 'Erro ao apagar aluno')
}
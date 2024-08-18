import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Cadastro.css'
import Usuario from '../../models/Usuarios'
import { cadastrarUsuario } from '../../services/Services'
import { toastAlerta } from '../../util/toastAlerta'

function Cadastro() {

  let navigate = useNavigate()

  const [confirmaSenha, setConfirmaSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (usuarioResposta.id !== 0) {
      back()
    }
  }, [usuarioResposta])

  function back() {
    navigate('/login')
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResposta)
        toastAlerta('Usuário cadastrado com sucesso','sucesso')

      } catch (error) {
        toastAlerta('Erro ao cadastrar o Usuário','erro')
      }

    } else {
      toastAlerta('Dados inconsistentes. Verifique as informações de cadastro.','info')
      setUsuario({ ...usuario, senha: "" }) // Reinicia o campo de Senha
      setConfirmaSenha("")                  // Reinicia o campo de Confirmar Senha
    }
  }

  return (
    <>
  <div className="fundoCadastro hidden lg:block w-full h-screen bg-cover bg-center relative">
  <div className="absolute inset-0 bg-gray-900 opacity-80"></div>
  <div className="relative flex items-center justify-center w-full h-[90vh]">
    <form className="flex flex-col items-center w-full h-[80vh] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 md:p-6 bg-gray-800 shadow-2xl rounded-lg border border-gray-600" onSubmit={cadastrarNovoUsuario}>
      <h2 className="text-yellow-400 text-2xl sm:text-4xl mb-2 mt-0">Cadastrar</h2>

      {/* Nome */}
      <div className="flex flex-row items-center w-full mb-4 md:mb-5">
        <label htmlFor="nome" className="text-gray-300 mr-2 md:mr-4 w-1/2">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Nome"
          className="border border-gray-500 rounded p-1 md:p-2 bg-gray-700 text-gray-200 placeholder-gray-400 focus:border-yellow-500 focus:outline-none w-1/2"
          value={usuario.nome}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
        />
      </div>

      {/* Usuário */}
      <div className="flex flex-row items-center w-full mb-4 md:mb-5">
        <label htmlFor="usuario" className="text-gray-300 mr-2 md:mr-4 w-1/2">Usuário</label>
        <input
          type="text"
          id="usuario"
          name="usuario"
          placeholder="Usuário"
          className="border border-gray-500 rounded p-1 md:p-2 bg-gray-700 text-gray-200 placeholder-gray-400 focus:border-yellow-500 focus:outline-none w-1/2"
          value={usuario.usuario}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
        />
      </div>

      {/* Foto */}
      <div className="flex flex-row items-center w-full mb-4 md:mb-5">
        <label htmlFor="foto" className="text-gray-300 mr-2 md:mr-4 w-1/2">Foto</label>
        <input
          type="text"
          id="foto"
          name="foto"
          placeholder="Foto"
          className="border border-gray-500 rounded p-1 md:p-2 bg-gray-700 text-gray-200 placeholder-gray-400 focus:border-yellow-500 focus:outline-none w-1/2"
          value={usuario.foto}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
        />
      </div>

      {/* Senha */}
      <div className="flex flex-row items-center w-full mb-4 md:mb-5">
        <label htmlFor="senha" className="text-gray-300 mr-2 md:mr-4 w-1/2">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          placeholder="Senha"
          className="border border-gray-500 rounded p-1 md:p-2 bg-gray-700 text-gray-200 placeholder-gray-400 focus:border-yellow-500 focus:outline-none w-1/2"
          value={usuario.senha}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
        />
      </div>

      {/* Confirmar Senha */}
      <div className="flex flex-row items-center w-full mb-4 md:mb-5">
        <label htmlFor="confirmarSenha" className="text-gray-300 mr-2 md:mr-4 w-1/2">Confirmar Senha</label>
        <input
          type="password"
          id="confirmarSenha"
          name="confirmarSenha"
          placeholder="Confirmar Senha"
          className="border border-gray-500 rounded p-1 md:p-2 bg-gray-700 text-gray-200 placeholder-gray-400 focus:border-yellow-500 focus:outline-none w-1/2"
          value={confirmaSenha}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
        />
      </div>

      {/* Botões */}
      <div className="flex justify-between w-full gap-2 md:gap-4 mt-6">
        <button className="rounded bg-red-600 hover:bg-red-700 text-white w-1/2 py-2" onClick={back}>
          Cancelar
        </button>
        <button className="rounded bg-green-500 hover:bg-green-600 text-white w-1/2 py-2" type="submit">
          Cadastrar
        </button>
      </div>
    </form>
  </div>
</div>
    </>
  )
}

export default Cadastro
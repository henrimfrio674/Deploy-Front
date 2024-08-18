import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Usuario from "../../../models/Usuarios";
import { buscar, atualizar } from "../../../services/Services";
import { toastAlerta } from "../../../util/toastAlerta";

function FormularioUsuario() {
    let navigate = useNavigate();
  
    const { id } = useParams<{ id: string }>();
  
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
  
    const [usuarioData, setUsuarioData] = useState<Usuario>({
      id: 0,
      nome: '',
      usuario: '',
      senha:'',
      foto: '',
    });
  
    async function buscarUsuarioPorId(id: string) {
      await buscar(`/usuarios/${id}`, setUsuarioData, {
        headers: {
          Authorization: token,
        },
      });
    }
  
    useEffect(() => {
      if (token === '') {
        toastAlerta('Você precisa estar logado','info');
        navigate('/');
      }
    }, [token]);
  
    useEffect(() => {
      if (id !== undefined) {
        buscarUsuarioPorId(id);
      }
    }, [id]);
  
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
      setUsuarioData({
        ...usuarioData,
        [e.target.name]: e.target.value,
      });
    }
  
    function retornar() {
      navigate('/perfil');
    }
  
    async function atualizarUsuario(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault();
  
      console.log({ usuarioData });
  
      if (id !== undefined) {
        try {
          await atualizar(`/usuarios/${id}`, usuarioData, setUsuarioData, {
            headers: {
              Authorization: token,
            },
          });
          toastAlerta('Usuário atualizado com sucesso','sucesso');
          retornar();
        } catch (error: any) {
          if (error.toString().includes('403')) {
            toastAlerta('O token expirou, favor logar novamente','info');
            handleLogout();
          } else {
            toastAlerta('Erro ao atualizar o Usuário','erro');
          }
        }
      }
    }
  
    return (
      <div className="container flex flex-col mx-auto items-center">
        <h1 className="text-4xl text-center my-8">Editar Usuário</h1>
  
        <form onSubmit={atualizarUsuario} className="flex flex-col w-1/2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome">Nome</label>
            <input
              value={usuarioData.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="text"
              placeholder="Nome"
              name="nome"
              required
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              value={usuarioData.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="email"
              placeholder="Email"
              name="email"
              required
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="senha">Senha</label>
            <input
              value={usuarioData.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              type="password"
              placeholder="Senha"
              name="senha"
              required
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <button type="submit" className="rounded bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2">
            Editar Usuário
          </button>
        </form>
      </div>
    );
  }
  
  export default FormularioUsuario;
  
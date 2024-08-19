/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../models/Postagens';
import { buscar, deletar } from '../../../services/Services';
import { toastAlerta } from '../../../util/toastAlerta';

function DeletarPostagem() {
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlerta('O token expirou, favor logar novamente', 'info');
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function retornar() {
    navigate('/postagens');
  }

  async function deletarPostagem() {
    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      toastAlerta('Postagem apagada com sucesso', 'sucesso');
    } catch (error) {
      toastAlerta('Erro ao apagar a Postagem', 'error');
    }

    retornar();
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4 text-red-600">Deletar postagem</h1>

      <p className="text-center font-semibold mb-4 text-red-700">
        Você tem certeza de que deseja apagar a postagem a seguir?
      </p>

      <div className="border-red-600 border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-red-400 text-white font-bold text-2xl">Postagem</header>
        <div className="p-4">
          <p className="text-xl h-full text-red-700">{postagem.titulo}</p>
          <p className="text-red-600">{postagem.texto}</p>
        </div>
        <div className="flex">
          <button
            className="text-white bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="w-full text-white bg-red-300 hover:bg-red-500 flex items-center justify-center"
            onClick={deletarPostagem}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarPostagem;

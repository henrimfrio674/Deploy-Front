import { Link } from 'react-router-dom';
import Postagem from '../../../models/Postagens';

interface CardPostagemProps {
  post: Postagem;
}

function CardPostagem({ post }: CardPostagemProps) {
  return (
    <div className="border-red-600 border flex flex-col rounded overflow-hidden justify-between">
      <div>
        <div className="flex w-full bg-red-300 py-2 px-4 items-center gap-4">
          <img src={post.usuario?.foto} className="h-12 rounded-full" alt="" />
          <h3 className="text-lg font-bold text-center uppercase text-red-800">{post.usuario?.nome}</h3>
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold uppercase text-red-700">{post.titulo}</h4>
          <p className="text-red-600">{post.texto}</p>
          <p className="text-red-500">Tema: {post.tema?.descricao}</p>
          <p className="text-red-500">
            Data:{' '}
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: 'full',
              timeStyle: 'medium',
            }).format(new Date(post.data))}
          </p>
        </div>
      </div>
      <div className="flex">
        <Link
          to={`/editarPostagem/${post.id}`}
          className="w-full text-white bg-red-400 hover:bg-red-600 flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarPostagem/${post.id}`}
          className="text-white bg-red-500 hover:bg-red-700 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardPostagem;

import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { toastAlerta } from '../../util/toastAlerta'
import { useContext } from 'react'

function Navbar() {
  let navigate = useNavigate()

  const { usuario, handleLogout } = useContext(AuthContext)

  function logout() {

    handleLogout()
    toastAlerta('Usuário deslogado com sucesso','sucesso')
    navigate('/login')
}
  
  let navbarComponent

  if(usuario.token !== "") {
    navbarComponent = (
      <div className="w-full bg-gray-800 text-white flex justify-center py-4 bg-cover bg-center" style={{ backgroundImage: `url(${homeLogo})` }}>
        <div className="container flex flex-col md:flex-row items-center justify-between text-lg px-4">
          {/* Logo/Título */}
          <div className="text-2xl font-bold uppercase mb-2 md:mb-0">
            Blog Pessoal
          </div>

          {/* Links de Navegação */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/home" className="hover:underline">Home</Link>
            <Link to="/postagens" className="hover:underline">Postagens</Link>
            <Link to="/temas" className="hover:underline">Temas</Link>
            <Link to="/cadastroTema" className="hover:underline">Cadastrar tema</Link>
            <Link to="/perfil" className="hover:underline">Perfil</Link>
            <Link to="" onClick={logout} className="hover:underline">Sair</Link>
          </div>
       </div>
    </div>
       )
      } 
  return (
    <>
       {navbarComponent}
    </>
  )
}

export default Navbar
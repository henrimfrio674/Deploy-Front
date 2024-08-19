import './Home.css';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';


function Home() {
    return (
        <>
<div className="relative bg-indigo-900 flex justify-center items-center min-h-screen bg-cover bg-center" >
  <div className="absolute inset-0 bg-black opacity-50"></div> {/* Sobreposição escura */}
  <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-white">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      {/* Coluna de Texto */}
      <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Seja bem-vinde!</h2>
        <p className="text-base sm:text-lg md:text-xl">Expresse aqui seus pensamentos e opiniões</p>
        <div className="flex justify-center md:justify-start">
          <ModalPostagem />
          <button className="rounded bg-white text-blue-800 py-2 px-4 sm:py-2.5 sm:px-6 text-sm sm:text-base hover:bg-gray-200 transition">
            Ver postagens
          </button>
        </div>
      </div>

      
      <div className="flex items-center justify-center">
        <img src={homeLogo} alt="Logo" className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" />
      </div>
    </div>
  </div>
</div>

        
      </>
    );
}

export default Home;
// npm list
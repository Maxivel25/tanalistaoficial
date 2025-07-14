export default function HomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-white text-center">
      {/* Logo corrigido via /public */}
      <img
        src="/logotipo-tanalista.png"
        alt="Tá na Lista Logo"
        className="w-28 h-auto mb-6 drop-shadow"
      />

      {/* Título e subtítulo */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
        Listas de Compras
      </h1>
      <p className="text-gray-600 mb-8">
        Organize suas compras com facilidade
      </p>

      {/* Seção de “nenhuma lista ainda” */}
      <div className="flex flex-col items-center space-y-2">
        <img
          src="https://em-content.zobj.net/source/apple/391/package_1f4e6.png"
          alt="Nenhuma lista"
          className="w-10 h-10"
        />
        <p className="text-gray-700">Nenhuma lista ainda</p>
        <p className="text-sm text-gray-500">
          Crie sua primeira lista de compras para começar
        </p>

        {/* Botão de ação */}
        <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition-all duration-200">
          Criar minha primeira lista
        </button>
      </div>
    </div>
  );
}

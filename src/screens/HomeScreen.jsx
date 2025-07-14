import { motion } from "framer-motion";

export default function HomeScreen() {
  return (
    <div className="px-4 py-8 flex flex-col items-center text-center min-h-screen justify-center">
      <motion.img
        src="/logotipo-tanalista.png"
        alt="Logo Tá na Lista"
        className="w-24 h-auto mb-4 drop-shadow-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
      />

      <motion.h1
        className="text-2xl font-bold text-white"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Listas de Compras
      </motion.h1>

      <motion.p
        className="text-white/80 mt-1"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Organize suas compras com facilidade
      </motion.p>

      <motion.div
        className="mt-10 flex flex-col items-center text-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-4xl mb-2">📦</div>
        <p className="font-semibold">Nenhuma lista ainda</p>
        <p className="text-sm mb-3">Crie sua primeira lista de compras para começar</p>
        <button
          className="px-6 py-2 bg-white text-purple-700 rounded-full shadow hover:bg-gray-100 transition"
        >
          Criar minha primeira lista
        </button>
      </motion.div>
    </div>
  );
}

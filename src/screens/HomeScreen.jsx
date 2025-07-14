import { useState } from 'react';
import { motion } from 'framer-motion';
import CreateListModal from '../components/CreateListModal';
import BottomNavigation from '../components/BottomNavigation';
import Logo from '../assets/logo-tanalista.png';

export default function HomeScreen({ lists, onCreateList, onDeleteList }) {
  const [showModal, setShowModal] = useState(false);

  const handleCreateList = (name) => {
    const listId = onCreateList(name);
    setShowModal(false);
    // Navegação será feita automaticamente pela rota principal
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-br from-purple-600 to-indigo-600 px-4 py-8 text-center">
      <div className="flex flex-col items-center">
        <motion.img
          src={Logo}
          alt="Tá na Lista Logo"
          className="w-24 h-auto mb-4 drop-shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        />

        <motion.h1
          className="text-2xl font-bold text-white"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Listas de Compras
        </motion.h1>

        <motion.p
          className="text-white/80 mb-8"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Organize suas compras com facilidade
        </motion.p>

        {lists.length === 0 ? (
          <motion.div
            className="text-white mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <img
              src="https://em-content.zobj.net/source/apple/391/package_1f4e6.png"
              alt="Nenhuma lista"
              className="w-12 h-12 mx-auto mb-2"
            />
            <p className="text-lg">Nenhuma lista ainda</p>
            <p className="text-sm text-white/70 mb-4">
              Crie sua primeira lista de compras para começar
            </p>

            <button
              className="px-6 py-2 bg-white text-purple-700 font-semibold rounded-full shadow hover:bg-purple-50 transition"
              onClick={() => setShowModal(true)}
            >
              Criar minha primeira lista
            </button>
          </motion.div>
        ) : null}
      </div>

      <BottomNavigation currentScreen="home" />

      <CreateListModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateList}
      />
    </div>
  );
}

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import BottomNavigation from '../components/BottomNavigation';

const { FiArrowLeft, FiRefreshCw, FiMoon, FiInfo, FiTrash2 } = FiIcons;

const SettingsScreen = () => {
  const navigate = useNavigate();

  const handleResetApp = () => {
    if (confirm('Tem certeza que deseja apagar todos os dados e começar do zero?')) {
      localStorage.clear();
      location.reload();
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white pb-20"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Cabeçalho */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => navigate('/')}
              className="p-2 text-white hover:bg-white/20 rounded-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SafeIcon icon={FiArrowLeft} className="text-xl" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold">Configurações</h1>
              <p className="text-white/80 text-sm">Ajuste sua experiência</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-4 py-6 space-y-6">
        <div className="bg-white/10 p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Preferências</h2>
          <div className="flex items-center justify-between py-2">
            <span className="text-white">Modo escuro</span>
            <button className="p-2 bg-white/20 rounded-xl">
              <SafeIcon icon={FiMoon} className="text-white" />
            </button>
          </div>
        </div>

        <div className="bg-white/10 p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Sobre o App</h2>
          <div className="flex items-center justify-between py-2">
            <span className="text-white">Versão</span>
            <span className="text-white/80">1.0.0</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-white">Ajuda & Suporte</span>
            <button className="p-2 bg-white/20 rounded-xl">
              <SafeIcon icon={FiInfo} className="text-white" />
            </button>
          </div>
        </div>

        <div className="bg-red-500/20 p-4 rounded-2xl shadow-md border border-red-400">
          <h2 className="text-lg font-semibold mb-2 text-red-200">Ações Avançadas</h2>
          <button
            onClick={handleResetApp}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl w-full"
          >
            <SafeIcon icon={FiTrash2} />
            Resetar aplicativo
          </button>
        </div>
      </div>

      <BottomNavigation currentScreen="Configurações" />
    </motion.div>
  );
};

export default SettingsScreen;

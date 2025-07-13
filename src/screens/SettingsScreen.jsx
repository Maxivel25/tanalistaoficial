import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import BottomNavigation from '../components/BottomNavigation';

const { FiArrowLeft, FiBell, FiInfo } = FiIcons;

const SettingsScreen = ({ settings, onUpdateSettings }) => {
  const navigate = useNavigate();

  const toggleNotifications = () => {
    onUpdateSettings({
      ...settings,
      weeklyNotifications: !settings.weeklyNotifications
    });
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 pb-20"
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
              <h1 className="text-xl font-bold text-white">Configurações</h1>
              <p className="text-white/80 text-sm">Personalize sua experiência</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-4 py-6">
        <div className="space-y-4">
          {/* Notificações */}
          <motion.div
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <SafeIcon icon={FiBell} className="text-blue-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Lembretes Semanais</h3>
                  <p className="text-gray-600 text-sm">Seja lembrado de revisar suas listas</p>
                </div>
              </div>
              
              <motion.button
                onClick={toggleNotifications}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.weeklyNotifications ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{
                    x: settings.weeklyNotifications ? 26 : 2
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </motion.div>

          {/* Sobre o App */}
          <motion.div
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-xl">
                <SafeIcon icon={FiInfo} className="text-green-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Sobre o Tá na Lista!</h3>
                <p className="text-gray-600 text-sm">Versão 1.0.0</p>
                <p className="text-gray-500 text-xs mt-1">
                  Organizador de listas de compras simples e funcional
                </p>
              </div>
            </div>
          </motion.div>

          {/* Funcionalidades */}
          <motion.div
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold text-gray-800 mb-3">Funcionalidades</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">Crie múltiplas listas de compras</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">Adicione itens com quantidades</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">Marque itens como comprados</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">Veja e duplique listas do histórico</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">Funciona offline</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navegação Inferior */}
      <BottomNavigation currentScreen="config" />
    </motion.div>
  );
};

export default SettingsScreen;

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import BottomNavigation from '../components/BottomNavigation';

const { FiArrowLeft, FiCopy, FiClock, FiPackage } = FiIcons;

const HistoryScreen = ({ history, onDuplicate }) => {
  const navigate = useNavigate();

  const handleDuplicate = (historyItem) => {
    const newListId = onDuplicate(historyItem);
    navigate(`/list/${newListId}`);
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
              <h1 className="text-xl font-bold text-white">Histórico</h1>
              <p className="text-white/80 text-sm">Suas listas de compras anteriores</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-4 py-6">
        {history.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <SafeIcon icon={FiClock} className="text-6xl text-white/60 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Nenhum histórico ainda</h3>
            <p className="text-white/80">Listas apagadas aparecerão aqui</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.deletedAt}`}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-2 rounded-xl">
                        <SafeIcon icon={FiPackage} className="text-gray-600 text-lg" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                        <p className="text-gray-600 text-sm">
                          {item.items.length} item(s) • Apagada em {format(new Date(item.deletedAt), 'dd/MM/yyyy')}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Criada em {format(new Date(item.createdAt), 'dd/MM/yyyy')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => handleDuplicate(item)}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SafeIcon icon={FiCopy} className="text-sm" />
                    <span className="text-sm font-medium">Duplicar</span>
                  </motion.button>
                </div>
                
                {/* Prévia dos Itens */}
                {item.items.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-gray-600 text-sm font-medium mb-2">Itens:</p>
                    <div className="space-y-1">
                      {item.items.slice(0, 3).map((listItem) => (
                        <div key={listItem.id} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-gray-700 text-sm">
                            {listItem.name}
                            {listItem.quantity && ` (${listItem.quantity})`}
                          </span>
                        </div>
                      ))}
                      {item.items.length > 3 && (
                        <p className="text-gray-500 text-xs ml-4">
                          +{item.items.length - 3} item(ns) a mais
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Navegação Inferior */}
      <BottomNavigation currentScreen="Histórico" />
    </motion.div>
  );
};

export default HistoryScreen;

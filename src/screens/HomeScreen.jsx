import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import CreateListModal from '../components/CreateListModal';
import BottomNavigation from '../components/BottomNavigation';

const { FiPlus, FiShoppingCart, FiTrash2, FiPackage } = FiIcons;

const HomeScreen = ({ lists, onCreateList, onDeleteList }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const handleCreateList = (name) => {
    const listId = onCreateList(name);
    setShowCreateModal(false);
    navigate(`/list/${listId}`);
  };

  const getItemCount = (list) => {
    return list.items.length;
  };

  const getPurchasedCount = (list) => {
    return list.items.filter(item => item.purchased).length;
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Cabeçalho */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="px-4 py-6">
          <motion.h1 
            className="text-2xl font-bold text-white text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Listas de Compras
          </motion.h1>
          <motion.p 
            className="text-white/80 text-center mt-1"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Organize suas compras com facilidade
          </motion.p>
        </div>
      </div>

      {/* Container das Listas */}
      <div className="px-4 py-6">
        {lists.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <SafeIcon icon={FiPackage} className="text-6xl text-white/60 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Nenhuma lista ainda</h3>
            <p className="text-white/80 mb-6">Crie sua primeira lista de compras para começar</p>
            <motion.button
              onClick={() => setShowCreateModal(true)}
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Criar minha primeira lista
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {lists.map((list, index) => (
              <motion.div
                key={list.id}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => navigate(`/list/${list.id}`)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-xl">
                        <SafeIcon icon={FiShoppingCart} className="text-blue-600 text-lg" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{list.name}</h3>
                        <p className="text-gray-600 text-sm">
                          {getItemCount(list)} itens • {getPurchasedCount(list)} concluídos
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteList(list.id);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SafeIcon icon={FiTrash2} className="text-lg" />
                  </motion.button>
                </div>
                
                {/* Barra de Progresso */}
                {getItemCount(list) > 0 && (
                  <div className="mt-3">
                    <div className="bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-green-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${(getPurchasedCount(list) / getItemCount(list)) * 100}%` 
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Botão flutuante de adicionar lista */}
      <motion.button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-24 right-4 bg-white text-blue-600 p-4 rounded-full shadow-2xl border-2 border-blue-100"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <SafeIcon icon={FiPlus} className="text-2xl" />
      </motion.button>

      {/* Modal de criação de lista */}
      <CreateListModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateList}
      />

      {/* Navegação inferior */}
      <BottomNavigation currentScreen="home" />
    </motion.div>
  );
};

export default HomeScreen;

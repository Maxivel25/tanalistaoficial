import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import BottomNavigation from '../components/BottomNavigation';

const { FiArrowLeft, FiTrash2, FiCheckCircle, FiCircle } = FiIcons;

const ListScreen = ({ lists, onAddItem, onToggleItem, onDeleteItem }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const list = lists.find((l) => l.id === id);

  const [newItem, setNewItem] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      onAddItem(id, newItem.trim(), quantity.trim());
      setNewItem('');
      setQuantity('');
    }
  };

  if (!list) {
    return (
      <div className="p-6 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Lista não encontrada</h2>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white text-blue-600 rounded-xl shadow font-semibold"
        >
          Voltar para Início
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
              <h1 className="text-xl font-bold text-white">{list.name}</h1>
              <p className="text-white/80 text-sm">{list.items.length} itens na lista</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário de novo item */}
      <div className="px-4 py-6 space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Nome do item"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Qtd."
            className="w-24 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <motion.button
            onClick={handleAdd}
            className="bg-white text-blue-600 px-4 py-3 rounded-xl font-semibold shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Adicionar
          </motion.button>
        </div>

        {/* Lista de Itens */}
        <div className="space-y-3">
          {list.items.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white/90 backdrop-blur-lg p-4 rounded-2xl flex justify-between items-center border border-white/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-3 flex-1">
                <button
                  onClick={() => onToggleItem(id, item.id)}
                  className="text-blue-600"
                >
                  <SafeIcon
                    icon={item.purchased ? FiCheckCircle : FiCircle}
                    className="text-xl"
                  />
                </button>
                <div>
                  <p
                    className={`font-medium text-gray-800 ${
                      item.purchased ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {item.name}
                  </p>
                  {item.quantity && (
                    <p className="text-gray-500 text-sm">Qtd: {item.quantity}</p>
                  )}
                </div>
              </div>
              <motion.button
                onClick={() => onDeleteItem(id, item.id)}
                className="text-red-500 p-2 hover:bg-red-100 rounded-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <SafeIcon icon={FiTrash2} className="text-lg" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navegação Inferior */}
      <BottomNavigation currentScreen="lista" />
    </motion.div>
  );
};

export default ListScreen;

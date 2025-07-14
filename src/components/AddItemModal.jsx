import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { FiX, FiPlusCircle } from 'react-icons/fi';

const AddItemModal = ({ isOpen, onClose, onAdd }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAdd = () => {
    if (itemName.trim()) {
      onAdd({ name: itemName.trim(), quantity });
      setItemName('');
      setQuantity('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-lg p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              onClick={onClose}
            >
              <SafeIcon icon={FiX} className="text-xl" />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Item</h2>

            <div className="space-y-4">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Nome do item"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />

              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Quantidade (opcional)"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <button
                onClick={handleAdd}
                className="w-full bg-purple-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition"
              >
                <SafeIcon icon={FiPlusCircle} className="text-lg" />
                Adicionar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddItemModal;

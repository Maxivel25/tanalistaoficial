import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const CreateListModal = ({ isOpen, onClose, onCreate }) => {
  const [listName, setListName] = useState('');

  const handleCreate = () => {
    if (listName.trim()) {
      onCreate(listName.trim());
      setListName('');
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

            <h2 className="text-lg font-semibold text-gray-800 mb-4">Criar Nova Lista</h2>

            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Nome da lista"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              autoFocus
            />

            <button
              onClick={handleCreate}
              className="w-full bg-purple-600 text-white py-2 mt-4 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition"
            >
              <SafeIcon icon={FiPlus} className="text-lg" />
              Criar Lista
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateListModal;

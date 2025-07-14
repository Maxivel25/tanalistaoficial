import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const ListEditor = ({ onAdd }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      onAdd(trimmed);
      setInput('');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow border border-gray-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Adicionar item"
        className="flex-1 bg-transparent outline-none text-gray-800 text-sm placeholder-gray-400"
      />
      <button
        type="submit"
        className="text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition"
      >
        <SafeIcon icon={FiPlus} className="text-lg" />
      </button>
    </motion.form>
  );
};

export default ListEditor;

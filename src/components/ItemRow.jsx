import React from 'react';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2, FiCheckSquare, FiSquare } from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const ItemRow = ({ item, onToggle, onEdit, onDelete }) => {
  // Verificação extra de segurança para item.id
  const itemId = item?.id;
  const itemName = item?.name || 'Item';

  return (
    <motion.div
      className="flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-200 mb-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      layout
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(itemId)}
          className="text-blue-500 hover:text-blue-700"
        >
          <SafeIcon
            icon={item.checked ? FiCheckSquare : FiSquare}
            className="text-xl"
          />
        </button>
        <div className="text-gray-800">
          <p
            className={`font-medium ${item.checked ? 'line-through text-gray-500' : ''}`}
          >
            {itemName}
            {item.quantity ? ` (${item.quantity})` : ''}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onEdit(item)}
          className="text-gray-500 hover:text-blue-500"
        >
          <SafeIcon icon={FiEdit} className="text-lg" />
        </button>
        <button
          onClick={() => onDelete(itemId)}
          className="text-gray-400 hover:text-red-500"
        >
          <SafeIcon icon={FiTrash2} className="text-lg" />
        </button>
      </div>
    </motion.div>
  );
};

export default ItemRow;

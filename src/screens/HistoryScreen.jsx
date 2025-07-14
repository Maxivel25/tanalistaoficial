import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrash2, FiCheckCircle, FiCircle } = FiIcons;

const ListScreen = ({ lists }) => {
  const { id } = useParams();
  const list = lists.find((l) => l.id === id);

  const [items, setItems] = useState(list ? list.items : []);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    const updatedItems = [...items, { name: newItem.trim(), purchased: false }];
    setItems(updatedItems);
    setNewItem('');
    list.items = updatedItems;
    localStorage.setItem('shoppingLists', JSON.stringify(lists));
  };

  const toggleItem = (index) => {
    const updatedItems = [...items];
    updatedItems[index].purchased = !updatedItems[index].purchased;
    setItems(updatedItems);
    list.items = updatedItems;
    localStorage.setItem('shoppingLists', JSON.stringify(lists));
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    list.items = updatedItems;
    localStorage.setItem('shoppingLists', JSON.stringify(lists));
  };

  if (!list) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Lista não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">{list.name}</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-lg"
          placeholder="Novo item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
        />
        <button
          onClick={handleAddItem}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Adicionar
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhum item na lista ainda.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-white p-3 rounded-xl shadow border"
            >
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => toggleItem(index)}
              >
                <SafeIcon
                  icon={item.purchased ? FiCheckCircle : FiCircle}
                  className={`text-lg ${item.purchased ? 'text-green-500' : 'text-gray-400'}`}
                />
                <span className={`text-gray-800 ${item.purchased ? 'line-through text-gray-400' : ''}`}>
                  {item.name}
                </span>
              </div>
              <button
                onClick={() => deleteItem(index)}
                className="text-red-500 hover:text-red-700"
              >
                <SafeIcon icon={FiTrash2} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListScreen;

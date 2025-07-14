import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const tabs = [
  {
    name: 'Início',
    path: '/',
    icon: FiIcons.FiHome,
  },
  {
    name: 'Histórico',
    path: '/history',
    icon: FiIcons.FiClock,
  },
  {
    name: 'Configurações',
    path: '/settings',
    icon: FiIcons.FiSettings,
  },
];

const BottomNavigation = ({ currentScreen }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50">
      <div className="flex justify-around py-2">
        {tabs.map((tab) => {
          const isActive = tab.name === currentScreen;
          return (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center text-xs px-3 py-1 transition duration-150 ease-in-out ${
                isActive ? 'text-purple-600 font-semibold' : 'text-gray-500 hover:text-purple-600'
              }`}
            >
              <SafeIcon icon={tab.icon} className="text-lg mb-1" />
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;

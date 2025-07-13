import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiClock, FiSettings } = FiIcons;

const BottomNavigation = ({ currentScreen }) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: FiHome, label: 'Início', path: '/' },
    { icon: FiClock, label: 'Histórico', path: '/history' },
    { icon: FiSettings, label: 'Configurações', path: '/settings' },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-lg border-t border-white/20 z-50">
      <div className="flex justify-around py-3">
        {navItems.map((item) => {
          const isActive =
            (currentScreen === 'home' && item.path === '/') ||
            (currentScreen === 'Histórico' && item.path === '/history') ||
            (currentScreen === 'settings' && item.path === '/settings');

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center text-sm font-medium transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <SafeIcon icon={item.icon} className="text-xl mb-1" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;

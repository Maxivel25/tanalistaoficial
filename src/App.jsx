import AppRoutes from './AppRouter';
import { useState, useEffect } from 'react';

const App = () => {
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem('shoppingLists');
    return savedLists ? JSON.parse(savedLists) : [];
  });

  useEffect(() => {
    localStorage.setItem('shoppingLists', JSON.stringify(lists));
  }, [lists]);

  const handleCreateList = (name) => {
    if (!name || name.trim() === '') return;
    const newList = {
      id: Date.now().toString(),
      name: name.trim(),
      items: [],
    };
    setLists((prevLists) => [...prevLists, newList]);
    return newList.id;
  };

  const handleDeleteList = (id) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
  };

  return (
    <AppRoutes
      lists={lists}
      onCreateList={handleCreateList}
      onDeleteList={handleDeleteList}
    />
  );
};

export default App;

import React, { useState, useEffect, useContext, useCallback, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, List, CheckSquare, ChevronLeft, History as HistoryIcon, RotateCcw, Settings, Home, Sun, Moon, X, Pencil } from 'lucide-react';

// --- FUNÇÃO AUXILIAR PARA TOCAR SONS ---
const playSound = (soundName) => {
  try {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.volume = 0.7;
    audio.play();
  } catch (error) {
    console.error(`Não foi possível tocar o som: ${soundName}`, error);
  }
};

// --- 1. CONTEXTO (O "GERENTE" DE DADOS, TEMA E USUÁRIO) ---
const AppStateContext = createContext();

export const useAppState = () => {
  return useContext(AppStateContext);
};

export const AppStateProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem('appTheme') || 'light');
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');

  useEffect(() => {
    try {
      const storedLists = JSON.parse(localStorage.getItem('shoppingLists')) || [];
      const storedHistory = JSON.parse(localStorage.getItem('shoppingHistory')) || [];
      setLists(storedLists);
      setHistory(storedHistory);
    } catch (error) { console.error("Falha ao ler dados do localStorage", error); }
  }, []);

  useEffect(() => { localStorage.setItem('shoppingLists', JSON.stringify(lists)); }, [lists]);
  useEffect(() => { localStorage.setItem('shoppingHistory', JSON.stringify(history)); }, [history]);
  useEffect(() => { localStorage.setItem('userName', userName); }, [userName]);
  
   useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    playSound('click');
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);
  
  const updateListName = useCallback((listId, newName) => {
    setLists(prev => prev.map(list => list.id === listId ? { ...list, name: newName } : list));
    playSound('confirm');
  }, []);

  const updateItem = useCallback((listId, itemId, newName, newQty) => {
    setLists(prev => prev.map(list => list.id === listId ? { ...list, items: list.items.map(item => item.id === itemId ? { ...item, name: newName, qty: newQty } : item) } : list));
    playSound('confirm');
  }, []);

  const addList = useCallback((name) => {
    const newList = { id: uuidv4(), name, items: [] };
    setLists(prev => [newList, ...prev]);
    playSound('success');
  }, []);

  const deleteList = useCallback((id) => {
    playSound('delete');
    setLists(prev => {
        const listToDelete = prev.find(list => list.id === id);
        if (listToDelete) { setHistory(h => [listToDelete, ...h]); }
        return prev.filter(list => list.id !== id);
    });
  }, [lists]);

  const duplicateList = useCallback((id) => {
    const listToDuplicate = history.find(list => list.id === id);
    if (listToDuplicate) {
      const newList = { ...listToDuplicate, id: uuidv4(), name: `${listToDuplicate.name} (Cópia)` };
      setLists(prev => [newList, ...prev]);
      playSound('confirm');
    }
  }, [history]);

  const addItemToList = useCallback((listId, itemName, itemQty) => {
    const newItem = { id: uuidv4(), name: itemName, qty: itemQty, completed: false };
    setLists(prev => prev.map(list => list.id === listId ? { ...list, items: [...list.items, newItem] } : list));
    playSound('success');
  }, []);

  const toggleItemCompletion = useCallback((listId, itemId) => {
    playSound('click');
    setLists(prev => prev.map(list => list.id === listId ? { ...list, items: list.items.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item) } : list));
  }, []);

  const deleteItemFromList = useCallback((listId, itemId) => {
    playSound('delete');
    setLists(prev => prev.map(list => list.id === listId ? { ...list, items: list.items.filter(item => item.id !== itemId) } : list));
  }, []);

  const getListById = useCallback((id) => { return lists.find(list => list.id === id); }, [lists]);

  const clearAllData = useCallback(() => {
    playSound('delete');
    setLists([]);
    setHistory([]);
    setUserName('');
  }, []);

  const value = { userName, setUserName, lists, history, theme, toggleTheme, addList, deleteList, duplicateList, addItemToList, toggleItemCompletion, deleteItemFromList, getListById, clearAllData, updateListName, updateItem };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};


// --- 2. COMPONENTES REUTILIZÁVEIS ---

function CreateListModal({ onClose }) {
  const [listName, setListName] = useState('');
  const { addList } = useAppState();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName.trim()) { addList(listName.trim()); onClose(); }
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl max-w-sm w-full relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" aria-label="Fechar modal"><X size={24} /></button>
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white">Criar Nova Lista</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={listName} onChange={(e) => setListName(e.target.value)} placeholder="Ex: Compras do Mês" className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg mb-4 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none" autoFocus />
          <button type="submit" className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all duration-300 transform active:scale-95">Criar Lista</button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function AddItemModal({ listId, onClose }) {
  const { addItemToList } = useAppState();
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const commonItems = ['Leite', 'Pão', 'Ovos', 'Manteiga', 'Queijo', 'Frango', 'Arroz', 'Feijão', 'Café'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addItemToList(listId, name.trim(), qty.trim());
      onClose();
    }
  };
  
  const addCommonItem = (item) => {
      addItemToList(listId, item, '1');
      onClose();
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl max-w-sm w-full relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" aria-label="Fechar modal"><X size={24} /></button>
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white">Adicionar Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Nome do Item *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Café" className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none" autoFocus />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Quantidade (opcional)</label>
            <input type="text" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="Ex: 2 caixas, 1kg" className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none" />
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">Itens Comuns</h3>
            <div className="flex flex-wrap gap-2">
                {commonItems.map(item => (
                    <button key={item} type="button" onClick={() => addCommonItem(item)} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full text-sm hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
                        {item}
                    </button>
                ))}
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all duration-300 transform active:scale-95">Adicionar na Lista</button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function EditItemModal({ item, listId, onClose }) {
  const { updateItem } = useAppState();
  const [name, setName] = useState(item.name);
  const [qty, setQty] = useState(item.qty || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) { updateItem(listId, item.id, name.trim(), qty.trim()); onClose(); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl max-w-sm w-full relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" aria-label="Fechar modal"><X size={24} /></button>
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white">Editar Item</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Nome do Item *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none" autoFocus />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Quantidade (opcional)</label>
              <input type="text" value={qty} onChange={(e) => setQty(e.target.value)} className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none" />
            </div>
          <button type="submit" className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all duration-300 transform active:scale-95">Salvar Alterações</button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function BottomNavigation() {
    const location = useLocation();
    const navItems = [
        { path: '/', icon: Home, label: 'Início' },
        { path: '/historico', icon: HistoryIcon, label: 'Histórico' },
        { path: '/configuracoes', icon: Settings, label: 'Ajustes' },
    ];
    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 shadow-t-xl">
            <nav className="h-full flex justify-around items-center">
                {navItems.map(item => {
                    const isActive = location.pathname === item.path;
                    return (<Link to={item.path} key={item.label} onClick={() => playSound('click')} className={`flex flex-col items-center justify-center gap-1 w-20 transition-colors duration-200 ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-slate-500 dark:text-slate-400 hover:text-purple-500'}`}>
                            <item.icon size={24} />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>)
                })}
            </nav>
        </div>
    )
}

const SettingsCard = ({ title, description, children }) => (
  <motion.div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-6 transition-colors duration-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{title}</h2>
    {description && <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{description}</p>}
    {children}
  </motion.div>
);

const ThemeToggleSwitch = ({ theme, onToggle }) => {
  const spring = { type: "spring", stiffness: 700, damping: 30 };
  return (
    <div onClick={onToggle} className={`flex items-center w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${theme === 'light' ? 'bg-purple-500 justify-start' : 'bg-slate-700 justify-end'}`}>
      <motion.div className="w-6 h-6 bg-white rounded-full flex items-center justify-center" layout transition={spring}>
        {theme === 'light' ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} className="text-purple-400" />}
      </motion.div>
    </div>
  );
};

const Greeting = () => {
    const { userName } = useAppState();
    const [greeting, setGreeting] = useState('');
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 5) setGreeting('Boa madrugada');
        else if (hour < 12) setGreeting('Bom dia');
        else if (hour < 18) setGreeting('Boa tarde');
        else setGreeting('Boa noite');
    }, []);
    if (!userName) return null;
    return (<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="px-4 text-center mb-6">
            <p className="text-lg text-slate-600 dark:text-slate-300">{greeting}, <span className="font-bold text-purple-600 dark:text-purple-400">{userName}</span>!</p>
        </motion.div>);
};


// --- 3. TELAS DO APLICATIVO ---

function HomeScreen() {
  const { lists, deleteList } = useAppState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="w-full">
      <header className="flex justify-center items-center pt-12 pb-6">
        <motion.img src="/logotipo-tanalista.png" alt="Tá na Lista! Logo" className="w-40 h-auto" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}/>
      </header>
      <Greeting />
      <main className="px-4 pb-24">
        <AnimatePresence>
          {lists.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center mt-8 p-8 bg-white dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700">
              <List size={48} className="mx-auto text-slate-400 dark:text-slate-500 mb-4" />
              <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Sua lista está vazia</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Clique no botão <span className="font-bold text-purple-500">+</span> para começar.</p>
            </motion.div>
          ) : (
            <motion.ul className="space-y-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
              {lists.map((list) => {
                const totalItems = list.items.length;
                const completedItems = list.items.filter(item => item.completed).length;
                return (
                  <motion.li key={list.id} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} exit={{ x: "-100%", opacity: 0, transition: { duration: 0.3 } }} layout className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="p-5 flex justify-between items-center">
                      <Link to={`/list/${list.id}`} className="flex-grow pr-4">
                        <h3 className="font-bold text-lg text-purple-700 dark:text-purple-400 truncate">{list.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1"><CheckSquare size={14} /><span>{completedItems} / {totalItems} itens</span></div>
                      </Link>
                      <button onClick={() => deleteList(list.id)} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500 transition-colors" aria-label="Apagar lista"><Trash2 size={20} /></button>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </main>
      <button onClick={() => { playSound('click'); setIsModalOpen(true); }} className="fixed bottom-24 right-6 bg-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg hover:bg-purple-700 transition-transform transform active:scale-90" aria-label="Criar nova lista"><Plus size={32} /></button>
      <AnimatePresence>{isModalOpen && <CreateListModal onClose={() => setIsModalOpen(false)} />}</AnimatePresence>
    </div>
  );
}

function ListScreen() {
  const { listId } = useParams();
  const { getListById, addItemToList, toggleItemCompletion, deleteItemFromList, lists, updateListName } = useAppState();
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditingListName, setIsEditingListName] = useState(false);
  const [listNameInput, setListNameInput] = useState("");
  const list = getListById(listId);

  useEffect(() => {
    if(list) { setListNameInput(list.name); }
  }, [list]);

  const handleListNameUpdate = (e) => {
      e.preventDefault();
      if(listNameInput.trim()){ updateListName(listId, listNameInput.trim()); setIsEditingListName(false); }
  }

  if (!list) return <div className="flex items-center justify-center min-h-screen"><p>Lista não encontrada...</p></div>;

  return (
    <div className="w-full">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm p-4 flex items-center sticky top-0 z-10">
        <Link to="/" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"><ChevronLeft size={24} className="text-slate-600 dark:text-slate-300" /></Link>
        {isEditingListName ? (
            <form onSubmit={handleListNameUpdate} className="flex-grow flex mx-2">
                <input type="text" value={listNameInput} onChange={(e) => setListNameInput(e.target.value)} onBlur={handleListNameUpdate} className="w-full text-xl font-bold text-center bg-transparent text-slate-800 dark:text-white focus:outline-none" autoFocus/>
            </form>
        ) : (
            <h1 className="text-xl font-bold text-center flex-grow text-slate-800 dark:text-white truncate" onClick={() => setIsEditingListName(true)}>{list.name}</h1>
        )}
        <button onClick={() => setIsEditingListName(!isEditingListName)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"><Pencil size={20} /></button>
      </header>
      <main className="px-4 py-6 pb-24">
        <AnimatePresence>
          {list.items.length > 0 ? (
            <ul className="space-y-3">
              {list.items.map((item) => (
                <motion.li key={item.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }} className={`flex items-center p-4 rounded-lg transition-all duration-300 ${item.completed ? 'bg-green-100 dark:bg-green-800/50' : 'bg-white dark:bg-slate-800 shadow-sm'}`}>
                  <input type="checkbox" checked={item.completed} onChange={() => toggleItemCompletion(list.id, item.id)} className="w-6 h-6 rounded-md border-slate-300 text-purple-600 focus:ring-purple-500 mr-4 flex-shrink-0" />
                  <div className="flex-grow">
                    <span className={`text-slate-800 dark:text-slate-200 ${item.completed && 'line-through text-slate-500'}`}>{item.name}</span>
                    {item.qty && <p className="text-xs text-slate-500 dark:text-slate-400">Qtd: {item.qty}</p>}
                  </div>
                  <button onClick={() => setEditingItem(item)} className="ml-2 p-2 text-slate-400 hover:text-blue-500" aria-label="Editar item"><Pencil size={18} /></button>
                  <button onClick={() => deleteItemFromList(list.id, item.id)} className="ml-2 p-2 text-slate-400 hover:text-red-500" aria-label="Apagar item"><Trash2 size={18} /></button>
                </motion.li>
              ))}
            </ul>
          ) : <div className="text-center py-10 text-slate-500">Nenhum item na lista. Adicione um acima!</div>}
        </AnimatePresence>
      </main>
      <button onClick={() => { playSound('click'); setIsAddItemModalOpen(true); }} className="fixed bottom-24 right-6 bg-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg hover:bg-purple-700 transition-transform transform active:scale-90" aria-label="Adicionar novo item"><Plus size={32} /></button>
      <AnimatePresence>
        {isAddItemModalOpen && <AddItemModal listId={list.id} onClose={() => setIsAddItemModalOpen(false)} />}
        {editingItem && <EditItemModal item={editingItem} listId={list.id} onClose={() => setEditingItem(null)} />}
      </AnimatePresence>
    </div>
  );
}

function HistoryScreen() {
    const { history, duplicateList } = useAppState();
    const navigate = useNavigate();
    const handleDuplicate = (id) => { duplicateList(id); navigate('/'); };
    return (
        <div className="w-full px-4 py-8 pt-20">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center justify-center gap-3 mb-8">
                <HistoryIcon size={28} className="text-purple-700 dark:text-purple-400" />
                <h1 className="text-3xl font-bold text-center text-purple-700 dark:text-purple-400">Histórico de Listas</h1>
            </motion.div>
            <main className="pb-24">
                <AnimatePresence>
                    {history.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center mt-12 p-8 bg-white/70 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700">
                            <HistoryIcon size={48} className="mx-auto text-slate-400 dark:text-slate-500 mb-4" />
                            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Histórico Vazio</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">Listas que você apagar aparecerão aqui.</p>
                        </motion.div>
                    ) : (
                        <motion.ul className="space-y-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
                            {history.map((list) => (
                                <motion.li key={list.id} layout variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} exit={{ opacity: 0, scale: 0.8 }} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-5 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-700 dark:text-slate-200">{list.name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{list.items.length} itens</p>
                                    </div>
                                    <button onClick={() => handleDuplicate(id)} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors" aria-label={`Reutilizar lista ${list.name}`}><RotateCcw size={16} />Reutilizar</button>
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

function SettingsScreen() {
    const { theme, toggleTheme, userName, setUserName, clearAllData } = useAppState();
    const [name, setName] = useState(userName);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '' });

    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    const handleNameSave = () => {
        setUserName(name);
        showToast('Nome salvo com sucesso!');
    };

    const handleConfirmReset = () => {
        clearAllData();
        setIsModalOpen(false);
        showToast('Todos os dados foram apagados.');
        setTimeout(() => window.location.reload(), 1500);
    };

    return (
        <div className="w-full px-4 py-8 pt-20 pb-24">
            <motion.h1 className="text-3xl font-bold mb-8 text-center text-purple-700 dark:text-purple-400" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                Configurações
            </motion.h1>

            <SettingsCard title="Perfil" description="Este nome será usado para a saudação inicial.">
                <div className="flex items-center gap-3">
                  <input type="text" className="flex-grow p-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu nome" />
                  <button onClick={handleNameSave} className="px-4 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all duration-300 transform active:scale-95">Salvar</button>
                </div>
            </SettingsCard>

            <SettingsCard title="Aparência" description="Escolha o visual que mais lhe agrada.">
                <div className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">Tema do Aplicativo</span>
                    <ThemeToggleSwitch theme={theme} onToggle={toggleTheme} />
                </div>
            </SettingsCard>

            <SettingsCard title="Dados do Aplicativo" description="Cuidado: esta ação não pode ser desfeita.">
                <button onClick={() => { playSound('delete'); setIsModalOpen(true); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all duration-300 transform active:scale-95">
                    <Trash2 size={18} /> Apagar Todos os Dados
                </button>
            </SettingsCard>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full mx-auto flex items-center justify-center mb-4"><Trash2 size={32} className="text-red-500" /></div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Apagar Todos os Dados?</h2>
                            <p className="text-slate-600 dark:text-slate-300 mb-6">Esta ação é irreversível.</p>
                            <div className="flex gap-4">
                                <button onClick={() => { playSound('click'); setIsModalOpen(false); }} className="w-full py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition">Cancelar</button>
                                <button onClick={handleConfirmReset} className="w-full py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition">Sim, Apagar</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {toast.show && (
                    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg">
                        <CheckSquare size={18} className="text-green-400" />
                        <span>{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


// --- 4. COMPONENTE PRINCIPAL DO APP ---
function AppContent() {
    return (
        <div className="max-w-md mx-auto h-dvh bg-white dark:bg-slate-900 font-[Poppins] flex flex-col transition-colors duration-300">
          <main className="flex-grow overflow-y-auto">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/list/:listId" element={<ListScreen />} />
              <Route path="/historico" element={<HistoryScreen />} />
              <Route path="/configuracoes" element={<SettingsScreen />} />
            </Routes>
          </main>
          <BottomNavigation />
        </div>
    )
}

export default function App() {
  return (
    <AppStateProvider>
      <Router>
        <AppContent />
      </Router>
    </AppStateProvider>
  );
}

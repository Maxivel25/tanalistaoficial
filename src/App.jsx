import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [listas, setListas] = useState([]);
  const [configuracoes, setConfiguracoes] = useState({
    notificacoesSemanais: true
  });

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('tanalista-dados');
    if (dadosSalvos) {
      const { listas, configuracoes } = JSON.parse(dadosSalvos);
      setListas(listas);
      setConfiguracoes(configuracoes);
    }
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(
      'tanalista-dados',
      JSON.stringify({ listas, configuracoes })
    );
  }, [listas, configuracoes]);

  const criarLista = (nome) => {
    const novaLista = {
      id: uuidv4(),
      name: nome,
      items: [],
      createdAt: new Date().toISOString(),
      deletedAt: null
    };
    setListas([novaLista, ...listas]);
    return novaLista.id;
  };

  const excluirLista = (id) => {
    setListas((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, deletedAt: new Date().toISOString() } : l
      )
    );
  };

  const adicionarItem = (listaId, nome, quantidade) => {
    setListas((prev) =>
      prev.map((lista) =>
        lista.id === listaId
          ? {
              ...lista,
              items: [
                ...lista.items,
                {
                  id: uuidv4(),
                  name: nome,
                  quantity: quantidade,
                  purchased: false
                }
              ]
            }
          : lista
      )
    );
  };

  const alternarItem = (listaId, itemId) => {
    setListas((prev) =>
      prev.map((lista) =>
        lista.id === listaId
          ? {
              ...lista,
              items: lista.items.map((item) =>
                item.id === itemId
                  ? { ...item, purchased: !item.purchased }
                  : item
              )
            }
          : lista
      )
    );
  };

  const deletarItem = (listaId, itemId) => {
    setListas((prev) =>
      prev.map((lista) =>
        lista.id === listaId
          ? {
              ...lista,
              items: lista.items.filter((item) => item.id !== itemId)
            }
          : lista
      )
    );
  };

  const duplicarLista = (listaOriginal) => {
    const novaLista = {
      ...listaOriginal,
      id: uuidv4(),
      name: `${listaOriginal.name} (Cópia)`,
      createdAt: new Date().toISOString(),
      deletedAt: null,
      items: listaOriginal.items.map((item) => ({
        ...item,
        id: uuidv4(),
        purchased: false
      }))
    };
    setListas([novaLista, ...listas]);
    return novaLista.id;
  };

  return (
    <Router>
      <AppRouter
        listas={listas}
        configuracoes={configuracoes}
        onCriarLista={criarLista}
        onExcluirLista={excluirLista}
        onAdicionarItem={adicionarItem}
        onAlternarItem={alternarItem}
        onDeletarItem={deletarItem}
        onDuplicarLista={duplicarLista}
        onAtualizarConfiguracoes={setConfiguracoes}
      />
    </Router>
  );
};

export default App;

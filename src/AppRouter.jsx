import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import HistoryScreen from './screens/HistoryScreen';
import SettingsScreen from './screens/SettingsScreen';

const AppRouter = ({
  listas,
  configuracoes,
  onCriarLista,
  onExcluirLista,
  onAdicionarItem,
  onAlternarItem,
  onDeletarItem,
  onDuplicarLista,
  onAtualizarConfiguracoes
}) => {
  const listasAtivas = listas.filter((l) => !l.deletedAt);
  const historico = listas.filter((l) => l.deletedAt);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeScreen
            lists={listasAtivas}
            onCreateList={onCriarLista}
            onDeleteList={onExcluirLista}
          />
        }
      />
      <Route
        path="/list/:id"
        element={
          <ListScreen
            lists={listasAtivas}
            onAddItem={onAdicionarItem}
            onToggleItem={onAlternarItem}
            onDeleteItem={onDeletarItem}
          />
        }
      />
      <Route
        path="/historico"
        element={
          <HistoryScreen
            history={historico}
            onDuplicate={onDuplicarLista}
          />
        }
      />
      <Route
        path="/configuracoes"
        element={
          <SettingsScreen
            settings={configuracoes}
            onUpdateSettings={onAtualizarConfiguracoes}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;

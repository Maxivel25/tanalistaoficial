import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import HistoryScreen from './screens/HistoryScreen';
import SettingsScreen from './screens/SettingsScreen';

const AppRoutes = ({ lists, onCreateList, onDeleteList }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomeScreen
              lists={lists}
              onCreateList={onCreateList}
              onDeleteList={onDeleteList}
            />
          }
        />
        <Route path="/list/:id" element={<ListScreen lists={lists} />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

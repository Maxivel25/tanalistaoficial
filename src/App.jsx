import AppRoutes from './AppRouter';

const mockLists = []; // exemplo, substitua por estado real
const App = () => {
  const handleCreateList = (list) => {
    // lógica de criação
  };

  const handleDeleteList = (id) => {
    // lógica de exclusão
  };

  return (
    <AppRoutes
      lists={mockLists}
      onCreateList={handleCreateList}
      onDeleteList={handleDeleteList}
    />
  );
};

export default App;

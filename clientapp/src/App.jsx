import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <>
      <Header onSearch={setSearchTerm} />
      <Home searchTerm={searchTerm} />
    </>
  );
}
export default App;

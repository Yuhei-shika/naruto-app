import { useEffect } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const apiUrl = 'http://localhost:80/character';

    const result = await axios.get(apiUrl);
    console.log(result);
  };

  return (
    <div className="App">
      <h1>Naruto App</h1>
    </div>
  );
}

export default App;

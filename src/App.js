import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const apiUrl = 'http://localhost:80/character';

    const result = await axios.get(apiUrl);
    setCharacters(result.data.characters);
    console.log(result);
  };

  return (
    <div className="container">
      <main>
        <div className="cards-container">
          {characters.map((character) => (
            <div className="card" key={character.id}>
              <img src={character.images[0] != null ? character.images[0] : 'dummy.png'}
              alt="character" 
              className='card-image'></img>
            </div>
          ))}
        </div>  
      </main>
    </div>
  );
} 

export default App;

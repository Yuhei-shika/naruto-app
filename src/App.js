import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async (page) => {
    const apiUrl = 'http://localhost:80/character';

    const result = await axios.get(apiUrl, {
      params: {
        page
      },
    });
    setCharacters(result.data.characters);
    console.log(result);
  };

  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  };

  const handlePrev = async () => {
    const prevPage = page - 1;
    await fetchCharacters(prevPage);
    setPage(prevPage);
  };

  return (
    <div className="container">
      <main>
        <div className="cards-container">
          {characters.map((character) => {
            return (
            <div className="card" key={character.id}>
              <img
                src={character.images[0] != null ? character.images[0] : 'dummy.png'}
                alt="character"
                className="card-image"
                style={
                  character.images[0] == null
                    ? { width: '3000px', height: '3000px', objectFit: 'contain' }
                    : {}
                }
              />
              <div className="card-content">
                <h3 className="card-title">{character.name}</h3>
                <p className="card-description">{character.debut != null ? character.debut.appearsIn : 'なし'}</p>
                <div className="card-footer">
                  <span className="affiliation">{character.personal != null ? character.personal.affiliation : 'なし'}</span>
                </div>
              </div>
            </div>
          );
          })}
        </div>
        <div className="pager">
          <button className="prev" onClick={handlePrev}>前へ</button>
          <span className="page-number">{page}</span>
          <button className="next" onClick={handleNext}>次へ</button>
        </div>
      </main>
    </div>
  );
} 

export default App;

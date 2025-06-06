import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
const limit = 20;

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async (page) => {
    const apiUrl = 'http://localhost:80/character';
    const limit = 800;
    setIsLoading(true);
    const result = await axios.get(apiUrl, {
      params: {
        page, limit
      },
    });
    setCharacters(result.data.characters);
    setIsLoading(false);
    console.log(result);
  };

  const handleNext = async () => {
    const nextPage = page + 1;
    const apiUrl = 'http://localhost:80/character';
    
    setIsLoading(true);
    const result = await axios.get(apiUrl, {
      params: {
        page: nextPage, limit
      },
    });
    setIsLoading(false);

    if (result.data.characters.length === 0) {
      return;
    }

    setCharacters(result.data.characters);
    setPage(nextPage);
  };

  const handlePrev = async () => {
    if (page <= 1) return;
    const prevPage = page - 1;
    await fetchCharacters(prevPage);
    setPage(prevPage);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <img src="logo.png" alt="Naruto Characters" className="logo"/> 
        </div>
      </div>
      {isLoading ? (
        <div>Now Loading...</div> 
      ) : (
      <main>
        <div className="cards-container">
          {characters.map((character) => {
            return (
            <div className="card" key={character.id}>
              <img
                src={character.images[0] != null ? character.images[0] : 'dummy.png'}
                alt="character"
                className="card-image"
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
          <button disabled={page===1}className="prev" onClick={handlePrev}>前へ</button>
          <span className="page-number">{page}</span>
          <button disabled={limit > characters.length} className="next" onClick={handleNext}>次へ</button>
          </div>
        </main>
      )}
    </div>
  );
} 

export default App;

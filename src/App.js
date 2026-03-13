import React, { useState } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';

function App() {

  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  // ✅ Correct base API URL (IMPORTANT FIX)
  const apiurl = "http://www.omdbapi.com/?apikey=635bdcab";

  // ✅ Search movies
  const search = (e) => {
    if (e.key === "Enter") {

      axios(`${apiurl}&s=${state.s}`).then(({ data }) => {

        const results = data.Search || [];   // safe handling

        setState(prevState => ({
          ...prevState,
          results: results
        }));

      });

    }
  }

  // ✅ Input handling
  const handleInput = (e) => {
    const s = e.target.value;

    setState(prevState => ({
      ...prevState,
      s: s
    }));
  }

  // ✅ Open popup with full movie details
  const openPopup = (id) => {

    axios(`${apiurl}&i=${id}`).then(({ data }) => {

      setState(prevState => ({
        ...prevState,
        selected: data
      }));

    });

  }

  // ✅ Close popup
  const closePopup = () => {
    setState(prevState => ({
      ...prevState,
      selected: {}
    }));
  }

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>

      <main>
        <Search handleInput={handleInput} search={search} />

        <Results 
          results={state.results} 
          openPopup={openPopup}
        />

        {(state.selected.Title) && (
          <Popup 
            selected={state.selected} 
            closePopup={closePopup} 
          />
        )}

      </main>
    </div>
  );
}

export default App;
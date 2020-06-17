import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data)
      setRepos(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const time = Date.now()
    const response = await api.post('repositories',{
      title: `Novo projeto ${time}`,
    })

    const newRepo = response.data
    //console.log('newRepo',newRepo)
    setRepos([...repos,newRepo])
    // TODO
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    
    setRepos(repos.filter(repo => repo.id !== id))
    // TODO
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {
          repos.map(repo => {
            return (
              <li key={repo.id} >
                {repo.title}

                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            )
          })
        }
        
      </ul>

      {/* <button onClick={handleAddRepository}>Adicionar</button> */}
    </div>
  );
}

export default App;

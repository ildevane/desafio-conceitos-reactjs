import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";
import Header from "./components/Header";


function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Novo Repositório ${Date.now()}`,
      url: 'http://github.com/...',
      techs:['Node.js', 'ReactJS'],
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`repositories/${id}`);
      setRepositories(repositories.filter(repository => repository.id !== id));
    }catch (err){
      alert('Erro ao deletar repositório, tente novamente.');
    }

  }

  return (
    
    <>
    <Header title='Repositories' />
      <ul data-testid="repository-list">
        {repositories.map(repository => 
            <li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
    
  );
}

export default App;

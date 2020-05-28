import React, { useState, useEffect } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((resp) => setRepositories(resp.data));
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post("/repositories", {
      title: `new repositorie ${Date.now()}`,
      url: "https://github.com/mesquini",
      techs: "nodejs, reactjs",
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const filterRepo = repositories.filter((repo) => repo.id !== id);

    setRepositories(filterRepo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repo) => (
            <div key={repo.id}>
              <li>
                {repo.title}
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            </div>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import api from "./services/api";
import Login from "./components/Auth/Login";
import Sidebar from "./components/Siderbar/Sidebar";
import Navbar from "./components/Siderbar/Navbar";
import Router from "./components/Router/Router";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setLoggedIn(true);
    }
  }, []);

  const handleAdd = () => setRefresh((r) => !r);

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setLoggedIn(false);
  };

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <BrowserRouter>
      <div className="flex min-h-screen ">
        {/* Sidebar na esquerda */}
        <Sidebar onAdd={handleAdd} onLogout={handleLogout} />

        {/* Área principal à direita */}
        <div className="flex flex-col flex-1">
          {/* Navbar fixa no topo do conteúdo */}
          <Navbar />

          {/* Conteúdo da página */}
          <div className="flex-1 bg-light-background p-4 overflow-y-auto">
            <Router refresh={refresh} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

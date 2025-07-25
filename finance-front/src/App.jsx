import { useState, useEffect } from "react";
import api from "./services/api";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Siderbar/Sidebar";
//import SidebarWithModal from "./components/SidebarWithModal";

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

  // const handleAdd = () => setRefresh((r) => !r);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   delete api.defaults.headers.common["Authorization"];
  //   setLoggedIn(false);
  // };

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="flex-1 min-h-screen bg-blue-200 flex items-center justify-center">
        <Dashboard refresh={refresh} />
      </div>
    </div>
    // <SidebarWithModal refresh={refresh} onAdd={handleAdd} onLogout={handleLogout}>
    //   <Dashboard refresh={refresh} />
    // </SidebarWithModal>
  );
}

export default App;

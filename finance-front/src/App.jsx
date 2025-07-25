import { useState, useEffect } from "react";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import api from "./services/api";
import Login from "./components/Login";
import Sidebar from "./components/Siderbar/Sidebar";
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

  // const handleAdd = () => setRefresh((r) => !r);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   delete api.defaults.headers.common["Authorization"];
  //   setLoggedIn(false);
  // };

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen bg-blue-200 p-4">
          {/* <Router refresh={refresh} /> */}
          <Router refresh={refresh}></Router>
        </div>
      </div>
    </BrowserRouter>
    // <RouterProvider router={Routes}>

    // </RouterProvider>

    // <SidebarWithModal refresh={refresh} onAdd={handleAdd} onLogout={handleLogout}>
    //   <Dashboard refresh={refresh} />
    // </SidebarWithModal>
  );
}

export default App;

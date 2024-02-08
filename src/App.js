import { Routes, Route } from "react-router-dom";
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import NoPage from "./pages/NoPage.js";
import Property from "./pages/Property.js";
import ListProperties from "./pages/ListProperties.js";
import Home from "./pages/Home.js";
import { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar.js";
import "./assets/App.css"

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    accountType: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (!user.id && userData) {
      setUser(userData);
    }
  }, [user?.id])

  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        { user?.id && <Navbar /> }
        <Routes>
          { user?.accountType === "owner" ? 
          <>
            <Route path="/property/:action" element={<Property />} />
            <Route path="/property/list" element={<ListProperties />}/>
          </> 
          : 
          <></>}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;

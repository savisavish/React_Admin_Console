import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./navabr/Navbar";
import Users from "./components/users/Users";
import Company from "./components/company/Company";
import Domainlist from "./components/domainlist/Domainlist";

import Footer from './footer/Footer';
import { UserProvider } from './context/AdminconsoleContext'
import Userinfo from './components/users/Userinfo';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users/userinfo" element={<Userinfo />} />
          <Route path="company" element={<Company />} />
          <Route path="domainlist" element={<Domainlist />} />
        </Routes>
      </div>
      <Outlet />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

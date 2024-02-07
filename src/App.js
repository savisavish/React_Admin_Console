import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navabr/Navbar";
import Users from "./components/users/Users";
import Company from "./components/company/Company";
import Domainlist from "./components/domainlist/Domainlist";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
          <Route path="/" element={<Users />} />
          <Route path="company" element={<Company />} />
          <Route path="domainlist" element={<Domainlist />} />
      </Routes>
    </div>
  );
}

export default App;

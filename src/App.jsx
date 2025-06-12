import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Company from "./pages/Company";

function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
         
          <Route path="/company" element={<Company />} />

      </Routes>
 
    </Router>
  );
};
export default App;
import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

import Footer from "./components/Footer"
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
         
        

      </Routes>
      <Footer />
      <ChatBot />
 
    </Router>
  );
};
export default App;
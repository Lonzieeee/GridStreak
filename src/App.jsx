import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Sustainability from "./pages/Sustainability";
import Partners from "./pages/Partners"; 
import Solutions from "./pages/Solutions";


import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Breadcrumb from "./components/Breadcrumb";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <Router>
      <Header />
      <Breadcrumb />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/partners" element={<Partners />} /> 
      </Routes>
      <BackToTop />
      <Footer />
      <ChatBot />
    </Router>
  );
}

export default App;

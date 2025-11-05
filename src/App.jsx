import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Breadcrumb from "./components/Breadcrumb";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <>
      <Header />
      <Breadcrumb />
      <main>
        <Outlet />
      </main>
      <BackToTop />
      <Footer />
      <ChatBot />
    </>
  );
}

export default App;
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import BackToTop from "./components/BackToTop";
// import AccessibilityWidget from "./components/AccessibilityWidget";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollToTop />
      <div id="navbar-scroll-sentinel" className="navbar-scroll-sentinel" aria-hidden="true" />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <BackToTop />
      <Footer />
      {/* <AccessibilityWidget /> */}
      <ChatBot />
    </>
  );
}

export default App;
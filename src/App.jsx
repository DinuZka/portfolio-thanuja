import React from "react";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Gallery from "./pages/Gallery.jsx";
import Skills from "./pages/Skills.jsx";
import Contact from "./pages/Contact.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <main>
      <Navbar />
      <Home />
      <About />
      <Gallery />
      <Skills />
      <Contact />
    </main>
  );
}

export default App;

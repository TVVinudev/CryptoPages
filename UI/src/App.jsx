import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MainLayout from "./layouts/MainLayout";
import Contact from "./pages/Contact";
import Shope from "./pages/Shope";
import ViewCard from "./pages/ViewCared";
import Selling from "./pages/Selling";

function App() {

  return (

    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shope />} />
          <Route path="/viewCard" element={<ViewCard />} />
          <Route path="/Selling" element={<Selling />} />
        </Route>

      </Routes>
    </Router>

  )
}

export default App

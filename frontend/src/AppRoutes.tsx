import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Work from './components/Work';
import Blog from './components/Blog';
import Contact from './components/Contact';
import CodeOfConduct from './components/CodeOfConduct';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/work" element={<Work />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/code-of-conduct" element={<CodeOfConduct />} />
  </Routes>
);

export default AppRoutes;

"use client";

import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import About from './Components/About/About';
import Skills from './Components/Skills/Skills';
import Experience from './Components/Experience/Experience';
import Services from './Components/Services/Services';
import Projects from './Components/Projects/Projects';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import Preloader from './Components/Preloader/Preloader';
import ToggleButton from './Components/ToggleButton/ToggleButton'; // Adjust path as needed
import './App.css';

const App = () => {
  const [theme, setTheme] = useState(() => {
    // Retrieve theme from localStorage if available, or use 'dark' as default
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2 second loading time

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // Save theme preference to localStorage
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`app ${theme}`}>
      {loading ? (
        <Preloader theme={theme}/>
      ) : (
        <>
          <Navbar theme={theme} />
          <ToggleButton theme={theme} toggleTheme={toggleTheme} />
          <Hero theme={theme} />
          <About theme={theme} />
          <Skills theme={theme} />
          <Experience theme={theme} />
          <Services theme={theme} />
          <Projects theme={theme} />
          <Contact theme={theme} />
          <Footer theme={theme} />
        </>
      )}
    </div>
  );
};

export default App;

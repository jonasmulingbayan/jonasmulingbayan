"use client";

import React from 'react';
import './ToggleButton.css';
import { MdLightMode, MdDarkMode } from "react-icons/md";

const ToggleButton = ({ theme, toggleTheme }) => {
  return (
    <button type ="button" onClick={toggleTheme} className="theme-toggle" style={{ backgroundColor: 'transparent'}}>
      {theme === 'dark' ? <MdLightMode className='toggle-icons darkmode' title = "Light Mode"/> : <MdDarkMode className='toggle-icons lightmode' title = "Dark Mode"/>}
    </button>
  );
};

export default ToggleButton;

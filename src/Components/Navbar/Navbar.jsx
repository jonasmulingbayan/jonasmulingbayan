"use client";

import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css'
import AnchorLink from 'react-anchor-link-smooth-scroll';
import menu_open from '../../assets/menu_open.svg';
import menu_close from '../../assets/menu_close.svg';
import logo from '../../assets/jonas_logo.png';
import logo_light from '../../assets/jonas-logo-1.png';

const Navbar = ({theme}) => {
  const [menu, setMenu] = useState("home");
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.style.right = "0";
  }

  const closeMenu = () => {
    menuRef.current.style.right = "-350px";
  }

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    closeMenu(); // Close the menu on item click
  }

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      const sections = document.querySelectorAll("div");
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          setMenu(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isSticky ? 'sticky' : ''} ${theme}`} >
      {/*<img src={logo} alt="" />*/}
      <img src={menu_open} alt="" className='nav-mob-open' onClick={openMenu} />
      <AnchorLink className='anchor-link' offset={50} href='#home' aria-label="Back to Home">
      <img className = "navbar-logo" src={theme === 'dark' ? logo : logo_light} alt="Jonas Isaiah P. Mulingbayan" />
      {/*<h3>
        <span id="symbols1">&#x003C;</span> JONAS MULINGBAYAN <span id="symbols2">/&#62;</span>
      </h3>*/}
      </AnchorLink>
      <ul ref={menuRef} className="nav-menu">
        <img src={menu_close} alt="" className='nav-mob-close' onClick={closeMenu} />
        <li>
          <AnchorLink className='anchor-link' offset={50} href='#home'>
            <p 
              onClick={() => handleMenuClick("home")}
              className={menu === "home" ? "active" : ""}
              style={menu === "home"  ? { color: "#ffc201" } : { color: "#fff" }
              }
            >
              HOME
            </p>
          </AnchorLink>
        </li>

        <li>
          <AnchorLink className='anchor-link' offset={50} href='#about'>
            <p 
              onClick={() => handleMenuClick("about")}
              className={menu === "about" ? "active" : ""}
              style={
                menu === "about" ? { color: "#ffc201" } : { color: "#fff" }
              }
            >
              ABOUT ME
            </p>
          </AnchorLink>
        </li>

        <li>
          <AnchorLink className='anchor-link' offset={50} href='#experience'>
            <p 
              onClick={() => handleMenuClick("experience")}
              className={menu === "experience" ? "active" : ""}
              style={menu === "experience"  ? { color: "#ffc201" } : { color: "#fff" }
              }
            >
              EXPERIENCES
            </p>
          </AnchorLink>
        </li>

        <li>
          <AnchorLink className='anchor-link' offset={50} href='#services'>
            <p
              onClick={() => handleMenuClick("services")}
              className={menu === "services" ? "active" : ""}
              style={
                menu === "services" ? { color: "#ffc201" } : { color: "#fff" }
              }
            >
              SERVICES
            </p>
          </AnchorLink>
        </li>

        <li>
          <AnchorLink className='anchor-link' offset={50} href='#projects'>
            <p
              onClick={() => handleMenuClick("projects")}
              className={menu === "projects" ? "active" : ""}
              style={
                menu === "projects" ? { color: "#ffc201" } : { color: "#fff" }
              }
            >
              PROJECTS
            </p>
          </AnchorLink>
        </li>

        <li>
          <AnchorLink className='anchor-link' offset={50} href='#contact'>
            <p
              onClick={() => handleMenuClick("contact")}
              className={
                menu === "contact" ? "active" : ""}
                style={
                  menu === "contact" ? { color: "#ffc201" } : { color: "#fff" }
                }
            >
              CONTACT
            </p>
          </AnchorLink>
        </li>
      </ul>
      {/*<div className='nav-connect'>Connect With Me</div>*/}

      {/*<button className = "mode-btn" onClick={toggleMode}>
            {isLightMode ? <FaSun className = "icons-theme"/> : <FaMoon className = "icons-theme"/>}
        </button>*/}
    </div>
  );
}

export default Navbar;

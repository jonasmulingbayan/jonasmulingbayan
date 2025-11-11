"use client";
import React, { useState, useEffect } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './Hero.css';
import profile_img from '../../assets/profile-img.png';
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { LuDownload } from "react-icons/lu";

const Hero = ({ theme }) => {
  const baseText = "I'm";
  const words = [" a Full Stack Web Developer", " a Programmer", " a WordPress Designer"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let typingTimeout;
    let wordChangeTimeout;

    if (typing) {
      typingTimeout = setTimeout(() => {
        const currentWord = words[currentWordIndex];
        setDisplayedText((prev) => {
          const nextCharIndex = prev.length - baseText.length;
          if (nextCharIndex < currentWord.length) {
            return baseText + currentWord.slice(0, nextCharIndex + 1);
          } else {
            setTyping(false);
            return prev;
          }
        });
      }, 150);
    } else {
      wordChangeTimeout = setTimeout(() => {
        setTyping(true);
        setDisplayedText(baseText);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 2000);
    }

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(wordChangeTimeout);
    };
  }, [displayedText, typing, currentWordIndex, words]);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = './jonasmulingbayan.pdf'; // This should be the relative path to your PDF in the public folder
    link.download = 'jonasmulingbayan.pdf'; // The name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="home" className={`hero ${theme}`}>
      <div className='box'>
          <div className='content'>
            <img className = 'profile-img' src={profile_img} alt="Jonas Isaiah P. Mulingbayan" />
          </div>
      </div>
      <div className='social-icons'>
        <a href="https://github.com/jonasmulingbayan" target="_blank" rel="noopener noreferrer" aria-label="Visit my github account">
          <FaGithub className='icons'/>
        </a>
        <a href="https://www.facebook.com/jonasisaiah.mulingbayan" target="_blank" rel="noopener noreferrer" aria-label="Visit my facebook account">
          <FaFacebook className='icons'/>
        </a>
        <a href="https://www.instagram.com/jonasmulingbayan/" target="_blank" rel="noopener noreferrer" aria-label="Visit my instagram account">
          <FaInstagram className='icons'/>
        </a>
        <a href="https://www.linkedin.com/in/jonas-isaiah-mulingbayan-0b0369264/" target="_blank" rel="noopener noreferrer" aria-label="Visit my linkedin account">
          <FaLinkedin className='icons'/>
        </a>
      </div>
      <p className='nameHeader'> Hello, I'm</p>
      <h1><span>Jonas Isaiah P. Mulingbayan</span></h1>
      <h2>{displayedText}<span className="cursor">|</span></h2>
      <p>I’m a Full Stack Web Developer based in Bacoor City, Cavite, Philippines, with over 2 years of experience in creating responsive, user-focused, and scalable web applications. I’m passionate about transforming ideas into seamless digital experiences through clean and efficient code.</p>
      <div className='hero-action'>
        <div className="hero-connect"><AnchorLink className='anchor-link' offset={50} href='#contact'>Connect with me</AnchorLink></div>
        <div className="hero-resume" onClick={downloadResume}>Download CV <LuDownload className='download-icon'/></div>
      </div>
    </div>
  );
};

export default Hero;

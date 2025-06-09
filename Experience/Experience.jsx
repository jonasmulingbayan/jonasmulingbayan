import React from 'react';
import './Experience.css';
import theme_patern from '../../assets/theme_pattern.svg';
import Experiences_Data from '../../assets/experiences_data'

const Experience = ({ theme }) => {
  return (
    <div id="experience" className={`experience sections ${theme}`}>
        <div className="experience-title">
            <h1>Experiences</h1>
            <img src={theme_patern} alt="pattern" />
        </div>
      <div className='experience-main-container'>
      {Experiences_Data.map((exp, index) => (
        <div className="experience-card" key={index}>
        <div className='logo-header'>
            <img src={exp.company_image} alt={exp.company} loading="lazy"/>
          <h3 className="experience-company">{exp.company}</h3>
          </div>
          <p className="experience-position">{exp.position}</p>
          <p className={`experience-details ${theme}`}>{exp.location} | {exp.date}</p>
          <ul className="experience-description">
            {exp.description.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Experience;

import React from 'react';
import skills_data from '../../assets/myskills_data'; // Update the path as necessary
import './Skills.css'; // Import the CSS file for styling

const Skills = ({ theme }) => {
  return (
    <div className={`skills-container ${theme}`}>
      <div className="skills-description">
        <h2>Featured <span className="highlight">Skills</span></h2>
        <p>Proficient in front-end web development technologies such as HTML5, CSS, and JavaScript, with a strong grasp of responsive design principles. Skilled in utilizing both Bootstrap and Tailwind CSS frameworks for building stylish and user-friendly interfaces. Familiarity with WordPress and Elementor for rapid website development and customization.</p>
        <p>Experienced in back-end development using PHP, with the ability to create robust and scalable web applications. Proficient in database management with MySQL, ensuring efficient data storage and retrieval.</p>
        <p>Knowledgeable in modern development tools like Vite for fast-paced development workflows. Competent in version control using Git for effective collaboration and project management.</p>
        <p>Currently exploring ReactJS and Laravel for building dynamic and interactive web applications.</p>
      </div>
      <div className="skills-grid">
        {skills_data.map(skill => (
          <div key={skill.s_no} className="skill-item">
            <img src={skill.s_img} alt={`skill-${skill.s_no}`} loading="lazy"/>
            <span>{skill.s_name}</span>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Skills;

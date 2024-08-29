"use client";

import React, { useState, useEffect } from 'react';
import './Projects.css';
import themePattern from '../../assets/theme_pattern.svg';
import ProjectData from '../../assets/mywork_data';
import { FaGithub, FaLink, FaInfoCircle } from "react-icons/fa";
import { FaCircleArrowLeft, FaCircleArrowRight  } from "react-icons/fa6";

const Projects = ({ theme }) => {
  const [selectedCategory, setSelectedCategory] = useState(() => localStorage.getItem('selectedCategory') || 'All');
  const [currentPage, setCurrentPage] = useState(() => parseInt(localStorage.getItem('currentPage')) || 1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalIndex, setModalIndex] = useState(0); // State to track index in modal carousel

  const projectsPerPage = 6;

  const handleFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    localStorage.setItem('selectedCategory', category);
    localStorage.setItem('currentPage', 1);
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const filteredProjects = ProjectData.filter(work =>
    selectedCategory === 'All' || work.w_category === selectedCategory
  ).slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(
    ProjectData.filter(work => selectedCategory === 'All' || work.w_category === selectedCategory).length / projectsPerPage
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPage', pageNumber);
  };

  const goToNextPage = () => setCurrentPage(prevPage => {
    const nextPage = prevPage + 1;
    localStorage.setItem('currentPage', nextPage);
    return nextPage;
  });

  const goToPrevPage = () => setCurrentPage(prevPage => {
    const prevPageNumber = prevPage - 1;
    localStorage.setItem('currentPage', prevPageNumber);
    return prevPageNumber;
  });

  const openModal = (project, index) => {
    setSelectedProject(project);
    setModalIndex(index);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setModalIndex(0);
  };

  const nextProject = () => {
    if (modalIndex < filteredProjects.length - 1) {
      setModalIndex(prevIndex => prevIndex + 1);
      setSelectedProject(filteredProjects[modalIndex + 1]); // Update selected project
    }
  };

  const prevProject = () => {
    if (modalIndex > 0) {
      setModalIndex(prevIndex => prevIndex - 1);
      setSelectedProject(filteredProjects[modalIndex - 1]); // Update selected project
    }
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <div id="projects" className={`projects sections ${theme}`}>
      <div className="projects-title">
        <h1>My Projects</h1>
        <img src={themePattern} alt="pattern" loading="lazy" />
      </div>
      <div className="filter-buttons">
        <button
          onClick={() => handleFilter('All')}
          className={`filter-button ${selectedCategory === 'All' ? 'active' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => handleFilter('Wordpress')}
          className={`filter-button ${selectedCategory === 'Wordpress' ? 'active' : ''}`}
        >
          WordPress
        </button>
        <button
          onClick={() => handleFilter('PHP')}
          className={`filter-button ${selectedCategory === 'PHP' ? 'active' : ''}`}
        >
          PHP
        </button>
        <button
          onClick={() => handleFilter('React')}
          className={`filter-button ${selectedCategory === 'React' ? 'active' : ''}`}
        >
          React
        </button>
        <button
          onClick={() => handleFilter('HTML')}
          className={`filter-button ${selectedCategory === 'HTML' ? 'active' : ''}`}
        >
          HTML
        </button>
      </div>

      <div className="projects-container">
        {filteredProjects.map((work, index) => (
          <div className='projects-item' key={index}>
            <img src={work.w_img} alt="Projects" loading="lazy" />
            <h3>{work.w_name}</h3>
            <div className='project-button-item'>
              <button type='button' className='info' onClick={() => openModal(work, index)} aria-label="View information about my projects">
                View Info <FaInfoCircle />
              </button>
              <a className='demo' href={work.w_demo_link} target="_blank" rel="noopener noreferrer" aria-label="Visit the repository of my projects">
                View Demo <FaLink />
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={goToPrevPage} disabled={currentPage === 1} aria-label="Previous Project"
          style={{
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}>Previous</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === totalPages} aria-label="Next Project"
          style={{
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
          }}>Next</button>
      </div>
      {/* Modal */}
      {selectedProject && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className='project-items'>
              <div className='item-project-image'>
              <FaCircleArrowLeft className='prev-btn' onClick={prevProject} disabled={modalIndex === 0} />
              <img src={selectedProject.w_img} alt="Project" loading="lazy" />
              <FaCircleArrowRight className='next-btn' onClick={nextProject} disabled={modalIndex === filteredProjects.length - 1} />
              </div>
              <div className='project-items-details'>
              <h2>{selectedProject.w_name}</h2>
              <h3>{selectedProject.w_proj}</h3>
              <p>Description: {selectedProject.w_description}</p>
              <p>Tech Stack:</p>
              <div className='details-project'>
              <p className='techstack'>
                {selectedProject.w_tech_stack.map((tech, index) => (
                  <span key={index} style={{ backgroundColor: getBackgroundColor(tech), color: getTextColor(tech) }}>
                    {tech}
                  </span>
                ))}
              </p>
              {selectedProject.github_link && (
                  <a href={selectedProject.github_link} target="_blank" rel="noopener noreferrer" className="view-source-button">
                    View Source Code <FaGithub size={30} />
                  </a>
              )}
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;

// Function to get background color based on tech stack
const getBackgroundColor = (tech) => {
  switch (tech) {
    case 'WordPress':
      return '#21759B';
    case 'Elementor':
      return '#00A5E6';
    case 'PHP':
      return '#777BB4';
    case 'MySQL':
      return '#4479A1';
    case 'HTML':
      return '#E34F26';
    case 'JavaScript':
      return '#F7DF1E';
    case 'CSS':
      return '#1572B6';
    case 'Bootstrap':
      return '#563D7C';
    case 'Figma':
      return '#0ACF83';
    case 'Blocksy':
      return '#000';
    case 'React':
      return '#61DAFB';
    case 'Vite':
      return '#646cff';
    default:
      return 'initial';
  }
};

// Function to get text color based on tech stack
const getTextColor = (tech) => {
  switch (tech) {
    case 'WordPress':
      return '#ffffff';
    case 'Elementor':
      return '#FFFFFF';
    case 'MySQL':
      return '#ffffff';
    case 'PHP':
      return '#FFFFFF';
    case 'HTML':
      return '#FFFFFF';
    case 'JavaScript':
      return '#000000';
    case 'CSS':
      return '#FFFFFF';
    case 'Bootstrap':
      return '#ffffff';
    case 'Figma':
      return '#ffffff';
    case 'Blocksy':
      return '#ffffff';
    case 'React':
      return '#ffffff';
    case 'Vite':
      return '#ffffff';
    default:
      return 'initial';
  }
};

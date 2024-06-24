// About.jsx
"use client";

import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import './About.css';
import jonas from '../../assets/jonas-pajah.jpg';
import theme_pattern from '../../assets/theme_pattern.svg';

const stats = [
    { num: 1, text: "Years of Experience" },
    { num: 11, text: "Projects Completed" },
    { num: 15, text: "Happy Clients" }
];

const About = ({ theme }) => {
    const [animated, setAnimated] = useState(false);
    const [counts, setCounts] = useState([]);
    const [targets, setTargets] = useState([]);

    useEffect(() => {
        const initialCounts = stats.map(stat => 0);
        const initialTargets = stats.map(stat => stat.num);

        setCounts(initialCounts);
        setTargets(initialTargets);

        const timer = setTimeout(() => {
            setAnimated(true);
        }, 1000); // Delay animation by 1 second

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!animated) return;

        const duration = 2000; // Duration of the animation in milliseconds
        const interval = 50; // Interval for each step in milliseconds
        const steps = duration / interval; // Number of steps in the animation

        // Calculate step size for each count
        const stepSizes = targets.map((target, index) => {
            return target / steps;
        });

        // Animate counts
        const animationInterval = setInterval(() => {
            setCounts(prevCounts => {
                return prevCounts.map((count, index) => {
                    const target = targets[index];
                    const stepSize = stepSizes[index];
                    const newValue = Math.min(count + stepSize, target); // Increment count by step size
                    return newValue;
                });
            });
        }, interval);

        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(animationInterval);
    }, [animated, counts, targets]);

    return (
        <div id="about" className={`about sections ${theme}`}>
            <div className="about-title">
                <h1>Who am I?</h1>
                <img src={theme_pattern} alt="pattern" loading="lazy"/>
            </div>
            <div className="about-sections">
                <div className="about-left">
                    <img src={jonas} alt="Jonas Isaiah P. Mulingbayan" loading="lazy"/>
                </div>
                <div className="about-right">
                    <div className="about-paragraph">
                        <h3 className="for-labels">Programmer &amp; Web Developer/Web Designer.</h3>
                        <p className="fst-italic"> A Programmer / Web Developer who is passionate about building the User Interface of Website and Web Applications.</p>

                        <p>I have a degree in Information Technology and a strong interest in Front-End Web Development.</p>
                        <p>I love seeing web designs and feel excited about building and turning them into a real website.
                        My passion and interest in Web Development, especially in the Front-End makes me build my own personal website. Currently, I'm looking for an opportunity where I can use the skills that I'm passionate about.
                    </p>
                    </div>

                    <div className='about-informations'>
                        <div className="information">
                            <ul>
                                <li><strong>Birthday:</strong> <span>18 November 1995</span></li>
                                <li><strong>City:</strong> <span>Bacoor City, Cavite</span></li>
                                <li><strong>Email:</strong> <span>jonasmulingbayan@gmail.com</span></li>
                            </ul>
                            <ul>
                                <li><strong>Age:</strong> <span>28</span></li>
                                <li><strong>Degree:</strong> <span>Bachelors</span></li>
                                <li><strong>Freelance:</strong> <span>Available</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-achievements">
                {counts.map((count, index) => (
                    <div className="about-achievement" key={index}>
                         <div className='count'>
                            {counts[index] > 9 ? (
                                <>
                                    <CountUp start={0} end={Math.round(count)} duration={2} />
                                    <span>+</span>
                                </>
                            ) : (
                                <CountUp start={0} end={Math.round(count)} duration={2} />
                                
                            )}
                        </div>
                        <p>{stats[index].text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default About;

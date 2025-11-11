import React from 'react'
import './Services.css'
import theme_patern from '../../assets/theme_pattern.svg'
import Services_Data from '../../assets/services_data'

const Services = ({theme}) => {
  return (
    <div id = "services" className={`services sections ${theme}`}>
        <div className="services-title">
            <h1>My Services</h1>
            <img src = {theme_patern} alt = "pattern" loading="lazy"/>
        </div>
        <div className="services-container">
            {Services_Data.map((service,index) =>{
                return <div key = {index} className='services-format'>
                            {/*<h3>{service.s_no}</h3>*/}
                            <h2>{service.s_name}</h2>
                            <p>{service.s_desc}</p>
                        </div>
            })}
        </div>
    </div>
  )
}

export default Services

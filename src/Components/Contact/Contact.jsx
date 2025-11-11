import React, { useState } from 'react';
import './Contact.css';
import theme_patern from '../../assets/theme_pattern.svg';
import mail_icon from '../../assets/mail_icon.svg';
import location_icon from '../../assets/location_icon.svg';

const Contact = ({theme}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { name, email, message } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = () => {
    return name.trim() !== '' && email.trim() !== '' && message.trim() !== '';
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formDataObj = new FormData(event.target);

    formDataObj.append("access_key", "52705eb5-f390-42ea-bbba-58a0a77283c7");

    const object = Object.fromEntries(formDataObj);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      alert(res.message);
      console.log("Success", res);
    }
  };

  return (
    <div id="contact" className={`contact sections ${theme}`}>
      <div className="contact-title">
        <h1>Get in touch</h1>
        <img src={theme_patern} alt="pattern" loading="lazy"/>
      </div>
      <div className="contact-section">
        <div className="contact-left">
          <h1>Let's talk</h1>
          <p>I'm currently available to take on new projects, so feel free to send me a message about anything that you want me to work on. You can contact anytime.</p>
          <div className="contact-details">
            <div className="contact-detail">
              <img src={mail_icon} alt="mail" loading="lazy"/> <p>jonasmulingbayan@gmail.com</p>
            </div>
            <div className="contact-detail">
              <img src={location_icon} alt="number" loading="lazy"/> <p>Bacoor City, Cavite, Philippines</p>
            </div>
            <iframe
              id="address-frame"
              allowFullScreen
              title="Home Address"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Queen%20of%20Peace%20Road+(Home)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
            </iframe>
          </div>
        </div>
        <form onSubmit={onSubmit} className="contact-right">
          <label htmlFor='name'>Name</label>
          <input
            id= 'name'
            type='text'
            placeholder='Enter your name'
            name='name'
            value={name}
            onChange={handleChange}
            autocomplete="on"
          />
          <label htmlFor='email'>Email</label>
          <input
            id= 'email'
            type='email'
            placeholder='Enter your email'
            name='email'
            value={email}
            onChange={handleChange}
            autocomplete="on"
          />
          <label htmlFor='message'>Message</label>
          <textarea
            id='message' 
            name='message'
            rows='8'
            placeholder='Enter your message'
            value={message}
            onChange={handleChange}
          ></textarea>
          <button
            type='submit'
            className={`contact-submit ${!isFormValid() ? 'disabled' : ''}`}
            disabled={!isFormValid()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact;

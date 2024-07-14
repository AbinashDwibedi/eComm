import React, { useState } from 'react';
import '../ContactUs.css';
import img from '../assets/Singing Contract.gif'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const ContactUs = () => {
  gsap.registerPlugin(ScrollTrigger)
    const [contactData, setContactData] = useState({
        "name" : '',
        "email" : '' , 
        "message": '',
    })
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Form submitted successfully!');
   
  };
  function handleContactData (e){
    const {name , value} = e.target ;
    setContactData({...contactData , [name] : value})
  }
  
    useGSAP(() => {
        gsap.from(".contact-us-left", {
            scale: 1,
            opacity: 0,
            boxShadow: " 0px 0px 0px 0px transparent",
            scrollTrigger:{
                trigger: ".contact-us-container",
                scroller: "body",
                start: "top 80%",
                end: "top 40%",
                // markers: true,
                scrub : 2
            }
        })
        gsap.from(".form-group , .contact-us-button", {
          x: 300,
          opacity: 0,
          // stagger: .5,
          boxShadow: " 0px 0px 0px 0px transparent",
          scrollTrigger:{
              trigger: ".contact-us-container",
              scroller: "body",
              start: "top 80%",
              end: "top 20%",
              // markers: true,
              scrub : true
          }
      })
    })
  return (
    <>
    <h2 className='contact-us-heading' id='ContactUs'>Contact Us</h2> 
    <div className="contact-us-container">
        <img src={img} alt="" className="contact-us-left" />
      <div className="contact-us-right">
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input className='input-contact' value={contactData.name} type="text" id="name" name="name" required  placeholder='name' onChange={(e)=>handleContactData(e)}/>
        </div>
        <div className="form-group">
          <input className='input-contact' type="email" id="email" name="email" value={contactData.email} required placeholder='email' 
          onChange={(e)=>handleContactData(e)}/>
        </div>
        <div className="form-group">
          <textarea id="message" name="message" rows="7" value={contactData.message} required placeholder='message' onChange={(e)=>handleContactData(e)}></textarea>
        </div>
        <button className='contact-us-button' type="submit">Submit</button>
      </form>
      </div>
    </div></>
  );
};

export default ContactUs;

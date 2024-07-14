import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../assets/Delivery Boy.gif";
import "../Address.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

function Address({addAddressState, handleAddAddress ,handleAddAddressState }) {
  
  gsap.registerPlugin(ScrollTrigger);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pin: "",
    city: "",
    state: "",
    country: "",
  });

  const toastOptions = {
    theme: "light",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    gsap.from(".form-div", {
      opacity: 0,
      x: -100,
      duration: 0.5,
      stagger: 0.2,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      handleAddAddress(formData);
      toast.success("Address Added", toastOptions);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        pin: "",
        city: "",
        state: "",
        country: "",
      });
    }
  };

  const handleValidation = () => {
    const { name, email, phone, address, pin, city, state, country } = formData;
    if (name.length <= 3) {
      toast.error("Enter a valid name (at least 3 characters)", toastOptions);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email", toastOptions);
      return false;
    }

    if (!/^\d+$/.test(phone) || phone.length < 10) {
      toast.error(
        "Enter a valid phone number (at least 10 digits)",
        toastOptions
      );
      return false;
    }

    if (address.length === 0) {
      toast.error("Enter a valid address", toastOptions);
      return false;
    }

    if (!/^\d{5,6}$/.test(pin)) {
      toast.error("Enter a valid pin code (5 or 6 digits)", toastOptions);
      return false;
    }

    if (city.length === 0) {
      toast.error("Enter a valid city", toastOptions);
      return false;
    }

    if (state.length === 0) {
      toast.error("Enter a valid state", toastOptions);
      return false;
    }

    if (country.length === 0) {
      toast.error("Enter a valid country", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useGSAP(() => {
    gsap.from(".address-container", {
      opacity: 0,
      y: 100,
      duration: 0.5,
    })
    // gs.pause();
}, [addAddressState])
  return (
    <>

      <div className="address-container">
      <div className="remove-p-d delivery-cross" onClick={()=>{handleAddAddressState()}}><i className="fa-solid fa-xmark"></i></div>
        <form onSubmit={handleSubmit} className="address-container-left">
          <h1
            className="address-container-heading"
            style={{ marginTop: "10px", marginBottom: "25px" }}
          >
            Enter address
          </h1>
          <div className="form-div">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="name"
            />
          </div>
          <div className="form-div">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email"
            />
          </div>
          <div className="form-div">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="phone no."
            />
          </div>
          <div className="form-div">
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="address"
            />
          </div>
          <div className="form-div" style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              id="pin"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              placeholder="pin code"
            />
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="city"
            />
          </div>
          <div className="form-div" style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="state"
            />
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="country"
            />
          </div>
          <button className="address-container-right-btn" type="submit">
            Add Address
          </button>
        </form>
        <div className="address-container-right">
          {/* <img src={img} alt="address" /> */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Address;

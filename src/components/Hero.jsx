import React from "react";
import img from "../assets/Website Building of Shopping Sale.gif";
import { Link } from "react-router-dom";
import TextAnimation from "./TextAnimation";

function Hero() {
  return (
    <div className="Hero-div" id="Home">
  <div className="left-side-hero">
    <h1 className="left-side-hero-heading">
      <span style={{color:"var(--bg-color-1)"}}>"Discover Your Style,</span> Redefine Your Shopping Experience".
    </h1>
    <TextAnimation/>
    <a href="#Products">
      <button className="hero-button">See Products</button>
    </a>
  </div>
  <div className="right-side-hero">
    <img src={img} alt="" />
  </div>
</div>

  );
}

export default Hero;

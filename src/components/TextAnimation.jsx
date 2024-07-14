import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

function TextAnimation() {
//   const heroParaRef = useRef();
  const text = "Welcome to a new era of shopping where elegance meets convenience. Explore an extensive collection of the latest trends and timeless classics, carefully curated to cater to your unique style. Whether you're searching for chic fashion, sophisticated home decor, or the latest gadgets, our platform is designed to provide an unparalleled shopping experience.";
  
  
  return (
    <p className="left-side-hero-para">
      {text.split("").map((char, index) => (
        <span style={{opacity: 1, }} key={index}>{char}</span>
      ))}
    </p>
  );
}

export default TextAnimation;

import React from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
function WeOffers() {
    gsap.registerPlugin(ScrollTrigger)
    useGSAP(() => {
        gsap.from(".info_1", {
            y: 50,
            opacity: 0,
            duration: .5,
            // stagger: .3,
            boxShadow: " 0px 0px 0px 0px transparent",
            scrollTrigger:{
                trigger: ".info",
                scroller: "body",
                // markers: true,
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
        })
    })
  return (
    <div className="info">
            <div className="info_1">
            <i className="fa-solid fa-star"></i>
                <p className="info_3">we have 4.5 rating throughout the world</p>
            </div>
            <div className="info_1">
            <i className="fa-solid fa-shield-halved"></i>
                <p className="info_3">loved this platform by million's of people's</p>
            </div>
            <div className="info_1">
            <i className="fa-solid fa-headset"></i>
                <p className="info_3">24/7 support</p>
            </div>
        </div>
  )
}

export default WeOffers
import React, { useRef } from 'react'
import {Link} from "react-router-dom"

function Navbar({addedProducts}) {
  let hamref = useRef(null);
  let iconref  = useRef(null);
  let listRef = useRef(null);
  function handleHamMenu(){
    if(iconref.current){
      iconref.current.classList.toggle("fa-xmark");
      if(listRef.current){
      if(listRef.current.classList.contains("ham-menu-hide")){
        listRef.current.classList.remove("ham-menu-hide")
        listRef.current.classList.add("ham-menu-show")
      }
      else{
        listRef.current.classList.remove("ham-menu-show")
        listRef.current.classList.add("ham-menu-hide")
      }
    }
    }
  }
  return (
    <nav>
        <div className="left-side-nav">
            <Link to='/'><img className='left-side-nav-image' src="https://cdn-icons-png.freepik.com/256/914/914832.png?ga=GA1.1.90036506.1719553220&semt=ais_hybrid" alt="open-shop"/></Link>
            <h2 className='left-side-nav-heading'>OPEN SHOP</h2>
        </div>
        <div className="right-side-nav">
            <ul className="right-side-nav-lists ham-menu-hide" ref={listRef}>
                <li className="right-side-nav-list"><a className='right-side-nav-list-a' href="#Home">HOME</a></li>
                <li className="right-side-nav-list"><a className='right-side-nav-list-a' href="#Products">PRODUCTS</a></li>
                <li className="right-side-nav-list"><a className='right-side-nav-list-a' href="#ContactUs">CONTACT US</a></li>
            </ul>
            <Link to="/cart" className="right-side-nav-icon">
            <i className="fa-solid fa-cart-shopping" style={{color:"black"}}><div className="cart-count">{addedProducts.length}</div></i>
            </Link >
            <div ref={hamref} className="ham-menu" onClick={()=> handleHamMenu()}><i ref={iconref} id='icon-ham' className="fa-solid fa-bars" style={{ cursor : "pointer" , fontSize: "25px" , color:"black"}}></i></div>
        </div>
    </nav>
  )
}

export default Navbar
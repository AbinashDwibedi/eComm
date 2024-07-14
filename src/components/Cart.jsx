import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/cartempty.svg";
import "../Cart.css";
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AddAddress from "./AddAddress";
import Address from "./Address";
import { toast } from "react-toastify";
import SelectFreeProduct from "./SelectFreeProduct";
function Cart({ addedProducts, handleRemove,handleAdd, deadStock}) {
  const navigate = useNavigate();
  gsap.registerPlugin(ScrollTrigger)
  const [price, setPrice] = useState([0, 0, 0, 0]);
  const [addAddressState , setAddAddressState] = useState(false)
  const [addedAddress , setAddedAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedDeadStock , setSelectedDeadStock] = useState(undefined);
  const [deadStockOverviewState , setDeadStockOverviewState]= useState(false)
  function handleSelectedDeadStock (product){
    setSelectedDeadStock(product);
  }
  function handleDSOS(){
    if(deadStockOverviewState){
      setDeadStockOverviewState(false)
    }
    else {
      setDeadStockOverviewState(true)
    }
  }
  function handleAddAddressState(){
    if(addAddressState){
      setAddAddressState(false)
    }
    else{
      setAddAddressState(true)
    }
  }
  function handleBeforePayment(){
    if(Object.keys(selectedAddress).length == 0){
      toast.error("Please select an address")
      
    }
  }
  function handleSelectedAddress (address ){
    setSelectedAddress(address)
    // Uref.current.style.border = "2px solid #6a13bf"
  }
  function handleRemoveAddress(index){
    setAddedAddress(addedAddress.filter((address , i)=> i !== index))
  }

  useEffect(() => {
    if (addedProducts.length >= 4 && selectedDeadStock && !addedProducts.includes(selectedDeadStock)) {
      handleAdd(selectedDeadStock);
    } else if (addedProducts.length < 5 && addedProducts.includes(selectedDeadStock)) {
      handleRemove(selectedDeadStock);
    }
  }, [selectedDeadStock, addedProducts]);

  
  useEffect(() => {
    if (addedProducts[0]) {
      let subTotal = addedProducts.reduce((accum, product) => {
        return accum + product.price;
      }, 0);
      let tax = 0.2 * subTotal;
      let delivery_charge = 0;
      if (subTotal + tax <= 500) {
        delivery_charge = 60;
      }
      let total_price = subTotal + tax + delivery_charge;
      setPrice([subTotal, tax, delivery_charge, total_price]);
    }
  }, [addedProducts]);
  useGSAP(()=>{
    gsap.from(".cart-item", {
      opacity: 0,
      duration : .5,
      stagger: .2
    })
    gsap.from(".right-cart", {
      opacity: 0,
      duration : 1,
      x: 100
    })
  },[])
  function handleAddAddress(address){
    setAddedAddress([...addedAddress , address]);
    
  }
  useEffect(()=>{
    if(localStorage.getItem("deliveryAddress")){
      setAddedAddress(JSON.parse(localStorage.getItem("deliveryAddress")))
    }
  },[])
  useEffect(()=>{
    localStorage.setItem("deliveryAddress", JSON.stringify(addedAddress));
  },[addedAddress])
  // console.log(addedAddress);
  return (
    <>
    {deadStockOverviewState && <SelectFreeProduct handleSelectedDeadStock={handleSelectedDeadStock} handleDSOS={handleDSOS} deadStock={deadStock}/> }
    {addAddressState && <Address addAddressState={addAddressState} handleAddAddressState={handleAddAddressState}  handleAddAddress={handleAddAddress}/>}
      <h1 className="cart-heading" style={{width: "100%",marginBottom:"30px" , position: "relative"}}>
        <div className="home" onClick={()=> navigate('/')}><i className="fa-solid fa-arrow-left"></i></div>
        CART</h1>
      {addedProducts.length == 0 ? (
        <div className="no-cart">
          <img src={img} alt="" />
          <h2>cart is empty!</h2>
        </div>
      ) : (
        <div className="cart">
          <div className="left-cart">
            <div className="cart-items">
              {addedProducts.map((product) => {
                return (
                  <div className="cart-item" key={product.id}>
                    <img src={product.image} alt="" className="cart-item-img" />
                    <h2 className="cart-item-title">{product.title}</h2>
                    <p className="cart-item-price">{product.price}</p>
                    <i
                      className="fas fa-trash-alt cart-item-delete"
                      onClick={() => handleRemove(product)}
                    ></i>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="right-cart">
            {/* <img
              className="right-cart-image"
              src="https://img.freepik.com/free-vector/young-man-shopping-supermarket-department-store_40876-2628.jpg?size=626&ext=jpg&ga=GA1.1.90036506.1719553220&semt=ais_user"
              alt=""
            /> */}
            {addedProducts.length>=4 && <button style={{width: "100%", padding:"10px",fontSize:"15px"}} onClick={()=> handleDSOS()}>select a free product</button>}
            <AddAddress selectedAddress={selectedAddress} handleSelectedAddress={handleSelectedAddress} handleRemoveAddress={handleRemoveAddress} addedAddress={addedAddress} handleAddAddressState={handleAddAddressState}/>
            <div className="right-cart-price">
              <ul>
                <li className="right-cart-price-list">
                  subtotal <span>{price[0]}</span>
                </li>
                <li className="right-cart-price-list">
                  tax <span>{price[1]}</span>
                </li>
                <li className="right-cart-price-list">
                  delivery charge <span>{price[2]}</span>
                </li>
                <li className="right-cart-price-list">
                  total <span>{price[3]}</span>
                </li>
              </ul>
              <Link>
                <button onClick={()=>handleBeforePayment()} className="checkout-button" style={{ color: "white" }}>
                  pay now
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;

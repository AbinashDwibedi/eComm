import React from 'react'
import "../ProductDetails.css"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
function ProductDetails({setOverviewState,overviewState,handleAdd,addedProducts , productOverview,handleRemove}) {
    function changeOverviewState(){
        setOverviewState(false)
    }
    useGSAP(() => {
        let gs = gsap.from(".product-details", {
          opacity: 0,
          y: 100,
          duration: 0.5,
        })
        // gs.pause();
    }, [overviewState])
  return (
    <div className="product-details">
        <div className="remove-p-d" onClick={()=> changeOverviewState()}><i className="fa-solid fa-xmark"></i></div>
        <div className="details-left">
            <img src={productOverview.image} alt="" />
        </div>
        <div className="details-right">
            <h1 className="details-heading">{productOverview.title}</h1>
            <p className="details-para">{productOverview.description}</p>
            <div className="p-r-c-container">
            <h2 className="details-price">Price <p className="details-price-value">$ {productOverview.price}</p></h2>
            <h2 className="details-rating">Rating <p className="details-rating-value">★ {productOverview.rating.rate}</p></h2>
            {addedProducts.some((product)=> product.id === productOverview.id)? <button className='add-to-cart' style={{backgroundColor:"gray"}} onClick={()=> handleRemove(productOverview)}>remove from Cart</button>: <button className='add-to-cart' onClick={()=> handleAdd(productOverview)}>add to Cart</button>}
            
            </div>
        </div>
    </div>
  )
}

export default ProductDetails
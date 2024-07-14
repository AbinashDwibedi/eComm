import React from 'react'
import "../SelectFreeProduct.css"
function SelectFreeProduct({deadStock,handleDSOS,handleSelectedDeadStock}) {
  return (
    <div className="-product-container" style={{minHeight: "100vh", width: "100%", backgroundColor:"white",position:"fixed", top: "0", left:"0", zIndex:"10"}}>
        <div className="cross-mark" onClick={()=> handleDSOS()}>
            <i className="fa-solid fa-xmark" style={{fontSize:"30px"}}></i>
        </div>
        <div className="free-products" >
        {deadStock.map((product) => (
          <div className="free-product" key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              className="free-product-image"
              
            />
            <h2 className="free-product-title">{product.title}</h2>
            <div className="price-container">
              <h2 className="price-heading">Price</h2>
              <p className="free-product-price">{product.price}</p>
            </div>
            <div className="rating-container">
              <h2 className="rating-heading">Rating</h2>
              <div className="free-product-rating">
                <div style={{backgroundImage:`linear-gradient(to right, gold ${(product.rating.rate)*20}% , wheat ${100 -(product.rating.rate)*20 }%)`}} className="rating">★★★★★</div>({product.rating.rate})</div>
            </div>
            <button className='free-product-button' onClick={()=>handleSelectedDeadStock(product)}>select this</button>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default SelectFreeProduct
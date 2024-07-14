import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
function Products({
  productData,
  categories,
  handleAdd,
  handleRemove,
  addedProducts,
  setAddedProducts,
  selectedCategorie,
  handleSelectedCategorie
}) {
  const [selectedSorting , setSelectedSorting] =useState('')
  const [productOverview ,setProductOverview] = useState({});
  const [overviewState , setOverviewState] = useState(false);
  const allSorting = ['price ↑' ,'price ↓', 'rating ↑' , 'rating ↓']
  function handleSelectedSorting(method){
    setSelectedSorting(method)
  }
  const handleProductOverview = (product)=>{
    setProductOverview(product)
    setOverviewState(true)
  }
  useEffect(()=>{
    if(selectedSorting === 'price ↓'){
      productData.sort((a,b)=> a.price - b.price);
    }
    if(selectedSorting === 'price ↑'){
      productData.sort((a,b)=> b.price - a.price);
    }
    if(selectedSorting === 'rating ↓'){
      productData.sort((a,b)=> a.rating.rate - b.rating.rate);
    }
    if(selectedSorting === 'rating ↑'){
      productData.sort((a,b)=> b.rating.rate - a.rating.rate);
    }
  },[selectedSorting])
  gsap.registerPlugin(ScrollTrigger)
    useGSAP(() => {
        gsap.from("#select-categorie, #select-sorting ", {
            y: 50,
            opacity: 0,
            duration: .5,
            boxShadow: " 0px 0px 0px 0px transparent",
            scrollTrigger:{
                trigger: ".product-modification",
                scroller: "body",
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
        })

        gsap.from(".products", {
          y: 50,
          opacity: 0,
          boxShadow: "0px 0px 0px 0px transparent",
          scrollTrigger:{
              trigger: ".products",
              scroller: "body",
              start: "top 60%",
              end: "top 40%",
              scrub: 1,
              
          }
      })
    })
  return (
    <>
      <h1 className="products-heading" id="Products">
        products
      </h1>
      <div className="product-modification">
        <select name="" id="select-categorie" value={selectedCategorie} onChange={e=>handleSelectedCategorie(e.target.value)}>
        <option value=''>select a categorie</option>
          {categories.map((categorie , index)=> {
            return <option key={index} value={categorie}>{categorie}</option>
          })}
        </select>
        <select name="" id="select-sorting" value={selectedSorting} onChange={e=>handleSelectedSorting(e.target.value)}>
        <option value=''>sort</option>
          {allSorting.map((sorting, index)=> {
            return <option key={index} value={sorting}>{sorting}</option>
          })}
        </select>
      </div>
      <div className="products" >
        {productData.map((product) => (
          <div className="product" onClick={() => handleProductOverview(product)} key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
              
            />
            <h2 className="product-title">{product.title}</h2>
            <div className="price-container">
              <h2 className="price-heading">Price</h2>
              <p className="product-price">{product.price}</p>
            </div>
            <div className="rating-container">
              <h2 className="rating-heading">Rating</h2>
              <div className="product-rating">
                <div style={{backgroundImage:`linear-gradient(to right, gold ${(product.rating.rate)*20}% , wheat ${100 -(product.rating.rate)*20 }%)`}} className="rating">★★★★★</div>({product.rating.rate})</div>
            </div>
            {/* {addedProducts.some((item) => item.id === product.id) ? (
              <button
                className="add-to-cart"
                onClick={() => handleRemove(product)}
                style={{ backgroundColor: "gray" }}
              >
                Remove from Cart
              </button>
            ) : (
              <button
                className="add-to-cart"
                onClick={() => handleAdd(product)}
              >
                Add to Cart
              </button>
            )} */}
          </div>
        ))}
        
      </div>
      {overviewState && <ProductDetails overviewState={overviewState} addedProducts={addedProducts} handleAdd={handleAdd} handleRemove={handleRemove} setOverviewState={setOverviewState} productOverview={productOverview}/>}
    </>
  );
}

export default Products;

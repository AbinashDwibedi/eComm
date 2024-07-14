import React from 'react'
import Hero from './Hero'
import Products from './Products'
import WeOffers from './WeOffers'
import ContactUs from './ContactUs'
import Navbar from './Navbar'
function MainContainer({handleSelectedCategorie,selectedCategorie,productData,handleAdd,handleRemove ,categories, addedProducts,setAddedProducts}) {
  return (
    <div className='main-container'>
        <Navbar addedProducts={addedProducts}/>
        <Hero/>
        <WeOffers/>
        <Products handleSelectedCategorie={handleSelectedCategorie} selectedCategorie={selectedCategorie} categories={categories} handleAdd={handleAdd} handleRemove={handleRemove} productData={productData} addedProducts={addedProducts} setAddedProducts={setAddedProducts}/>
        <ContactUs/>
    </div>
  )
}

export default MainContainer
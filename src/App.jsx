import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import MainContainer from "./components/MainContainer";
import Cart from "./components/Cart";
import spinner from './assets/OFAF.gif'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./components/Payment";
import "./Responsive.css"
import { toast ,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

//gsap from gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


  function App() {
  const mainRef = useRef();
  
  const [productData, setProductData] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false)
  const [addedProducts, setAddedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategorie,setSelectedCategorie] = useState('');
  const [deadStock , setDeadStock] = useState([]);

  useGSAP(() => {
    if (mainRef.current) {
      let tl = gsap.timeline({});
      tl.from(".left-side-nav a , .left-side-nav h2", {
        opacity: 0,
        y: -70,
        duration: .5,
        stagger: .2,
        // ease: "power4.out",
      }
      ).from(".right-side-nav-list",{
        opacity: 0,
        y: -70,
        duration: .5,
        stagger: .2,
      },"-=1").from(".right-side-nav-icon , .ham-menu", {
        duration: .5,
        stagger: .2,
        translateX: 100
      }).from(".left-side-hero-heading , .left-side-hero-para , .hero-button",{
        duration: .5,
        stagger: .2,
        opacity : 0,
        x: -100 ,
        ease:"sine.in"
      }).from(".right-side-hero",{
        duration: 1,
        stagger: .5,
        opacity : 0,
        // x: 100 ,
        scale: 1,
        ease:"expo.in"
      },"-=.5")
      .from(".left-side-hero-para span",{
      opacity: 0,
      y: 50,
      duration: 0.1,
      stagger: 0.01,
    })
  }
  } , [productsLoaded])

  const toastOptions = {
    theme: "light",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
}
  function handleSelectedCategorie (categorie){
    setSelectedCategorie(categorie)
  }
  
  useEffect(()=>{
    axios.get("https://fakestoreapi.com/products/categories").then(data => {
      const CategorieAfterRemoval = data.data.filter((category)=> category !== "electronics" ).filter((category)=> category !== "jewelery")
      return setCategories(CategorieAfterRemoval)
    }).catch(err => console.log(err))
  },[])

  useEffect(() => {
    if(selectedCategorie === ''){
      axios.get("https://fakestoreapi.com/products").then((data) => {
      const sortedData = data.data.filter((item)=> item.category !== "electronics" ).filter((item)=> item.category !== "jewelery")
      setProductData(sortedData)
      setTimeout(() => {
        setProductsLoaded(true)
      }, 3000);
    }).catch((err)=>console.log(err))
    }
    else{
      axios.get(`https://fakestoreapi.com/products/category/${selectedCategorie}`).then((data) => {
      setProductData(data.data)
      setTimeout(() => {
        setProductsLoaded(true)
      }, 3000);
    }).catch((err)=>console.log(err))
    }
    
  }, [selectedCategorie]);
  useEffect(()=>{
    axios.get("https://fakestoreapi.com/products/category/jewelery").then((data)=>{
      data.data.forEach(data => data.price =0)
      setDeadStock(data.data);
    }).catch(err => console.log(err))
  },[])
  useEffect(()=>{
    if(localStorage.getItem("open-shop")){
      setAddedProducts(JSON.parse(localStorage.getItem('open-shop')))
    }
  },[])
  useEffect(() => {
    localStorage.setItem("open-shop", JSON.stringify(addedProducts));
    
  }, [addedProducts]);

  function handleAdd(product) {
    const newAddedProducts = [...addedProducts, product];
    setAddedProducts(newAddedProducts);
    toast.success("successfully added to the cart" ,toastOptions)
  }

  function handleRemove(product) {
    const newAddedProducts = addedProducts.filter(item => item.id !== product.id);
    setAddedProducts(newAddedProducts);
    toast.success("successfully removed from the cart" ,toastOptions)
  }
  return (
    <>
    {productsLoaded?<BrowserRouter>
        <main ref={mainRef}>
          <Routes>
            <Route path="/" element={<MainContainer handleSelectedCategorie={handleSelectedCategorie} selectedCategorie={selectedCategorie} categories={categories} handleRemove={handleRemove} handleAdd={handleAdd} productData={productData} addedProducts={addedProducts}   setAddedProducts={setAddedProducts}/>} />
            <Route path="/cart" element={<Cart handleAdd={handleAdd}  deadStock={deadStock} addedProducts={addedProducts} handleRemove={handleRemove} />} />
            {/* <Route path="/address" element={<Adress handleAddAddress={handleAddAddress}/>}/> */}
            <Route path="/payment" element={<Payment/>}/>
          </Routes>
        </main>
        <footer style={{background:"var(--bg-color-1)", textAlign:"center", fontSize:"17px", color:"white" ,padding:"5px"
        }}>&#169; made by Abinash with <span style={{color:"red"}}>&hearts;</span></footer>
      </BrowserRouter>:<img style={{height:'400px',width:"400px" , objectFit:"cover" , position:"absolute", top:"calc(50vh - 200px)", left:"calc(50vw - 200px)"}} src={spinner}></img> }
      <ToastContainer/>
    </>
  );
}

export default App;

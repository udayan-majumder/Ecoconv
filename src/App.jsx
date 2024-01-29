import { useEffect, useRef, useState } from 'react'
import { initializeApp } from "firebase/app";
import{
getAuth,
GoogleAuthProvider,
signInWithPopup,
onAuthStateChanged,
signOut} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";

function App() {
  const [window_count, setCount] = useState(0)
  const[shopping_count,setshopcount]=useState(0);
  const[price_arr,setPriceList]=useState([])
  const[cart_window,setcartwindow]=useState(0)
  const[cart_items,setcartitems]=useState([])
  const [addbtn,updateaddbtn]=useState(0)
  const product_positon= useRef(0);
  const [carttext,settext]=useState('ADD')
  
 
  const firebaseConfig = {
    apiKey: "AIzaSyDj-KemQXJCgoVivjSvqHR7TaBNrGgTCKg",
    authDomain: "ecoconv-fb137.firebaseapp.com",
    projectId: "ecoconv-fb137",
    storageBucket: "ecoconv-fb137.appspot.com",
    messagingSenderId: "650191769753",
    appId: "1:650191769753:web:f784001c243e53e195e808",
    measurementId: "G-TC9ZG6D548"
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const [user,setUser]=useState(getAuth(app).currentUser)

  useEffect(()=>{
     const unsuscribe= auth.onAuthStateChanged((user)=>{
      setUser(user)
    })
    return ()=>{unsuscribe()}
  },[])

  function signin() {
    const popup = new GoogleAuthProvider(app);
    signInWithPopup(auth, popup);
    setCount(1)
  }

  function signout() {
    signOut(auth);
  }
  
const getdata= ()=>{
  fetch('price.json',{headers:{
'Content-type':'application/json',
'Accept':'appliaction/json'
  }}).then((value)=>{
    return value.json()
  }).then((data)=>{
    setPriceList(data)
  })
}


const scrollToLeft =()=>{
  if (product_positon.current) {
    product_positon.current.scrollLeft += 80; // Adjust as needed
  }
 }
 const scrollToRight =()=>{
  if (product_positon.current) {
    product_positon.current.scrollLeft -= 80; // Adjust as needed
  }
 }  

 const addtocart = (productIndex) => {
  const newCartItems = [...cart_items, productIndex];
  setcartitems(newCartItems);
};


 useEffect(()=>{
  getdata()
},[])

if(user===null){
return (
  <div className="login-div">
  <div className="background">
    <div className="background-layer">
      <div className="login-items-holder">
      <div className="login-image"></div>
       <div className="login-details">
        <div className="big-text">Welcome User</div>
        <div className="small-text">Welcome to our online sanctuary,<br></br> where every click opens the door to new possibilities.</div>
        <div className="login-logo"></div>
        <button className='login-btn-signin' onClick={()=>{
          if(window_count==0){
            signin()
          }
        }}>Continue with Google</button>
       </div>
      </div>
    </div>
  </div>
</div>
)
}
  return (
    <>
      <div className="main">
        <div className="sub-main">
          <div className="cover-bg">
          <div className="sub-cover-bg">
            <div className="navbar">
              <div className="nav-logo"></div>
              <div className="button-function">
                <button className="shop-btn" onClick={()=>setCount(1)}></button>
                <div className="user-info">
                  <img className="userlogo" src={auth.currentUser.photoURL}></img>
                  <button className="login-btn" onClick={()=>{
                    signout()
                    }}>Sign out</button>
                </div>
              </div>
            </div>
            <div className="design-content">
              <span className="text-design"><p>REDUCE </p></span>
              <span className="text-design s">RECYCLE</span>
              <span className="text-design l">REUSE</span>
             <button className="lower-shop-btn" onClick={()=>setCount(1)}>Shop Now</button>
            </div>
          </div>
          </div>
          <div className="second-page">
          <div className="heading-text">OUR PRODUCTS</div>
          <div className="quote-text">"Recycle for a greener tomorrow, today"</div>
          <div className="products-div" ref={product_positon}>
           
           {
              Object.values(price_arr).map((new_data,index)=>(
                Object.values(new_data).map((final)=>(
                  Object.values(new_data).map((pricel)=>(
                <div key={index} className="product-items-card">
                  <div className="img-container">
                  <img src={final.image} alt="" /></div>
                  <div className="product-details-div">
                    <div className="name-price-details-div">
                      <div className="product-name">{final.name}</div>
                      <div className="product-price">{final.price.i} INR</div>
                    </div>
                    <button className="Add-to-cart-btn" onClick={()=>{
                     addtocart(final.productindex);
                     if(addbtn==0){
                      updateaddbtn(1)
                     }
                     else{
                      updateaddbtn(0)
                     }
                      
                    }}>
{cart_items.includes(final.productindex)? "DONE" : "ADD"}

                    </button>
                  </div>
                </div>
                .
              ))))))
              // console.log(price_arr[0].product.image)
           }
        
          </div>
          <div className="next-prev-btns">
            <button className='scroll-btn' onClick={scrollToRight}>Prev</button>
           <button className='scroll-btn' onClick={scrollToLeft}>Next</button>
           </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default App

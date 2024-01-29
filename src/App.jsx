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
  const[curr_product,setcurrproduct]=useState(0);
  const[price_arr,setPriceList]=useState([])
  const[only_price,setprice]=useState([])
  const[curr_grade_btn,setgradebtn]=useState(null)
  const[grade_price,setgradeprice] =useState(0)
  const[cart_items,setcartitems]=useState([])
  const [addbtn,updateaddbtn]=useState(0)
  const product_positon= useRef(0);
  const [curr_type,setcurrtype]=useState(0)
  const[curr_quantity,setcurrquantity]=useState(1)
  const[total_price,settotalprice]=useState(0)
  const[popupchange,setpopupchange] =useState(0)
console.log(curr_quantity)
  
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
                     setcurrproduct(final.productindex);
                     if(addbtn==0){
                      setprice(final.price)
                      updateaddbtn(1)
                      
                     }
                     else if(addbtn==1){
                      updateaddbtn(0)
                     }
                      
                    }}>
{(addbtn==1)? "DONE" : "BUY"}

                    </button>
                  </div>
                </div>
              ))))))
              // console.log(price_arr[0].product.image)
           }
        
          </div>
          <div className="next-prev-btns">
            <button className='scroll-btn' onClick={scrollToRight}>Prev</button>
           <button className='scroll-btn' onClick={scrollToLeft}>Next</button>
           </div>
          </div>
          <div className={(addbtn===1)?"popup":"blank"}>
            <div className={(popupchange===0)?"inside-popup":"blank"}>
              <div className="product-details">
                <div className="image-name-of-product">
                  <img src={price_arr[curr_product].product.image} alt="" />
                  <div className="product-name-price">
                  <div className="product-name-buy">{price_arr[curr_product].product.name}</div>
                  <div className="product-price-buy">{only_price.i} INR</div>
                  </div>
                </div>
                <div className="buying-option-of-product">
                  <div className="upper-name-btn">
                   <div className="upper-name-btn-inside">
                    <div className="details-heading-text">Details</div>
                     <button className="exit-popup" onClick={
                      ()=>{
                        updateaddbtn(0)

                      }
                     }>x</button>
                   </div>
                   <div className="details-text">{price_arr[curr_product].product.productdetails}</div>
                  </div>
                  <div className="grade-container">
                    <div className="grade-text">Grade</div>
                    <div className="grade-btn-holder">{
                      Object.values(only_price).map((data,index)=>(
                      <button key= {index} className={(curr_grade_btn!=index)? "grade-btn":"grade-btn-new"} onClick={()=>{
                      setgradebtn(index)
                      setgradeprice(data)
                      }}>{index}</button>
                      ))
                    }</div>
                  </div>
                  <div className="type-container">
                    <div className="type-text">Type</div>
                    <div className="type-btn-container">
                      <button className={(curr_type==0)? "type-btn":"type-btn-new"} onClick={()=>{
                       setcurrtype(1)
                      }}>Sheet</button>
                      <button className={(curr_type==1)? "type-btn":"type-btn-new"} onClick={()=>{
                       setcurrtype(0)
                      }}>Granular</button>
                    </div>
                  </div>
                  <div className="quantity-container">
                    <input type="number" defaultValue={curr_quantity} onChange={(e)=>{
                     setcurrquantity(e.currentTarget.value)
                    }}/>
                    <div className="quantity-text">:Pack</div>
                  </div>
                  <div className="price-buy-container"> 
                   <div className="total-price-container">Total : {grade_price*curr_quantity} INR</div>
                  <button className="buy-btn" onClick={()=>{
                    settotalprice(grade_price*curr_quantity)
                    setpopupchange(1)

                  }}>Buy Now</button>
                  </div>
                
                </div>

              </div>
            </div>
            <div className={(popupchange===1)?"final-buy":"blank"}>
              <input type="text" placeholder='Name'/>
              <input type="number" placeholder='Number'/>
              <input type="text" placeholder='UPI ID' />
              <div className="final-total">Total : {total_price} INR</div>
              <div className="final-but-btn">
                <button className='cancel-btn' onClick={()=>{
                  setpopupchange(0)
                }}>Cancel</button>
                <button className='buy-btn' onClick={()=>{
                  setpopupchange(2)
                }}>Confirm</button>
              </div>
            </div>
            <div className={(popupchange===2)?"Done":"blank"}>
              <div className="purchased-text">Your order is successfully placed</div>
            <button className='Done-btn' onClick={()=>{
              setpopupchange(0)
              updateaddbtn(0)
            }}>Okay</button></div>
            
          </div>
          <div className="third-page">
            <div className="third-page-heading">What's special about us</div>
            <div className="third-page-content">
              <div className="third-page-text">
              <div className="textline"><span className='Points'>• Flexible Ordering:</span>The ability to order plastic materials in various<br></br> quantities without minimum order constraints.</div>
              <div className="textline"><span className='Points'>• Cost-Effective Solutions:</span>Affordable pricing that makes recycled <br></br> materials an attractive option compared to traditional sources.</div>
              <div className="textline"><span className='Points'>• Online Ordering Facilities:</span>Convenient online platforms for placing <br></br> orders, ensuring ease of use and accessibility.</div>
              <div className="textline"><span className='Points'>• Eco-Friendly Practices:</span>Alignment with businesses and individuals<br></br>  committed to sustainability and eco-friendly initiatives.</div>
              <div className="textline"><span className='Points'>• Community and Environmental Impact:</span>A project that contributes <br></br> positively to the environment, such as planting trees for every
100<br></br> units of  plastic recycled, may appeal to those with a social and<br></br> environmental conscience.</div>
              </div>
              <div className="third-page-photo"></div>
            </div>
          </div>
          <div className="fourth-page">
            <div className="fourth-page-heading"> 3 Major Principles</div>
            <div className="fourth-page-content">
              <div className="message-cards">
                <div className="message-heading">REDUCE</div>
                <div className="message-text">
"Reduce" is a pivotal concept in waste management, advocating for the minimization of waste production at its source. This principle emphasizes the importance of adopting practices that result in fewer materials being consumed and less waste being generated. By promoting strategies such as prevention, efficiency, and sustainable consumption, societies can significantly reduce their environmental footprint. </div>
                </div>
              <div className="message-cards">
              <div className="message-heading">REUSE</div>
                <div className="message-text">"Reuse" is a cornerstone principle in waste management, advocating for the extended use of products and materials before they are discarded. It emphasizes finding creative ways to give items a second life through repair, refurbishment, or repurposing. By encouraging practices such as using refillable containers, donating unwanted items, or purchasing second-hand goods, societies can reduce waste generation and conserve resources.</div>
              </div>
              <div className="message-cards">
              <div className="message-heading">RECYCLE</div>
                <div className="message-text">
"Recycle" is a core tenet of waste management, focusing on the collection, sorting, and processing of materials to create new products or raw materials. This principle involves diverting waste from landfills and incinerators by transforming it into valuable resources. By recycling materials like paper, glass, metal, plastics, and electronics, societies can conserve natural resources, reduce energy consumption, and minimize environmental pollution. </div>
              </div>
            </div>
            <div className="email-div">
            <input type="text" placeholder='Ecoconv123@gmail.com' />
            <button>Email Us</button>
            </div>
           
          </div>
        </div>
      </div>
    </>
  )
}


export default App

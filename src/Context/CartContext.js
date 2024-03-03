import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';

// export const cartContext = useContext();
export const cartContext = createContext();


export default function CartContextProvider({children}) {

  const {myToken} = useContext( AuthContext )

  const [numOfCartItems, setNumOfCartItems] = useState(0)
  const [totalCartPrice , setTotalCartPrice] = useState(0)
  const [allProducts, setAllProducts] = useState(null)
  // const [cartId, setCartId] = useState(null)

  console.log( 'allProducts' , allProducts);
  
  async function addProductToCart(id){
  const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart' ,
  { "productId": id},{ headers:{token: localStorage.getItem('tkn')}
  }).then( (res)=>{
    console.log('res' , res.data);
    // setNumOfCartItems(res.data.numOfCartItems);
    // setTotalCartPrice(res.data.data.totalCartPrice );
    // setAllProducts(res.data.data.allProducts);
    getUserCart()
    
    return true;
  } ).catch( (err)=>{
    console.log( 'err' ,  err );
    return false;

  } )
  }



  function getUserCart(){
    axios.get('https://ecommerce.routemisr.com/api/v1/cart' , {
      headers: {token: localStorage.getItem('tkn')}
    }).then((res)=>{
      console.log( 'res' , res.data );
      setAllProducts(res.data.data.products)
      setNumOfCartItems(res.data.data.numOfCartItems)
      setTotalCartPrice(res.data.data.totalCartPrice)
    })
    .catch((err)=>{

      console.log( "err " , err);

    })
  }



  async function updateCount(id , newCount){
    const booleanFlag = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
    "count": newCount
  } , {
    headers: {
      token: localStorage.getItem('tkn')
    }
  })
  .then((res)=>{
    setTotalCartPrice(res.data.data.totalCartPrice)
    setAllProducts(res.data.data.products)
    setNumOfCartItems(res.data.numOfCartItems)

    return true;
  })
  .catch((err)=>{
    console.log('err' , err);

    return false;

  })

  return booleanFlag
  }

  async function deleteProduct(id){
    const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
      headers: {token: localStorage.getItem('tkn')}
    })
    .then((res)=>{

      setTotalCartPrice(res.data.data.totalCartPrice)
      setAllProducts(res.data.data.products)
      setNumOfCartItems(res.data.numOfCartItem)

      return true;
    })
    .catch((err)=>{
      console.log( 'err' , err);

      return false
      
    })

    return res
  }

  useEffect(()=>{
    console.log('get user data');
    getUserCart()
  } , [ myToken ])


  

  return <cartContext.Provider value={{ 
    addProductToCart,
    numOfCartItems,
    totalCartPrice,
    allProducts,
    updateCount,
    deleteProduct
  }} >
  

  {children}
  
  
  </cartContext.Provider>
}


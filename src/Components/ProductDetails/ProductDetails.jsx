import axios from 'axios';
import React, { useContext } from 'react'
import { CirclesWithBar } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {

  // const {addProductToCart} = useContext(cartContext)
  // const {addProductToCart} = useContext( cartContext )
  const {addProductToCart} = useContext( cartContext)

  // console.log('addProductToCart' , addProductToCart);

  async function addMyProduct(id){
    const res = await addProductToCart(id);


    if(res) {
      // console.log('Added Successfully');
      toast.success('Added Successfully' , {duration:1500 , position:'top-right'})
    }
    else{
      // console.log('Error occurred..');
      toast.error('Error occurred..' , {duration:1500 , position:'top-right'})
    }
  }




  const {id} = useParams();

  function getProductDetials(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  const {data , isLoading , isError} = useQuery(`productDetails-${id}` , getProductDetials);

  if( isLoading){
    return <div className='d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center' > 
    <CirclesWithBar
    height="150"
    width="150"
    color="#fff"
    outerCircleColor="#fff"
    innerCircleColor="#fff"
    barColor="#fff"
    ariaLabel="circles-with-bar-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    />
    </div>
  }

  if(isError){
    return <Navigate to='/products' />
  }

  const ProductDetials = data?.data.data;

  return <>
  <div className="container mt-2">
    <div className="row align-items-center">
      <div className="col-md-3">
        <figure>
          <img className='w-100' src={ProductDetials.imageCover} alt={ProductDetials.title} />
        </figure>
      </div>
      <div className="col-md-9">
        <h1>{ProductDetials.title}</h1>
        <p>{ProductDetials.description}</p>
        <p className='text-main fw-bold' >{ProductDetials.category.name}</p>
        <div className='d-flex justify-content-between' >
          {/* <p>{ProductDetials.price + ' EGP'}</p> */}
          {ProductDetials.priceAfterDiscount ? <p > <span className='text-decoration-line-through' > {ProductDetials.price + ' EGP'} </span>  - {ProductDetials.priceAfterDiscount + ' EGP'} </p> : <p>{ProductDetials.price + ' EGP'}</p> }  
          <p> <i style={{color:'yellowgreen'}} className='fa-solid fa-star' ></i> {ProductDetials.ratingsAverage}</p>
        </div>
        <button onClick={()=>addMyProduct(ProductDetials.id)} className='btn bg-main text-white w-100' >Add to cart</button>
      </div>
    </div>
  </div>
  </>
}

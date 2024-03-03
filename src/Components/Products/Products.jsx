import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CirclesWithBar } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import SimpleSlider from '../HomeSlider/HomeSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function Products() {

  const {addProductToCart} = useContext( cartContext )

  async function addMyProduct( id ){

    const res = await addProductToCart( id );
    if(res) {
      // console.log('Added Successfully');
      toast.success('Added Successfully' , { position:'top-right'})
    }
    else{
      // console.log('Error occurred..');
      toast.error('Error occurred..' , { position:'top-right'})
    }
  }

  



  // const [allProducts , setAllProducts ] = useState( null )


  async function getAllProducts(){

    return await axios.get('https://ecommerce.routemisr.com/api/v1/products')

    // await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    // .then( (res)=>{
    //   setAllProducts(res.data.data)
    // } )
    // .catch( (err)=>{
    //   console.log( err);
    // } )
  }


  const {data , isLoading} = useQuery('getAllProducts' , getAllProducts ,{
    // refetchOnMount: false  kda yaany ana msh 3ayez y3ml fetch tany lw el API bta3y static
    // refetchInterval:2000  kda lw ana 3ayez y3mly refetching wana gwa el page mn 8er ay naviagtion
    refetchInterval: 2000,
    // cacheTime:2000 kda lw ana 3ayez b3d sanyten el cashing yroh f lma arg3 tany el API hy3ml reload
  }
  )
  // console.log( data.data.data );

  // useEffect(function(){
  //   getAllProducts()
  // } , [])

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
  return <>

<div className="container p-2">

    <div className="row my-4 ">
      <div className="col-md-9">
      <SimpleSlider />
      </div>
      <div className="col-md-3">
      <div>
        <img style={{height:'150px'}} className='w-100' src={require('../../images/grocery-banner.png')} alt="" />
      </div>
      <div>
        <img style={{height:'150px'}} className='w-100' src={require('../../images/grocery-banner-2.jpeg')} alt="" /></div>
      </div>
      </div>

      <CategorySlider />

    <div className=" products row mt-3 g-3">
      { data.data.data.map( (product , idx )=> {


      return <div key={idx} className="col-md-3 overflow-hidden">
        <Link className='product' to={`/productDetails/${product.id}`} >
        <div >
          <img src={ product.imageCover } className='w-100' alt="" />
          <h3 className='h6 text-main' >{product.category.name}</h3>
          <h2 className='h4 text-center'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
          <div className='d-flex justify-content-between' >
          
          <p > <span><i style={ {color: 'yellowgreen'}} className='fa-solid fa-star' ></i> </span> {product.ratingsAverage}</p>
          </div>
          {/* <p>{product.id}</p> */}
        </div>
        
        </Link>
        <button onClick={()=>addMyProduct(product.id)} className=' addBtn btn bg-main text-white m-auto d-block' >ADD TO CART</button>
      </div>}
      ) }
      
    </div>
  </div>


  {/* { allProducts ? <div className="container p-2">
    <div className="row g-3">
      { allProducts.map( (product , idx )=> <div key={idx} className="col-md-3">
        <div className="product">
          <img src={ product.imageCover } className='w-100' alt="" />
          <h3 className='h6 text-main' >{product.category.name}</h3>
          <h2 className='h4 text-center'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
          <div className='d-flex justify-content-between' >
          {product.priceAfterDiscount ? <p > <span className='text-decoration-line-through' > {product.price + ' EGP'} </span>  - {product.priceAfterDiscount + ' EGP'} </p> : <p>{product.price + ' EGP'}</p> }  
          <p > <span><i style={ {color: 'yellowgreen'}} className='fa-solid fa-star' ></i> </span> {product.ratingsAverage}</p>
          </div>
        </div>
      </div>
      ) }
      
    </div>
  </div> : <div className='d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center' > 
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
  </div> } */}


  
  </>
}

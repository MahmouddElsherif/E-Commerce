import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import { CirclesWithBar } from 'react-loader-spinner'
import toast from 'react-hot-toast'

export default function Cart() {

  const {updateCount,
    totalCartPrice,
    deleteProduct,
    allProducts } = useContext( cartContext )

    if(!allProducts){
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



    async function updateMyProductCount( id , newCount){
      const res = await updateCount( id , newCount );
      if(res){
        toast.success('product updated successfully' , {position:'top-center'})
      }
      else{
        toast.error('error ..' , {position:'top-center'})

      }
    }

    async function myDeletProduct(id){
      const res = await deleteProduct(id);
      if(res){
        toast.success('deleted successfull' , { position:'top-center'})
      }
      else{
        toast.error('Error ..' , { position:'top-center'})
      }
    }

  return <>

  <div className="container my-2">
    <h2>Shop Cart</h2>
    <h5>Total cart Price: {totalCartPrice} EGP</h5>

    {allProducts.map(( product , idx )=> <div key={idx} className="row border-1 border-bottom border-secondary py-2 align-items-center">
      <div className="col-md-1">

        <figure>
          <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
        </figure>

      </div>
      <div className="col-md-9">

        <article>
          <h3>{product.product.title}</h3>
          <h5>{'price:' + product.price}</h5>
          <button onClick={()=>{ myDeletProduct( product.product.id ) }} className='btn btn-outline-danger' >REMOVE</button>
        </article>

      </div>
      <div className="col-md-2">
        <div className='d-flex justify-content-between align-items-center' >
          <button onClick={()=> updateMyProductCount(product.product.id , product.count + 1 )} className='btn btn-outline-success' >+</button>
          <p>{product.count}</p>
          
          <button disabled={product.count == 1} onClick={()=> updateMyProductCount(product.product.id , product.count - 1 )} className='btn btn-outline-success' >-</button>
        </div>
      </div>
    </div> )}
    
  </div>
  
  
  
  
  
  
  </>
}

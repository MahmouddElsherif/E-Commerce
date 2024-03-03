import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { BallTriangle, Bars, Circles, ThreeCircles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

// const mySchema = Yup.object({
//   name:Yup.string().required('name is required').min( 3 , 'at least 3 char').max(8 , 'max 8 char'),
//   email: Yup.string().required('email is required').email(),
//   phone: Yup.string().required('phone is required'),
//   password: Yup.string().required('password is required').min( 6 , 'at least 6 char').max(12 , 'max 12 char'),
//   rePassword: Yup.string().oneOf([Yup.ref('password') ]),
// })


  export default function Register() {
    
    const userData = {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: '',
    }

    const myNavigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);
    const [errMessage, setErrMessage] = useState(undefined);



    async function mySubmit( values ){

    setIsLoading( true )
    
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values )
    .then( function(x){
      console.log( 'in case of succ' , x);
      setisSuccess(true);

      setTimeout(function(){
        setisSuccess(false)
        myNavigate('/products')
      } , 2000)
      setIsLoading( false)
      
    })
    .catch( function(err){
      // console.log( 'in case of error' , err.response.data.message);
      setErrMessage( err.response.data.message )
      setTimeout(function(){
        setErrMessage( undefined )
      } , 2000)
      setIsLoading( false)
    } )

  }
  
  const myFormik = useFormik({
    initialValues: userData,
    onSubmit: mySubmit,

    // validationSchema: mySchema

    validate: function( value ){
    
      const errors = {};

      const nameRegex = /^[A-Z][a-z]{3,8}$/
      const phoneRegex = /^01[0125][0-9]{8}$/

      if( nameRegex.test( value.name ) === false){
        errors.name= 'Name must be from 3 to 8 characters starts with capital letter'
      }

      if( value.email.includes('@') !== true ||  value.email.includes('.') !== true ){
        errors.email = 'Email must be in format'
      }

      if( phoneRegex.test( value.phone ) === false){
        errors.phone= 'Phone must be an Egyptian number'
      }

      if( value.password.length < 6 === true || value.password.length > 12 === true ){
        errors.password = 'password must be from 6 to 12'
      }

      if( value.rePassword !== value.password){
        errors.rePassword = 'Repassword does not match  password'
      }

    return errors;

    }

  })


  return <>
  <div className='w-75 m-auto p-5' >

    {isSuccess ? <div className='alert alert-success text-center' > congratulation your account has been created</div> : ''}
    { errMessage ? <div className='alert alert-danger text-center' > { errMessage } </div> : ''}
    <h2>Register:</h2>
    <form onSubmit={myFormik.handleSubmit} >
      <label htmlFor="name">Name:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} type="text" id='name' placeholder='UserName' className='form-control mb-3' />
      { myFormik.errors.name && myFormik.touched.name ? <div className='alert alert-danger' >{myFormik.errors.name}</div> : ''}
      
      <label htmlFor="email">email:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email" id='email' placeholder='Useremail' className='form-control mb-3' />
      { myFormik.errors.email && myFormik.touched.email ? <div className='alert alert-danger' >{myFormik.errors.email}</div> : ''}
      
      <label htmlFor="phone">phone:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} type="text" id='phone' placeholder='Userphone' className='form-control mb-3' />
      { myFormik.errors.phone && myFormik.touched.phone ? <div className='alert alert-danger' >{myFormik.errors.phone}</div> : ''}
      
      <label htmlFor="password">password:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password" id='password' placeholder='password' className='form-control mb-3' />
      { myFormik.errors.password && myFormik.touched.password ? <div className='alert alert-danger' >{myFormik.errors.password}</div> : ''}
      
      <label htmlFor="rePassword">rePassword:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} type="password" id='rePassword' placeholder='rePassword' className='form-control mb-3' />
      { myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className='alert alert-danger' >{myFormik.errors.rePassword}</div> : ''}
      <button type='submit'  className='btn bg-main p-2 rounded-3 text-white' >
        { isLoading ? <ThreeCircles
          visible={true}
          height="35"
          width="35"
          color="white"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          /> : "Register" }
        </button>
  </form>
  </div>
  
  
  
  
  
  
  
  
  
  </>
}

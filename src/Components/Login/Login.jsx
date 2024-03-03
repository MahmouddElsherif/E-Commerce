import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import {ThreeCircles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { AuthContext } from '../../Context/AuthContext';

// const mySchema = Yup.object({
//   name:Yup.string().required('name is required').min( 3 , 'at least 3 char').max(8 , 'max 8 char'),
//   email: Yup.string().required('email is required').email(),
//   phone: Yup.string().required('phone is required'),
//   password: Yup.string().required('password is required').min( 6 , 'at least 6 char').max(12 , 'max 12 char'),
//   rePassword: Yup.string().required('repassword is required').min( 6 , 'at least 6 char').max(12 , 'max 12 char'),
// })


  export default function Login() {
    
    const userData = {
      email: '',
      password: '',
    }

    const myNavigate = useNavigate();

    const { setToken } = useContext( AuthContext )

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);
    const [errMessage, setErrMessage] = useState(undefined);



    async function mySubmit( values ){

    setIsLoading( true )
    
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , values )
    .then( function(x){

      if( x.data.message == 'success'){

        // console.log( x.data.token);
        localStorage.setItem('tkn' , x.data.token)
        setToken( x.data.token )

        setisSuccess(true);

      setTimeout(function(){
        setisSuccess(false)
        myNavigate('/products')
      } , 2000)
      setIsLoading( false)
        
      }
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

      if( value.email.includes('@') !== true ||  value.email.includes('.') !== true ){
        errors.email = 'Email must be in format'
      }


      if( value.password.length < 6 === true || value.password.length > 12 === true ){
        errors.password = 'password must be from 6 to 12'
      }

    return errors;

    }

  })


  return <>
  <div className='w-75 m-auto p-5' >

    {isSuccess ? <div className='alert alert-success text-center' > Welcome Back</div> : ''}
    { errMessage ? <div className='alert alert-danger text-center' > { errMessage } </div> : ''}
    <h2>Login:</h2>
    <form onSubmit={myFormik.handleSubmit} >
      <label htmlFor="email">email:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email" id='email' placeholder='Useremail' className='form-control mb-3' />
      { myFormik.errors.email && myFormik.touched.email ? <div className='alert alert-danger' >{myFormik.errors.email}</div> : ''}

      <label htmlFor="password">password:</label>
      <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password" id='password' placeholder='password' className='form-control mb-3' />
      { myFormik.errors.password && myFormik.touched.password ? <div className='alert alert-danger' >{myFormik.errors.password}</div> : ''}
      <button type='submit'  className='btn bg-main p-2 rounded-3 text-white' >
        { isLoading ? <ThreeCircles
          visible={true}
          height="35"
          width="35"
          color="white"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          /> : "Login" }
        </button>
  </form>
  </div>
  
  
  
  
  </>
}

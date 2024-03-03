import React from 'react'
import notFoundImg from '../../images/error.svg'

export default function NotFound() {
  
  return <div className='d-flex justify-content-center align-items-center p-3' >

  <img src={notFoundImg} className='w-50' alt="" />
  
  </div>
}

import React from 'react'


export default function Footer() {
  
  return <>
  <div className='FooterDesign'>
  <div className="container p-4 ">
    <div>
      <h2>Get the FreshCart app</h2>
      <p>We will send you a link, open it on your  phone to download the app</p>
    </div>
    <div className="row my-2">
      <div className="col-md-10">
        <input type="email" className='form-control ' placeholder='Email ..'  />
      </div>
      <div className="col-md-2">
        <button className=' btn bg-main text-white ' >Share App Link</button>
      </div>
    </div>
  <div className='d-flex justify-content-between' >
  <div className='d-flex w-50 align-items-center' >
      <p className='me-2' >Payment Partners</p>
      <img className='logoDesign' src={require('../../images/mastercard-icon-2048x1225-3kb6axel.png')} alt="mastercard" />
      <img className='logoDesign' src={require('../../images/196539.png')} alt="American Express" />
      <img className='logoDesign' src={require('../../images/paypal-icon-2048x547-tu0aql1a.png')} alt="paypal" />
    </div>

    <div className='d-flex w-50 align-items-center ' >
      <p className='me-2' >Get deliveries with FreshCart</p>
      <a  target='_blank' href="https://play.google.com/store/games?hl=ar&gl=US">
      <img className='downloadDesign' src={require('../../images/1664287128google-play-store-logo-png.webp')} alt="Googleplay" />
      </a>
      <a target='_blank'  href="https://www.apple.com/eg-ar/app-store/">
      <img className='downloadDesign' src={require('../../images/app-store-icon-png-14.png')} alt="AppStore" />
      </a>

    </div>
  </div>

  </div>
  </div>
  
  
  
  
  </>
}

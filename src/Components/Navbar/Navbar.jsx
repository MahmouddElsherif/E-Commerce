import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../images/freshcart-logo.svg'
import { AuthContext } from '../../Context/AuthContext';
import { cartContext } from '../../Context/CartContext';

export default function Navbar() {


  const {myToken , setToken} = useContext( AuthContext )
  const navigate = useNavigate();
  const { numOfCartItems } = useContext(cartContext)


  function logout(){
    setToken( null );
    localStorage.removeItem('tkn');
    navigate('/login')

  }

  
  
  return <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/products">
      <img src={logo} alt="freshcart" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      {myToken ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {/* <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/products">Home</Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/products">Home</Link>
        </li>


        
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/categories">Categories</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/brands">Brands</Link>
        </li>

        <li className="nav-item position-relative ">
          <Link className="nav-link active" aria-current="page" to="/cart">Cart</Link>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          { numOfCartItems ? numOfCartItems : ''}
  </span>
        </li>
      </ul> : '' }
      



      <ul className="navbar-nav align-items-center ms-auto mb-2 mb-lg-0">

      <li className="nav-item">

        <ul role='button' className=' list-unstyled d-flex justify-content-between align-items-center ' >
          
          <li>
            <i className=' me-2 fa-solid fa-brands fa-facebook-f' ></i>
          </li>
          <li>
            <i className=' me-2 fa-solid fa-brands fa-instagram' ></i>
          </li>
          <li>
            <i className=' me-2 fa-brands fa-linkedin' ></i>
          </li>

          <li>
            <i className=' me-2 fa-solid fa-brands fa-twitter' ></i>
          </li>
        </ul>
        </li>

        { myToken ? <li className="nav-item">
          <span onClick={ logout } role='button' className="nav-link active" >Logout</span>
        </li>
        :<>
          <li className="nav-item">
            <Link className="nav-link active" to="login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="register">Register</Link>
          </li>
        </>}
      </ul>
      
    </div>
  </div>
</nav>

  </>
}

import React, { Fragment } from 'react'
import { FiShoppingCart, FiLogIn, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import UserOptions from './UserOptions'

const Header = ({User, isAuthenticated}) => {
  return (
    <Fragment>
      <nav id='nav'>
        <div className="logo"><h3>VR LIFESTYLE</h3></div>
        <div className="tabs">
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
              <Link to={"/products"}>Product</Link>
              <Link to={"/men"}>Men</Link>
              <Link to={"/women"}>Women</Link>
              <Link to={"/sale"}>Sale</Link>
            </li>
          </ul>
        </div>
        <div className="account">
          <ul>
            <li>
              <Link to={"/search"}>Search<FiSearch/></Link>
              <Link to={"/contact"}>Contact</Link>
              <Link to={"/cart"}>Cart <FiShoppingCart /></Link>
              {!isAuthenticated && <Link to={"/login"}>SignIn<FiLogIn /></Link>}
            </li>
          </ul>
        </div>
        <div className="profile" style={!isAuthenticated ? {display: "none"} : {display: "block"}}>
              {isAuthenticated &&  <UserOptions user={User}/>}
        </div>
      </nav>
    
    </Fragment>
  )
}

export default Header

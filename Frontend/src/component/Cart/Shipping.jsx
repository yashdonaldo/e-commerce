import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Shipping.scss';
import { Country, State } from 'country-state-city';
import CheckoutStep from './CheckoutStep';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { saveShippingInfo } from '../../actions/CartAction';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';


const Shipping = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { shippingInfo } = useSelector((state) => state.Cart)
  const { isAuthenticated } = useSelector((state) => state.LoginUser)

  const [firstName, setFirstName] = useState(shippingInfo.firstName)
  const [lastName, setLastName] = useState(shippingInfo.lastName)
  const [address, setAddress] = useState(shippingInfo.address)
  const [appartment, setAppartment] = useState(shippingInfo.appartment)
  const [city, setCity] = useState(shippingInfo.city)
  const [state, setState] = useState(shippingInfo.state)
  const [country, setCountry] = useState(shippingInfo.country)
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

  const head = document.getElementById("nav")
  const para = window.location.pathname
  
  if(para === "/login/shipping"){
    head.style.display = "none"
  }

  const shippingSubmit = (e) => {
    e.preventDefault();
    
    if(phoneNo.length < 10 || phoneNo.length > 10){
      toast.warning("Phone Number Should Be 10 digit long");
      return
    }

    dispatch(saveShippingInfo({firstName, lastName, address, appartment, city, state, country, pinCode, phoneNo}))
      navigate("/order/confirm")
  }

  return (
    <Fragment>
      <MetaData tittle={"Shipping Details"}/>
      <ToastContainer hideProgressBar={true} position='top-center' autoClose={2000}/>
      <CheckoutStep activeStep={0} />
      <div className="shipping-Container">
        <div className="shipping-Box">
          <h2 className="shippingDetails">Shipping Details</h2>

          <form encType='multipart/form-data' onSubmit={shippingSubmit}>

            <div className="form-group" id='name'>
              <input type="text" id="name" name="name" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              <input type="text" id="name" name="name" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>

            <div className="form-group">
              <input type="address" id="address" name="address" value={address} placeholder='Address' onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="form-group">
              <input type="address" value={appartment} placeholder='Appartment, suite, etc, (optional)' onChange={(e) => setAppartment(e.target.value)} />
            </div>
            <div className="form-group">
              <input type="number" value={phoneNo} placeholder='Mobile No.' onChange={(e) => setPhoneNo(e.target.value)} required />
            </div>

            <div className="form-group">
              <select required value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Country</option>
                {Country && Country.getAllCountries().map((item) => (
                  <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                ))}
              </select>
            </div>

            {country && (
              <div className="form-group">
                <select required value={state} onChange={(e) => setState(e.target.value)}>
                  <option value="">State</option>
                  {State && State.getStatesOfCountry(country).map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                  ))}
                </select>
                <input type="text" placeholder='City' onChange={(e) => setCity(e.target.value)} value={city} />
                <input type="text" value={pinCode} placeholder='PinCode' onChange={(e) => setPinCode(e.target.value)} />
              </div>
            )}

            <button type="submit">Continue</button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Shipping

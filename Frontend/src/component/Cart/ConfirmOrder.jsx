import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData';
import CheckoutStep from './CheckoutStep';
import './ConfirmOrder.scss'
import { useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {
  const navigate = useNavigate()
  const { shippingInfo, cartItem } = useSelector((state) => state.Cart);
  const dispatch = useDispatch()

  const head = document.getElementById("nav")
  const para = window.location.pathname
  
  if(para === "/order/confirm"){
    head.style.display = "none"
  }

  const subTotal = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  )
  const shipping = subTotal > 1000 ? 0 : 100
  const tax = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity * 10 / 100, 0
  )
  const totalPrice = shipping + tax + subTotal

  const checkoutHandle = ()=>{
    const data = {
      subTotal,
      shipping,
      tax,
      totalPrice
    }
    sessionStorage.setItem("orderInfo", JSON.stringify(data))
    navigate("/process/payment")
}

  console.log(shippingInfo)
  return (
    <Fragment>
      <MetaData tittle={"Confirm Order"} />
      <CheckoutStep activeStep={1} />
      <div className="ConfirmOrderContainer">
        <div className="orderInfo">
          <div className="shipping-info">
            <h3>Shipping Info</h3>
            <p><span>Name: </span>{`${shippingInfo.firstName} ${shippingInfo.lastName}`}</p>
            <p><span>Phone: </span>{shippingInfo.phoneNo}</p>
            <p><span>Address: </span>{`${shippingInfo.address} ${shippingInfo.country} ${shippingInfo.state} ${shippingInfo.city} ${shippingInfo.pinCode}`}</p>
          </div>
          <div className="cartItem">
            <h3>Your Cart Items:</h3>
            {cartItem && cartItem.map((item) => (
              <div className="cart-item" key={item.product}>
                <img src={item.image} alt="image" />
                <div className="name">
                  <span style={{ fontWeight: "bold" }}>{item.name}</span>
                </div>
                <div className="price">
                  <p style={{ fontWeight: "bold" }}>{`${item.quantity} X ${item.price} = ${item.quantity * item.price}`}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

        <div className="checkout">
          <div className="checkout-heading">
            <h3>Order Summary</h3>
          </div>
          <div className="checkout-price">
            <div className="cart-price1">
              <h4>Subtotal</h4>
              <p>{`₹${subTotal}`}</p>
            </div>
            <div className="cart-price2">
              <h4>Shipping estimate?</h4>
              <p>{`₹${shipping}`}</p>
            </div>
            <div className="cart-price3">
              <h4>Tax estimate(18% inc. all GST)</h4>
              <p>{`₹${tax}`}</p>
            </div>
          </div>
          <div className="cart-price4">
            <h4>Order Total</h4>
            <p>{`₹${totalPrice}`}</p>
          </div>

          <div className="button">
            <button onClick={checkoutHandle}>Procced to Payment</button>
          </div>
        </div>
      </div>
    </Fragment >
  )
}

export default ConfirmOrder

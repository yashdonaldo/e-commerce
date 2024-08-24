import React, { Fragment } from 'react'
import './Cart.scss';
import CartItemCard from './CartItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Cart = () => {

    const { cartItem } = useSelector((state) => state.Cart)
    const { isAuthenticated } = useSelector((state) => state.LoginUser)
    const navigate = useNavigate()
    const subTotal = cartItem.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    )
    const shipping = cartItem.reduce(
        (acc, item) => acc + 50, 0
    )
    const tax = cartItem.reduce(
        (acc, item) => acc + item.price*item.quantity * 10/100, 0
    )
    const checkoutHandle = ()=>{
        if(isAuthenticated){
            navigate("/login?redirect=shipping")
        }else{
            toast.info("Please First Login to Place Order")
        }
    }
    return (
        <Fragment>
            {cartItem.length === 0 ? (
                <div className="no-cart">
                    <span><MdRemoveShoppingCart /></span>
                    <h3>No Products in Your Cart</h3>
                    <Link to={"/products"}>View Products</Link>
                </div>
            ) : (
                <Fragment>
                    <MetaData tittle={"Cart Items"}/>
                    <ToastContainer position='top-center' />
                    <div className="cart-page">
                        <div className="heading">
                            <h1>Your Cart</h1>
                        </div>
                        <div className="cart-item-page">
                            <div className="cart-item-collection">


                                <div className="cart-item">
                                    {cartItem && cartItem.map((item) => <CartItemCard key={item.product} item={item} />)}


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
                                        <h4>Shipping estimate</h4>
                                        <p>{`₹${shipping}`}</p>
                                    </div>
                                    <div className="cart-price3">
                                        <h4>Tax estimate</h4>
                                        <p>{`₹${tax}`}</p>
                                    </div>
                                </div>
                                <div className="cart-price4">
                                    <h4>Order Total</h4>
                                    <p>{`₹${subTotal + shipping + tax}`}</p>
                                </div>

                                <div className="button">
                                    <button onClick={checkoutHandle}>Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart

import React, { Fragment, useEffect } from 'react'
import "./OrderDetails.scss";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../layout/Loading';
import MetaData from '../layout/MetaData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getOrderDetails } from '../../actions/OrderAction';

const OrderDetail = () => {
    const { order, error, loading: orderloading } = useSelector((state) => state.orderDetail);

    const dispatch = useDispatch();
    const params = useParams();
    console.log(order, orderloading)
    
    useEffect(()=> {
        if(error){
            toast.error(error)
        }
        dispatch(getOrderDetails(params.id))
    },[dispatch, params.id])

    return (
        <Fragment>
            {orderloading ? (<Loading />) : (
                <Fragment>
                    <ToastContainer position='top-center' hideProgressBar={true} autoClose={2000} />
                    <MetaData tittle={"Order Details"} />
                    <div className="OrderDetailsContainer">
                        <h2 style={{ textAlign: "center", color: "red", marginTop: "15px" }}>Order #{order && order.data.order._id}</h2>
                        <div className="orderDetailsInfo">
                            <div className="shipping-info">
                                <h3>Shipping Info</h3>
                                <p><span>Name: </span>{order.data.order.shippingInfo && `${order.data.order.shippingInfo.firstName} ${order.data.order.shippingInfo.lastName}`}</p>
                                <p><span>Phone: </span>{order.data.order.shippingInfo && order.data.order.shippingInfo.phoneNo}</p>
                                <p><span>Address: </span>{order.data.order.shippingInfo &&
                                    `${order.data.order.shippingInfo.address}, ${order.data.order.shippingInfo.country}, ${order.data.order.shippingInfo.state}, ${order.data.order.shippingInfo.city}, ${order.data.order.shippingInfo.pinCode}`}</p>
                            </div>
                            <div className="Payment-info">
                                <h3>Payment Info</h3>
                                <p
                                    className={
                                        order.data.order.paymentInfo &&
                                            order.data.order.paymentInfo.status === "succsss"
                                            ? "greenColor"
                                            : "redColor"
                                    }>
                                    {order.data.order.paymentInfo &&
                                        order.data.order.paymentInfo.status === "succsss"
                                        ? "PAID"
                                        : "NOT PAID"
                                    }
                                </p>

                                <p>Amount: <span>{order.data.order && order.data.order.totalPrice}</span></p>
                            </div>

                            <div className="Payment-info">
                                <h3>Order Status</h3>
                                <p
                                    className={
                                        order.data.order.orderStatus &&
                                            order.data.order.orderStatus === "Delivered"
                                            ? "greenColor"
                                            : "redColor"
                                    }>
                                    {
                                        order.data.order.orderStatus
                                    }
                                </p>
                            </div>
                            <div className="OrderDetailsItem">
                                <h3>Your Order Details:</h3>
                                {order && order.data.order.orderItems.map((item) => (
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
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default OrderDetail

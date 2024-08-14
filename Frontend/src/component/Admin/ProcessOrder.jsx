import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData';
import '../Cart/ConfirmOrder.scss'
import './ProcessOrder.scss'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { MdAccountTree } from "react-icons/md";
import Loading from '../layout/Loading';
import { getOrderDetails, updateOrder } from '../../actions/OrderAction';
import { Alert } from '@mui/material';
import { updateOrderAction } from '../../Reducer/OrderReducer';

const ProcessOrder = () => {
    const params = useParams()
    const { order, error, loading } = useSelector((state) => state.orderDetail);
    const { isUpdated, error: updateError, loading:updateLoading } = useSelector((state) => state.updateOrder);
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState("")

    const processOrderHandle = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("status", status);

        dispatch(updateOrder(params.id, myForm))
    }

    useEffect(() => {
        if (error) {
            setOpen(true);
            setTimeout(() => {
                setOpen(false)
            }, 4000);
        }
        if(updateError){
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                dispatch(updateOrderAction.Update_Order_Clear_Errors())
            }, 4000);
        }
        if(isUpdated){
            setOpen(true);
            setTimeout(() => {
                setOpen(false)
                dispatch(updateOrderAction.Update_Order_Reset())
            }, 4000);
        }
        dispatch(getOrderDetails(params.id))
    }, [dispatch, isUpdated, error, updateError, setOpen])

    return (
        <Fragment>
            <MetaData tittle={"Process Order"} />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading && updateLoading ? <Loading /> : (
                        <div className="ConfirmOrderContainer">
                            <div className="orderInfo" style={order.data.order.orderStatus === "Delivered" ? {width: '100%'} : {width: "70%"}}>
                            {open ? <Alert severity={isUpdated ? "success" : "error"}>{isUpdated ? "Order Update Successfully" : error || updateError}</Alert> : ("")}
                                <div className="shipping-info">
                                    <h3>Process Order</h3>
                                    <p><span>Name: </span>{order.data.order.shippingInfo && `${order.data.order.shippingInfo.firstName} ${order.data.order.shippingInfo.lastName}`}</p>
                                    <p><span>Phone: </span>{order.data.order.shippingInfo && order.data.order.shippingInfo.phoneNo}</p>
                                    <p><span>Address: </span>{order.data.order.shippingInfo &&
                                        `${order.data.order.shippingInfo.address}, ${order.data.order.shippingInfo.country}, ${order.data.order.shippingInfo.state}, ${order.data.order.shippingInfo.city}, ${order.data.order.shippingInfo.pinCode}`}</p>


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


                                <div className="cartItem">
                                    <h3>Your Cart Items:</h3>
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

                            <div className="checkout" style={order.data.order.orderStatus === "Delivered" ? {display: 'none'} : {display: "block"}}>
                                <div className="checkout-heading">
                                    <h3>Order Status</h3>
                                </div>
                                <form encType='multipart/form-data' className="crateProductForm" onSubmit={processOrderHandle}>
                                    <div>
                                        <MdAccountTree />
                                        <select name="category" id="" onChange={(e) => setStatus(e.target.value)}>
                                            <option value="Processing">Order Status</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button type='submit'>Update</button>

                                </form>
                            </div>
                        </div>
                    )}

                </div>
            </div>

        </Fragment >
    )
}

export default ProcessOrder

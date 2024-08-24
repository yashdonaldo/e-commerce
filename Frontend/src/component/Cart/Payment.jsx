import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { clearErrors, createOrder } from '../../actions/OrderAction'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"

const Payment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector((state) => state.Order)
  const { shippingInfo, cartItem } = useSelector((state) => state.Cart)
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
  const amount = orderInfo.totalPrice;

  const userOrder = {
    shippingInfo,
    orderItems: cartItem,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shipping,
    totalPrice: amount,
  }

  const orderData = async () => {
    const { data: { key } } = await axios.get("/api/v1/getkey")

    const order = await axios.post("/api/v1/process/payment", {
      amount
    });

    const options = {
      key,
      amount: order.data.myOrder.amount,
      currency: "INR",
      name: "Yash Donaldo",
      description: "Pay to Confirm Your Order",
      image: "https://avatars.githubusercontent.com/u/132053601?v=4",
      order_id: order.data.myOrder.id, 
      // callback_url: "/api/v1/paymentvarification",
      handler: async function (response) {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json"
            },
          };
          const { data } = await axios.post("/api/v1/paymentvarification", response, config)
          if(data.success == true){
            userOrder.paymentInfo={
              id: response.razorpay_payment_id,
              status: data.status
            }

            dispatch(createOrder(userOrder))
            navigate("/paymentsuccess")
          }
          
        } catch (error) {
          console.log(error)
        }
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        "color": "#3399cc"
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();

  }


  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    orderData()
  }, [error, toast, dispatch])


  return (
    <>
      <ToastContainer position='top-center' hideProgressBar={true} autoClose={2000} />
    </>
  )
}

export default Payment

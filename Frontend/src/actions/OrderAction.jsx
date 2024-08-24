import { allOrderAction, deleteOrderAction, myOrderAction, orderAction, orderDetailsAction, updateOrderAction } from "../Reducer/OrderReducer";
import axios from 'axios';

// Create Order
export const createOrder = (order)=> async(dispath,getstate)=>{
    try {
        dispath(orderAction.CREATE_ORDER_REQUEST());

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        const {data} = await axios.post("/api/v1/order/new",order,config);
        dispath(orderAction.CREATE_ORDER_SUCCESS(data))
    } catch (error) {
        // dispath(orderAction.CREATE_ORDER_FAIL(error.responce.data.message))
    }
}

// Clear Error
export const clearErrors = () => async(dispath)=>{
    dispath(orderAction.CLEAR_ERROR());
    dispath(myOrderAction.CLEAR_ERROR());
    dispath(orderDetailsAction.CLEAR_ERROR());
}

// My Orders
export const myOrders = ()=> async(dispath)=>{
    try {
        dispath(myOrderAction.MY_ORDER_REQUEST());

        const {data} = await axios.get("/api/v1/orders/me");
        dispath(myOrderAction.MY_ORDER_SUCCESS({data}))
    } catch (error) {
        dispath(myOrderAction.MY_ORDER_FAIL(error.responce.data.message))
    }
}

// Get Orders Details
export const getOrderDetails = (id)=> async(dispatch)=>{
    try {
        dispatch(orderDetailsAction.ORDER_DETAILS_REQUEST());

        const {data} = await axios.get(`/api/v1/order/${id}`);
        dispatch(orderDetailsAction.ORDER_DETAILS_SUCCESS({data}))
    } catch (error) {
        dispatch(orderDetailsAction.ORDER_DETAILS_FAIL(error.responce.data.message))
    }
}

// Get All Orders
export const getAllOrders = ()=> async(dispath)=>{
    try {
        dispath(allOrderAction.All_Order_Request());

        const {data} = await axios.get("/api/v1/admin/orders");
        dispath(allOrderAction.All_Order_Success(data))
    } catch (error) {
        dispath(allOrderAction.All_Order_Fail(error.responce.data.message))
    }
}

// Update Order
export const updateOrder = (id, orderData)=> async(dispath,getstate)=>{
    try {
        dispath(updateOrderAction.Update_Order_Request());

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        const {data} = await axios.put(`/api/v1/admin/order/${id}`,orderData,config);
        dispath(updateOrderAction.Update_Order_Success(data))
    } catch (error) {
        dispath(updateOrderAction.Update_Order_Fail(error.responce.data.message))
    }
}

// Delete Order
export const deleteOrder = (id)=> async(dispath,getstate)=>{
    try {
        dispath(deleteOrderAction.Delete_Order_Request());

        const data = await axios.delete(`/api/v1/admin/order/${id}`);
        dispath(deleteOrderAction.Delete_Order_Success(data))
    } catch (error) {
        dispath(deleteOrderAction.Delete_Order_Fail(error.responce.data.message))
    }
}


import { createSlice } from "@reduxjs/toolkit";

// Order
const orderReducer = createSlice({
    name: "order",
    initialState: {loading: false, order: {}, error: null},
    reducers: {
        CREATE_ORDER_REQUEST : (state, actions)=>{
            state.loading = true
        },
        CREATE_ORDER_SUCCESS: (state, actions)=>{
            state.order = actions.payload,
            state.loading = false
        },
        CREATE_ORDER_FAIL : (state, actions)=>{
            state.loading = true,
            state.error = actions.payload
        },
        CLEAR_ERROR : (state, actions)=>{
            state.error = null
        }
    }
});

// My Orders
const myOrderReducer = createSlice({
    name: "myOrder",
    initialState: {loading: false, orders: {}, error: null},
    reducers: {
        MY_ORDER_REQUEST: (state, actions)=>{
            state.loading = true
        },
        MY_ORDER_SUCCESS: (state, actions)=>{
            state.loading = false,
            state.orders = actions.payload.data
        },
        MY_ORDER_FAIL: (state, actions)=>{
            state.loading = true,
            state.error = actions.payload
        },
        CLEAR_ERROR : (state, actions)=>{
            state.error = null
        }
    }
})

// Order Details
const orderDetailsReducer = createSlice({
    name: "orderDetails",
    initialState: {loading: true, order: {}, error: null},
    reducers: {
        ORDER_DETAILS_REQUEST : (state, actions)=>{
            state.loading = true
        },
        ORDER_DETAILS_SUCCESS: (state, actions)=>{
            state.order = actions.payload,
            state.loading = false
        },
        ORDER_DETAILS_FAIL : (state, actions)=>{
            state.loading = true,
            state.error = actions.payload
        },
        CLEAR_ERROR : (state, actions)=>{
            state.error = null
        }
    }
});

// Order {Admin}
const allOrderReducer = createSlice({
    name: "all Order",
    initialState: {loading: true, orders: null, error: null},
    reducers: {
        All_Order_Request: (state, actions)=> {
            state.loading = true
        },
        All_Order_Success: (state, actions)=> {
            state.orders = actions.payload.order
            state.loading = false
        },
        All_Order_Fail: (state, actions)=> {
            state.error = actions.payload
            state.loading = false
        },
        All_Order_Clear_Errors: (state, actions)=> {
            state.error = null
        },
    }
})


// Update Order {Admin}
const updateOrderReducer = createSlice({
    name: "update Order",
    initialState: {loading: true, isUpdated: null, error: null},
    reducers: {
        Update_Order_Request: (state, actions)=> {
            state.loading = true
        },
        Update_Order_Success: (state, actions)=> {
            state.isUpdated = actions.payload
            state.loading = false
        },
        Update_Order_Fail: (state, actions)=> {
            state.error = actions.payload
            state.loading = false
        },
        Update_Order_Reset : (state, actions) => {
            state.isUpdated = null
        },
        Update_Order_Clear_Errors: (state, actions)=> {
            state.error = null
        },
    }
})

// Delete Order {Admin}
const deleteOrderReducer = createSlice({
    name: "Delete Order",
    initialState: {loading: true, isDeleted: false, error: null},
    reducers: {
        Delete_Order_Request: (state, actions)=> {
            state.loading = true
        },
        Delete_Order_Success: (state, actions)=> {
            state.loading = false
            state.isDeleted = true
        },
        Delete_Order_Fail: (state, actions)=> {
            state.error = actions.payload
            state.loading = false
        },
        Delete_Order_Reset : (state, actions) => {
            state.isDeleted = false
        },
        Delete_Order_Clear_Errors: (state, actions)=> {
            state.error = null
        },
    }
})



export const orderAction = orderReducer.actions;
export const myOrderAction = myOrderReducer.actions;
export const orderDetailsAction = orderDetailsReducer.actions;
export const allOrderAction = allOrderReducer.actions;
export const updateOrderAction = updateOrderReducer.actions;
export const deleteOrderAction = deleteOrderReducer.actions;


export { orderReducer, myOrderReducer, orderDetailsReducer, allOrderReducer, updateOrderReducer, deleteOrderReducer }
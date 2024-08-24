import { createSlice } from '@reduxjs/toolkit'

const CartReducer = createSlice({
    name: "CartReducer",
    initialState: { cartItem: localStorage.getItem("cartitem") ? JSON.parse(localStorage.getItem("cartitem")) : [], shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}, },
    reducers: {
        ADD_TO_CART: (state, actions) => {
            const item = actions.payload;
            const isItemExist = state.cartItem.find((i) => i.product === item.product)
            if (isItemExist) {
                return {
                    ...state,
                    cartItem: state.cartItem.map((i) =>
                        i.product === isItemExist.product ? item : i
                    )
                }
            } else {
                return {
                    ...state,
                    cartItem: [...state.cartItem, item]
                }
            }
        },
        REMOVE_CART_ITEM: (state, actions) => {
            return {
                ...state,
                cartItem: state.cartItem.filter((i) => i.product !== actions.payload),

            }
        },

        SHIPPING_INFO: (state, actions) => {
            return {
                ...state,
                shippingInfo: actions.payload.shippingInfo
            }
        },

    }
})

export const CartReducerAction = CartReducer.actions;
export { CartReducer }
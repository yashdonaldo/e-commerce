import axios from 'axios';
import { CartReducerAction } from '../Reducer/CartReducer';


// Add to a Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getstate) => {

    const { data } = await axios.get(`/api/v1/product/${id}`)

    dispatch(CartReducerAction.ADD_TO_CART({
        product: data.product._id,
        name: data.product.name,
        price: data.product.Price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity

    }));

    localStorage.setItem("cartitem", JSON.stringify(getstate().Cart.cartItem));

};

// Remove a Cart
export const removeCart = (id) => async (dispatch, getstate) => {
    dispatch(CartReducerAction.REMOVE_CART_ITEM(id))


    localStorage.setItem("cartitem", JSON.stringify(getstate().Cart.cartItem));
}

// Save Shipping Info
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch(CartReducerAction.SHIPPING_INFO({
        shippingInfo: data,
    }))

    localStorage.setItem("shippingInfo", JSON.stringify(data));
}

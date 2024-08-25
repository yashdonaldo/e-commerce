import axios from 'axios'
import { ProductAction, ProductDetailsAction, NewReviewAction, AdminProductAction, CreateProductAction, DeleteProductAction, updateProductAction, AllReviewAction, deleteReviewAction } from '../Reducer/ProductReducer'

const url = "https://e-commerce-backend-fra4.onrender.com"

// Get Product Action
export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
    try {
        dispatch({
            type: ProductAction.ALL_PRODUCT_REQUEST()
        })
        let link = `${url}/api/v1/product?keyword=${keyword}&page=${currentPage}&Price[gte]=${price[0]}&Price[lte]=${price[1]}&ratings[gte]=${ratings}`

        if (category) {
            link = `${url}/api/v1/product?keyword=${keyword}&page=${currentPage}&Price[gte]=${price[0]}&Price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`

        }

        const data = await axios.get(link);

        console.log(data)

        dispatch(ProductAction.ALL_PRODUCT_SUCCESS({
            product: data.data.product,
            productsCount: data.data.productCount,
            resultPerPage: data.data.resultPerPage,
            filteredProductsCount: data.data.filteredProductsCount
        })
        )
    } catch (error) {
        dispatch({
            type: ProductAction.ALL_PRODUCT_FAIL({
                payload: error.response.data.message
            }),
        })
    }
}


// Get ProductDetails Action
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(ProductDetailsAction.PRODUCT_DETAILS_REQUEST())

        const data = await axios.get(`${url}/api/v1/product/${id}`);

        dispatch(ProductDetailsAction.PRODUCT_DETAILS_SUCCESS({
            product: data.data.product,
        })
        )
    } catch (error) {
        dispatch({
            type: ProductDetailsAction.PRODUCT_DETAILS_FAIL({
                payload: error.response
            }),
        })
    }
}

// New Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: NewReviewAction.NEW_REVIEW_REQUEST()
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const data = await axios.put(`${url}/api/v1/review`, reviewData, config);

        dispatch(NewReviewAction.NEW_REVIEW_SUCCESS({
            review: data.success,
        })
        )
    } catch (error) {
        dispatch(NewReviewAction.NEW_REVIEW_FAIL({
            payload: error.response.data.message
        }),
        )
    }
}

// Get All Products Admin
export const getAllProdcutAdmin = () => async(dispatch) =>{
    try {
        dispatch(AdminProductAction.Admin_Product_Request())
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const data = await axios.get(`${url}/api/v1/admin/products`, config);

        dispatch(AdminProductAction.Admin_Product_Success({
            payload: data.data.products
        }))

    } catch (error) {
        dispatch(AdminProductAction.Admin_Product_Fail({
            payload : error
        }))
    }
}

// Create Product {Admin}
export const CreateProduct = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: CreateProductAction.Admin_Create_Product_Request()
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const data = await axios.post(`${url}/api/v1/admin/product/new`, productData, config);

        dispatch(CreateProductAction.Admin_Create_Product_Success(data))
    } catch (error) {
        dispatch(CreateProductAction.Admin_Create_Product_Fail({
            payload: error.response.data.message
        }),
        )
    }
}


// Delete Product {Admin}
export const deleteProduct = (id) => async(dispatch) => {
    try {
        dispatch(DeleteProductAction.Delete_Product_Request());

        const data = await axios.delete(`${url}/api/v1/admin/product/${id}`);


        dispatch(DeleteProductAction.Delete_Product_Success(data));
    } catch (error) {
        dispatch(DeleteProductAction.Delete_Product_Fail({
            payload : error.response.data.message
        }));
    }
}

// Updaate Product {Admin}
export const updateProduct = (id, productData) => async(dispatch) => {
    try {
        dispatch(updateProductAction.Update_Product_Request());

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const data = await axios.put(`${url}/api/v1/admin/product/${id}` ,productData, config);

        dispatch(updateProductAction.Update_Product_Success(data));
    } catch (error) {
        dispatch(updateProductAction.Update_Product_Fail({
            payload : error.response.data.message
        }));
    }
}

// Get All Review {Admin}
export const getAllReviews = (id) => async(dispatch) =>{
    try {
        dispatch(AllReviewAction.All_Review_Request())

        const data = await axios.get(`${url}/api/v1/reviews?id=${id}`);

        dispatch(AllReviewAction.All_Review_Success(data.data.reviews))

    } catch (error) {
        dispatch(AllReviewAction.All_Review_Fail({
            payload : error.response.data.message
        }))
    }
}


// Delete Review {Admin}
export const deleteReview = (ProductId, reviewId) => async(dispatch) =>{
    try {
        dispatch(deleteReviewAction.Delete_Review_Request())

        const data = await axios.delete(`${url}/api/v1/reviews?productId=${ProductId}&id=${reviewId}`);

        dispatch(deleteReviewAction.Delete_Review_Success(data.data.success))

    } catch (error) {
        dispatch(deleteReviewAction.Delete_Review_Fail({
            payload : error.response.data.message
        }))
    }
}
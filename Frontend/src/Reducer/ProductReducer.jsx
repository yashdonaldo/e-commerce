import { createSlice } from "@reduxjs/toolkit"


const Product = createSlice({
    name: "product",
    initialState: { product: [], productsCount: 0, loading: false, resultPerPage: 0, filteredProductsCount: 0 },
    reducers: {
        ALL_PRODUCT_REQUEST: (state, actions) => {
            return {
                loading: true,
                product: []
            }
        },

        ALL_PRODUCT_SUCCESS: (state, actions) => {
            const merge = actions.payload.product
            state.product = merge
            state.productsCount = actions.payload.productsCount
            state.loading = true
            state.resultPerPage = actions.payload.resultPerPage
            state.filteredProductsCount = actions.payload.filteredProductsCount

        },
        ALL_PRODUCT_FAIL: (state, actions) => {
            return {
                loading: false,
                errors: actions.payload
            }
        },
        ALL_PRODUCT_CLEAR_ERRORS: (state, actions) => {
            state.error = null
        }

    }
});

const ProductDetails = createSlice({
    name: "productDetails",
    initialState: { product: [], loading: false },
    reducers: {
        PRODUCT_DETAILS_REQUEST: (state, actions) => {
            state.loading = true
        },
        PRODUCT_DETAILS_SUCCESS: (state, actions) => {
            state.product = actions.payload.product
            state.loading = false
        },
        PRODUCT_DETAILS_FAIL: (state, actions) => {
            return {
                loading: false,
                errors: actions.payload
            }
        },
        CLEAT_DETAILS_ERRORS: (state, actions) => {
            return {
                ...state,
                error: null
            }
        }
    }
});

const NewReview = createSlice({
    name: "Review",
    initialState: { review: {}, loading: true, error: null },
    reducers: {
        NEW_REVIEW_REQUEST: (state, actions) => {
            state.loading = true
        },
        NEW_REVIEW_SUCCESS: (state, actions) => {
            state.review = actions.payload.review
            state.loading = false
        },
        NEW_REVIEW_FAIL: (state, actions) => {
            state.loading = true,
            state.error = actions.payload
        },
        NEW_REVIEW_CLEAR_ERRORS: (state, actions) => {
            state.error = null
        }
        
    }
});

// Product List For Admin
const AdminProductReducer = createSlice({
    name: "adminProduct",
    initialState: {loading : true, products: [], error: null},
    reducers: {
        Admin_Product_Request: (state, actions)=>{
            state.loading = true
        },
        Admin_Product_Success: (state, actions)=>{
            state.loading = false
            state.products = actions.payload.payload
        },
        Admin_Product_Fail: (state, actions)=>{
            state.loading = true
            state.error = actions.payload.error
        },
    }
});

// New Product Reducer {Admin}
const CrateProductReducerAdmin = createSlice({
    name: "CreateProduct",
    initialState: {loading : true, products: {}, error: null, success: false},
    reducers: {
        Admin_Create_Product_Request: (state, actions)=>{
            state.loading = true
        },
        Admin_Create_Product_Success: (state, actions)=>{
            state.loading = false
            state.products = actions.payload
            state.success = true
        },
        Admin_Create_Product_Fail: (state, actions)=>{
            state.loading = true
            state.error = actions.payload.payload
        },
        Admin_Create_Product_Reset: (state, actions)=>{
            state.success = false
        },
        Admin_Clear_Errors: (state, actions)=>{
            state.error = null
        }
    }
});

// Delete Product Reducer {Admin}
const deleteProductReducer = createSlice({
    name: "deleteProduct",
    initialState: {loading: true, isDeleted: null, error: null},
    reducers: {
        Delete_Product_Request: (state,actions)=>{
            state.loading = true
        },
        Delete_Product_Success: (state, actions)=>{
            state.loading = false
            state.isDeleted = actions.payload.data.msg
        },
        Delete_Product_Fail: (state, actions)=>{
            state.error = actions.payload
        },
        Delete_Product_Reset: (state, actions)=>{
            state.isDeleted = null
        },
        Delete_Product_Clear_Errors: (state, actions)=>{
            state.error = null
        },
    }
});

// Update Product Reducer {Admin}
const updateProductReducer = createSlice({
    name : "updateProduct",
    initialState: {loading: true, isUpdated: null, error: null},
    reducers: {
        Update_Product_Request : (state, actions)=> {
            state.loading = true
        },
        Update_Product_Success : (state, actions)=> {
            state.isUpdated = actions.payload
        },
        Update_Product_Fail : (state, actions)=> {
            state.error = actions.payload.payload
        },
        Update_Product_Clear_Errors : (state, actions)=> {
            state.error = null
        },
        Update_Product_Reset : (state, actions) => {
            state.isUpdated = null
        }
    }
});


// All Review
const AllReviewReducer = createSlice({
    name: "Product Review",
    initialState: {loading : true, reviews: [], error: null},
    reducers: {
        All_Review_Request: (state, actions) =>{
            state.loading = true
        },
        All_Review_Success: (state, actions) =>{
            state.loading =false
            state.reviews = actions.payload
        },
        All_Review_Fail: (state, actions) =>{
            state.loading = false
            state.error = actions.payload.payload
        },
        All_Review_Clear_Error: (state, actions) =>{
            state.error = null
        },
    }
})

// Delete Review
const DeleteReviewReducer = createSlice({
    name: "Product Review",
    initialState: {loading : true, isDeleted: null, error: null},
    reducers: {
        Delete_Review_Request: (state, actions) =>{
            state.loading = true
        },
        Delete_Review_Success: (state, actions) =>{
            state.loading = false
            state.isDeleted = actions.payload
        },
        Delete_Review_Fail: (state, actions) =>{
            state.loading = false
            state.error = actions.payload.payload
        },
        Delete_Review_Reset: (state, actions) =>{
            state.loading = false
            state.isDeleted = null
        },
        Delete_Review_Clear_Error: (state, actions) =>{
            state.loading =false
            state.error = null
        },
    }
})


export const ProductAction = Product.actions;
export const ProductDetailsAction = ProductDetails.actions;
export const NewReviewAction = NewReview.actions;
export const AdminProductAction = AdminProductReducer.actions;
export const CreateProductAction = CrateProductReducerAdmin.actions;
export const DeleteProductAction = deleteProductReducer.actions;
export const updateProductAction = updateProductReducer.actions;
export const AllReviewAction = AllReviewReducer.actions;
export const deleteReviewAction = DeleteReviewReducer.actions;

export { Product, ProductDetails, NewReview, AdminProductReducer, CrateProductReducerAdmin, deleteProductReducer, updateProductReducer, AllReviewReducer, DeleteReviewReducer }
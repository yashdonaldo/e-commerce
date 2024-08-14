import { configureStore } from '@reduxjs/toolkit'
import { allUserReducer, deleteUserReducer, ForgotPassword, LoginUser, ProfieUpdate, ResetPassword, UpdatePassword, updateUserReducer, userDetailReducer} from './Reducer/UserReducer'
import { CartReducer } from './Reducer/CartReducer'
import { allOrderReducer, deleteOrderReducer, myOrderReducer, orderDetailsReducer, orderReducer, updateOrderReducer } from './Reducer/OrderReducer'
import { AdminProductReducer, AllReviewReducer, CrateProductReducerAdmin, deleteProductReducer, DeleteReviewReducer, NewReview, Product, ProductDetails, updateProductReducer } from './Reducer/ProductReducer'


const createStore = configureStore({
    reducer: {
        Store: Product.reducer,
        Product_Details: ProductDetails.reducer,
        LoginUser: LoginUser.reducer,
        // LoadUser: LoadUser.reducer,
        ProfieUpdate: ProfieUpdate.reducer,
        UpdatePassword: UpdatePassword.reducer,
        ForgotPassword : ForgotPassword.reducer,
        ResetPassword : ResetPassword.reducer,
        Cart : CartReducer.reducer,
        Order: orderReducer.reducer,
        myOrder: myOrderReducer.reducer,
        orderDetail: orderDetailsReducer.reducer,
        newReview: NewReview.reducer,
        AdminProducts: AdminProductReducer.reducer,
        CreateProduct: CrateProductReducerAdmin.reducer,
        DeleteProduct: deleteProductReducer.reducer,
        UpdateProduct: updateProductReducer.reducer,
        allOrder : allOrderReducer.reducer,
        updateOrder : updateOrderReducer.reducer,
        deleteOrder : deleteOrderReducer.reducer,
        allUser : allUserReducer.reducer,
        userDetail : userDetailReducer.reducer,
        updateUser : updateUserReducer.reducer,
        deleteUser : deleteUserReducer.reducer,
        allReview : AllReviewReducer.reducer,
        deleteReview : DeleteReviewReducer.reducer,
    }
})

export default createStore;
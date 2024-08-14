import React, { Fragment } from 'react';
import "./Styling/App.scss"
import Header from './component/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './component/Home/Home';
import ProductDetails from './component/ProductDetails/ProductDetails';
import Product from './component/Product/Product';
import Search from './component/layout/Search';
import LoginSignUp from './component/User/LoginSignUp';
import Store from './Store'
import { LoadUser } from './actions/UserActions';
import { useSelector } from 'react-redux'
import Account from './component/User/Account';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile'
import UpdatePaasword from './component/User/UpdatePaasword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword'
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import SuccessPage from './component/Cart/SuccessPage';
import MyOrders from './component/Order/MyOrders'
import OrdersDetail from './component/Order/OrderDetail';
import Dashboard from './component/Admin/Dashboard';
import ProductAdd from './component/Admin/ProductAdd'
import ProductList from './component/Admin/ProductList'
import UpdateProduct from './component/Admin/UpdateProduct'
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UserList from './component/Admin/UserList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReview from './component/Admin/ProductReview';


export default function App() {
  const {isAuthenticated, user } = useSelector((state) => state.LoginUser)
  React.useEffect(() => {
    Store.dispatch(LoadUser())
  }, [])

  return (
    <Fragment>
      <Router>
        <Header isAuthenticated={isAuthenticated} User={user} />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/product/:id' element={<ProductDetails />}></Route>
          <Route exact path='/products' element={<Product />}></Route>
          <Route path='/products/:keyword' element={<Product />}></Route>
          <Route exact path='/search' element={<Search />}></Route>
          <Route exact path='/login' element={<LoginSignUp />}></Route>
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route exact path="/password/reset/:token" element={<ResetPassword />} />
          <Route exact path="/cart" element={<Cart />} />

          {/* Longin User Route */}
          <Route exact path="/account" element={<ProtectedRoute Component={Account} />} />
          <Route exact path="/paymentsuccess" element={<ProtectedRoute Component={SuccessPage} />} />
          <Route exact path="/me/update" element={<ProtectedRoute Component={UpdateProfile} />} />
          <Route exact path="/password/update" element={<ProtectedRoute Component={UpdatePaasword} />} />
          <Route exact path="/login/shipping" element={<ProtectedRoute Component={Shipping} />} />
          <Route exact path="/process/payment" element={<ProtectedRoute Component={Payment} />} />
          <Route exact path="/order/me" element={<ProtectedRoute Component={MyOrders} />} />
          <Route exact path="/order/confirm" element={<ProtectedRoute Component={ConfirmOrder} />} />
          <Route exact path="/order/:id" element={<ProtectedRoute Component={OrdersDetail} />} />

          {/* Admin Routes */}
          <Route exact path="/admin/dashboard" element={<ProtectedRoute Component={Dashboard} isAdmin={true} />} />
          <Route exact path="/admin/product/list" element={<ProtectedRoute Component={ProductList} isAdmin={true} />} />
          <Route exact path="/admin/product/create" element={<ProtectedRoute Component={ProductAdd} isAdmin={true} />} />
          <Route exact path="/admin/product/:id" element={<ProtectedRoute Component={UpdateProduct} isAdmin={true} />} />
          <Route exact path="/admin/orders" element={<ProtectedRoute Component={OrderList} isAdmin={true} />} />
          <Route exact path="/admin/order/:id" element={<ProtectedRoute Component={ProcessOrder} isAdmin={true} />} />
          <Route exact path="/admin/users" element={<ProtectedRoute Component={UserList} isAdmin={true} />} />
          <Route exact path="/admin/users/:id" element={<ProtectedRoute Component={UpdateUser} isAdmin={true} />} />
          <Route exact path="/admin/reviews/:id" element={<ProtectedRoute Component={ProductReview} isAdmin={true} />} />
        </Routes>
      </Router>
    </Fragment>
  )
}

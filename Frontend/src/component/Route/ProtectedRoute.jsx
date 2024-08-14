import React, { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Account from '../User/Account'
import Loading from '../layout/Loading'
import { toast } from 'react-toastify'

const ProtectedRoute = (props) => {

    const { Component, isAdmin } = props
    const navigate = useNavigate()
    const { isAuthenticated, loading, user } = useSelector((state) => state.LoginUser)

    if (isAdmin == true && user.role !== "admin") {
        navigate("/account")
    }
    return (
        <Fragment>
            {isAuthenticated ? <Component /> : navigate("/login")};
        </Fragment>
    )
}

export default ProtectedRoute

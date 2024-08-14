import React, { Fragment, useEffect } from 'react'
import './SuccessPage.scss'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const SuccessPage = () => {
    const param = useSearchParams()
    const head = document.getElementById("nav")
    const para = window.location.pathname

    if(para === "/paymentsuccess"){
        head.style.display = "flex"
    }

    return (
        <Fragment>
            <div className="success-page">
                <h1> Your Payment is Successfull!</h1>
                {/* <p>{`Your Reference No. = ${}`}</p> */}
                <p>We'll Deliver Your Order Soon</p>
                <Link to={"/order/me"}>Track Order</Link>
            </div>
        </Fragment>
    )
}

export default SuccessPage

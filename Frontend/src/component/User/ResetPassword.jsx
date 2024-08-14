import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { clearErrors, resetPassword } from '../../actions/UserActions'
import { useNavigate, useParams } from 'react-router-dom'
import { FaLock, FaUnlock } from "react-icons/fa";
import './ResetPassword.scss'
import MetaData from '../layout/MetaData'
import Loading from '../layout/Loading'




const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const param = useParams()

    const { success, error, loading } = useSelector((state) => state.ResetPassword)


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const ResetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData()

        myForm.set("password", password)
        myForm.set("confirmPassword", confirmPassword)

        dispatch(resetPassword(param.token ,myForm))
        console.log("hello")
    }


    useEffect(() => {
        if (error) {
            toast.error(error.message)
            dispatch(clearErrors())
        }
        if (success) {
            toast.success("Password Updated Successfully")
            navigate("/login")
        }
    }, [dispatch, error, success, navigate, toast])
    return (
        <Fragment>
            <MetaData tittle="Change Password" />

            {loading ? (<Loading />) : (
                <Fragment>
                    <ToastContainer position='top-center' />
                    <div className='ResetPasswordContainer'>
                        <div className="LoginSignUpBox">
                            <h2 style={{ textAlign: "center", marginTop: "20px" }}>Update Password</h2>
                            <form className='signUpFrom' encType='multipart/form-data' onSubmit={ResetPasswordSubmit}>

                                <div className="loginPassword">
                                    <FaUnlock />
                                    <input type="password" placeholder='New Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="loginPassword">
                                    <FaLock />
                                    <input type="password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>

                                <input type="submit" value="Update" className='signUpBtn' />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ResetPassword

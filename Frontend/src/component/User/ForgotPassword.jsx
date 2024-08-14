import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { clearErrors, forgotPassword } from '../../actions/UserActions'
import { useNavigate } from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import './ForgotPassword.scss'
import MetaData from '../layout/MetaData'
import Loading from '../layout/Loading'

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { Message, error, loading } = useSelector((state) => state.ForgotPassword)

    const [ email , setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData()

        myForm.set("email", email)

        dispatch(forgotPassword(myForm))
    }

    useEffect(() => {

        if (error) {
            toast.error(error.payload)
            dispatch(clearErrors())
        }
        if (Message) {
            toast.success(Message)  
        }
    }, [dispatch, error, Message, toast])
    
    return (
        <Fragment>
            <MetaData tittle="Forgot Password" />

            {loading ? (<Loading />) : (
                <Fragment>
                    <ToastContainer position='top-center' />
                    <div className='forgotPasswordContainer'>
                        <div className="LoginSignUpBox">
                            <h2 style={{ textAlign: "center", marginTop: "20px" }}>Forgot Password</h2>
                            <form className='signUpFrom' encType='multipart/form-data' onSubmit={forgotPasswordSubmit}>
                                <div className="signUpEmail">
                                    <MailOutlineIcon />
                                    <input type="text" name="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <input type="submit" value="Send" className='signUpBtn' />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ForgotPassword

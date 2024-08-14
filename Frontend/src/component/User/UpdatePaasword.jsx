import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { clearErrors, UpdatePassword } from '../../actions/UserActions'
import { useNavigate } from 'react-router-dom'
import { UpdatePasswordAction } from '../../Reducer/UserReducer'
import { FaLock, FaUnlock } from "react-icons/fa";
import './UpdatePassword.scss'
import MetaData from '../layout/MetaData'
import Loading from '../layout/Loading'
import { MdVpnKey  } from 'react-icons/md'


const UpdatePaasword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isUpdated, error, loading } = useSelector((state) => state.UpdatePassword)


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const UpdatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData()

        myForm.set("oldPassword", oldPassword)
        myForm.set("newPassword", newPassword)
        myForm.set("confirmPassword", confirmPassword)

        dispatch(UpdatePassword(myForm))
    }


    useEffect(() => {
        if (error) {
            toast.error(error.message)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            // toast.success("Profile Updated Successfully")
            navigate("/account")
            // dispatch(UpdatePasswordAction.UpdatePasswordReset())
        }
    }, [dispatch, error, isUpdated, navigate,])
    return (
        <Fragment>
            <MetaData tittle="Change Password" />

            {loading ? (<Loading />) : (
                <Fragment>
                    <ToastContainer position='top-center' />
                    <div className='UpdatePasswordContainer'>
                        <div className="LoginSignUpBox">
                            <h2 style={{ textAlign: "center", marginTop: "20px" }}>Change Password</h2>
                            <form className='signUpFrom' encType='multipart/form-data' onSubmit={UpdatePasswordSubmit}>

                                <div className="loginPassword">
                                    < MdVpnKey />
                                    <input type="password" placeholder='Old Password' required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                </div>
                                <div className="loginPassword">
                                    <FaUnlock />
                                    <input type="password" placeholder='New Password' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                <div className="loginPassword">
                                    <FaLock />
                                    <input type="password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>

                                <input type="submit" value="Change" className='signUpBtn' />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default UpdatePaasword

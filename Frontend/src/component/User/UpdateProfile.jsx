import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { LoadUser, clearErrors, updateProfile } from '../../actions/UserActions'
import { useNavigate } from 'react-router-dom'
import { updateProfileAction } from '../../Reducer/UserReducer'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './UpdateProfile.scss'
import MetaData from '../layout/MetaData'
import Loading from '../layout/Loading'


const UpdateProfile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.LoginUser)
    const { isUpdated, error, loading } = useSelector((state) => state.ProfieUpdate)


    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState('/profile.png')

    const UpdateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData()

        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("avatar", avatar)

        dispatch(updateProfile(myForm))
    }

    const UpdateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }

        if (error) {
            toast.error(error.message)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            // toast.success("Profile Updated Successfully")
            dispatch(LoadUser())
            navigate("/account")        
            dispatch(updateProfileAction.UpdateprofileReset())
        }
    }, [dispatch, error, isUpdated, navigate, user, toast])

    return (
        <Fragment>
            <MetaData tittle="Update Profile" />

            {loading ? (<Loading />) : (
                <Fragment>
                    <ToastContainer position='top-center' />
                    <div className='UpdateProfileContainer'>
                        <div className="LoginSignUpBox">
                            <h2 style={{ textAlign: "center", marginTop: "20px" }}>Update Profile</h2>
                            <form className='signUpFrom' encType='multipart/form-data' onSubmit={UpdateProfileSubmit}>
                                <div className="signUpName">
                                    <AccountCircleIcon />
                                    <input type="text" placeholder='Name' required name='name' value={name} onChange={(e)=> setName(e.target.value)} />
                                </div>
                                <div className="signUpEmail">
                                    <MailOutlineIcon />
                                    <input type="text" name="email" placeholder='Email' required value={email} onChange={(e)=> setEmail(e.target.value)} />
                                </div>
                                <div id="UpdateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input type="file" name="avatar" accept='image/*' onChange={UpdateProfileDataChange} />
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

export default UpdateProfile

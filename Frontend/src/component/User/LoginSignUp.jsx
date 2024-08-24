import React, { Fragment, useEffect, useRef, useState, } from 'react';
import { useNavigate } from 'react-router-dom'
import "./LoginSignUp.scss"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { LoadUser, Register, clearErrors, login } from '../../actions/UserActions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../layout/Loading'
import { UserAction } from '../../Reducer/UserReducer';

const LoginSignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthenticated, error, loading} = useSelector((state) => state.LoginUser)
    const loginTab = useRef(null);
    const registerTab = useRef(null)
    const SwitchTab = useRef(null)

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const { name, email, password } = user;
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState("/profile.png")

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData()

        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("password", password)
        myForm.set("avatar", avatar)

        dispatch(Register(myForm))
    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const SwitchTabs = (e, tab) => {
        if (tab === "Login") {
            SwitchTab.current.classList.add("shiftTutorial")
            SwitchTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }
        if (tab === "Register") {
            SwitchTab.current.classList.remove("shiftTutorial")
            SwitchTab.current.classList.add("shiftToRight")

            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }
    }

    const redirect = location.search ? location.search.split("=")[1] : "/account"
    useEffect(() => {
        if (error) {
            toast.info(error.payload)
            dispatch(UserAction.Clear_Error())
        }
        if(isAuthenticated) {
            navigate(redirect)
        }
    }, [dispatch, error, isAuthenticated, navigate, toast])

    return (
        <Fragment>
            {loading ? (<Loading />) : (
                <Fragment>
                    <ToastContainer position='top-center' hideProgressBar={true} autoClose={2000} />
                    <div className='LoginSignUpContainer'>
                        <div className="LoginSignUpBox">
                            <div className="login-setup-toggle">
                                <p onClick={(e) => SwitchTabs(e, "Login")}>Login</p>
                                <p onClick={(e) => SwitchTabs(e, "Register")}>Register</p>
                            </div>
                            <button ref={SwitchTab}></button>

                            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                    <MailOutlineIcon />
                                    <input type="email" placeholder='Email' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />

                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input type="password" placeholder='Password' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                </div>
                                <Link to="/password/forgot">Forgot Password?</Link>
                                <input type="submit" value="Login" className='loginBtn' />
                            </form>


                            <form className='signUpFrom' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
                                <div className="signUpName">
                                    <AccountCircleIcon />
                                    <input type="text" placeholder='Name' required name='name' value={name} onChange={registerDataChange} />
                                </div>
                                <div className="signUpEmail">
                                    <MailOutlineIcon />
                                    <input type="text" name="email" placeholder='Email' required value={email} onChange={registerDataChange} />
                                </div>
                                <div className="signUpPassword">
                                    <LockOpenIcon />
                                    <input type="password" name='password' placeholder='Password' required value={password} onChange={registerDataChange} />
                                </div>
                                <div id="registerImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input type="file" name="avatar" accept='image/*' onChange={registerDataChange} />
                                </div>
                                <input type="submit" value="Register" className='signUpBtn' />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>

    )
}

export default LoginSignUp

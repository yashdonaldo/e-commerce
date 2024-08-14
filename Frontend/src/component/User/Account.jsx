import {React, Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../layout/Loading'
import { LoadUser } from '../../actions/UserActions'




const Account = () => {
    const dispatch = useDispatch()
    const {isAuthenticated, loading,user} = useSelector((state)=>{
        return state.LoginUser
    })
    const navigate = useNavigate()

    const changePassword = ()=>{
        if(isAuthenticated){
        navigate("/password/update")
        }else{
            navigate("/login")
        }
    }

    useEffect(()=>{

        if(isAuthenticated === false){
            navigate("/login")
        }
    }, [isAuthenticated, navigate ])
    return (
        <Fragment>
            {loading ? (<Loading />) : (
                <Fragment>
                    <MetaData tittle={`${user.name}'s Profile`} />
                    <div className='profileContainer'>
                        <div>
                            <h1>My Profile</h1>
                            <img src={ user.avatar.url} alt={user.name} />
                            <Link to={"/me/update"}>Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{user.createdAt}</p>
                            </div>
                            <div>
                                <Link to="/orders">My Orders</Link>
                                <button onClick={changePassword}>Change Password</button>
                            </div>
                        </div>
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}

export default Account

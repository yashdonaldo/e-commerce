import React, { Fragment, useState } from 'react'
import {Backdrop, SpeedDial, SpeedDialAction } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux'
import { Logout } from '../../actions/UserActions';

const UserOptions = ({user}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const options = [
        {icon: <ListAltIcon/>, name:"Orders", func:Orders},
        {icon: <AccountCircleIcon/>, name:"Profile", func:account},
        {icon: <ExitToAppIcon/>, name:"LogOut", func:logoutUser},
    ];

    if(user.role === "admin"){
        options.unshift({icon: <DashboardIcon/>, name:"DashBoard", func: dashboard})
    }

    function dashboard(){
        navigate("/admin/dashboard")
    }
    function Orders(){
        navigate("/order/me")
    }
    function account(){
        navigate("/account")
    }
    function logoutUser(){
        dispatch(Logout())
        toast.success("LogOut Successfully")
        navigate("/")
    }
  return <Fragment>
    <Backdrop open={open} style={{zIndex: "10"}}/>
    <SpeedDial 
        ariaLabel='SpeedDial tooltip example'
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        className='userProfile'
        style={{zIndex : "16"}}
        direction='down'
        icon={
            <img className='speedDialIcon' src={user.avatar? user.avatar.url: "/profile.png"} alt='profile' />
        }
    >
        {options.map((item)=>(
            <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
        ))}
    </SpeedDial>
    <ToastContainer position='top-center' />
  </Fragment>
}

export default UserOptions

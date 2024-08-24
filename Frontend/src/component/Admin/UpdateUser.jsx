import React, { Fragment, useEffect, useState } from 'react';
import './ProductAdd.scss';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { MdEmail, MdVerifiedUser, MdPeople } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
import { useNavigate, useParams } from 'react-router-dom';
import { updateUserAction, UserDetailsAction } from '../../Reducer/UserReducer';
import { getUserDetail, updateUser } from '../../actions/UserActions';
import Loading from '../layout/Loading'

const UpdateUser = () => {
  const dispatch = useDispatch();
  const params = useParams()
  const navigate = useNavigate()

  const { error, loading, user } = useSelector((state) => state.userDetail)
  const { error: updateError, loading: updateLoading, isUpdated } = useSelector((state) => state.updateUser)

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");


  useEffect(() => {
    if (user && user._id !== params.id) {
      dispatch(getUserDetail(params.id))
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role)
    }

    if (error) {
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
        dispatch(UserDetailsAction.User_Details_Clear_Error())
      }, 4000)
    }
    if (updateError) {
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
        dispatch(updateUserAction.Update_User_Clear_Error())
      }, 4000)
    }

    if (isUpdated) {
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
        dispatch(updateUserAction.Update_User_Reset())
        navigate("/admin/users")
      }, 4000);
    }
  }, [dispatch, error, isUpdated, updateError, setOpen, user]);


  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(params.id, myForm))
  }

  return (
    <Fragment>
      <MetaData tittle={"Create Product"} />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (<Loading />) : (
            <form encType='multipart/form-data' className="crateProductForm" onSubmit={updateUserSubmitHandler} style={{width: "50%", height: "80%"}}>
              {open ? <Alert severity={isUpdated ? "success" : "error"}>{isUpdated ? "User Update Successfully" : error}</Alert> : ("")}
              <h1>Update User</h1>
              <div>
                <MdPeople />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='User Name' />
              </div>
              <div>
                <MdEmail />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='User Email' />
              </div>
              <div>
                <MdVerifiedUser />
                <select name="category" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option>Set Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button type='submit' disabled={role === "" ? true : false} style={{cursor: "pointer"}}>Update</button>

            </form>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateUser

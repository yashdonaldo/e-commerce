import React, { Fragment, useEffect, useState } from 'react'
import './ProdcutList.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { Alert, Button } from '@mui/material';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { DataGrid } from '@mui/x-data-grid'
import { deleteProduct, getAllProdcutAdmin } from '../../actions/ProductActions';
import Loading from '../layout/Loading'
import { DeleteProductAction } from '../../Reducer/ProductReducer';
import { deleteUser, getAllUser } from '../../actions/UserActions';
import { deleteUserAction } from '../../Reducer/UserReducer';

const UserList = () => {
    const dispatch = useDispatch();

    const { error, users, loading } = useSelector((state) => state.allUser)
    const { error:deleteError , isDeleted, message } = useSelector((state) => state.deleteUser)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null)

    const deleteProductHandle = (id)=>{
        dispatch(deleteUser(id))
    }


    useEffect(() => {
        if (error) {
            setOpen(true)
            setValue(error)

            setTimeout(() => {
                setOpen(false)
                setValue(null)
            }, 4000);
        }
        if(deleteError){
            setOpen(true)
            setValue(deleteError)

            setTimeout(() => {
                setOpen(false)
                dispatch(deleteUserAction.Delete_User_Clear_Error())
            }, 4000);
        }

        if(isDeleted){
            setOpen(true)
            setValue(message)

            setTimeout(() => {
                setOpen(false)
                setValue(null)
                dispatch(deleteUserAction.Delete_User_Reset())
            }, 4000);
        }

        dispatch(getAllUser())
    }, [error, isDeleted, deleteError, setOpen, setValue]);

    const coloumns = [
        { field: "img", headerName: "Image", minWidth: 200, flex: 0.5, sortable: false, 
          renderCell: (img) => {
            return (
              <Fragment>
                <img src={img.row.img} alt="" srcset="" />
              </Fragment>
            )
          }
        },
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
        { field: "role", headerName: "Role" , minWidth: 150, flex: 0.3, cellClassName: (params)=>{
            return params.row.role === "admin" ? "greenColor" : "redColor";
        } },
        { field: "email", headerName: "Email", minWidth: 200, flex: 0.5 },
        {
            field: "action", headerName: "Actions", minWidth: 150, sortable: false, type: "number",
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/users/${params.id}`}> <Edit /> </Link>

                        <Button onClick={()=> deleteProductHandle(params.id)}><Delete /></Button>
                    </Fragment>
                )
            }
        },
    ];

    const rows = [];

    users && users.forEach((item) => {
        rows.push({
            img: item.avatar.url,
            id: item._id,
            role: item.role,
            name: item.name,
            email: item.email,
        })
    });

    return (
        <Fragment>
            <MetaData tittle={"All Users - Admin"} />
            <div className="dashboard">
                <Sidebar />

                <div className="productListContainer">
                    {loading ? (<Loading />) : (
                        <Fragment>
                            {open? (<Alert severity={isDeleted ? "success" : "error"} style={{position: "sticky", top: "0px", zIndex: "10"}}> {value} </Alert>) : ("")}    
                            <h1>All Users</h1>
                            <DataGrid rows={rows} rowHeight={180} columns={coloumns} pageSizeOptions={10} disableRowSelectionOnClick className='productListTable' autoHeight />
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment>
    )
}


export default UserList

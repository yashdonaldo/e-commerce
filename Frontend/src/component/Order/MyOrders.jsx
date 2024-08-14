import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import Loading from '../layout/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { clearErrors, myOrders } from '../../actions/OrderAction'
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import LaunchIcon from '@mui/icons-material/Launch';
import './MyOrders.scss'

const MyOrders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading, error, orders} = useSelector((state)=> state.myOrder);
  const {user} = useSelector((state)=> state.LoginUser)

  const columns = [
    { field: 'id', headerName: 'Order Id', width: 150, flex: 0.2, type: Number },
    { field: 'itemQty', headerName: 'Items qty', width: 150, flex: 0.1, type: Number },
    { field: 'amount', headerName: 'Amount', width: 150, flex: 0.1, type: Number },
    { field: 'status', headerName: 'Status', width: 150, flex: 0.1, 
      cellClassName: (params) =>{
        return params.row.status === "Delivered" ? "greenColor" : "redColor"
      }
    },
    { field: 'actions', headerName: 'Actions', width: 150, flex: 0.1, type: "number", sortable: false,
      renderCell: (params) =>{
        return(
          <Link to={`/order/${(params.id)}`}><LaunchIcon/></Link>
        )
      }

    },
  ];

  const rows= [];

  orders.order && orders.order.forEach((item) => {
    rows.push({
      itemQty: item.orderItems.length,
      id: item._id,
      amount: item.totalPrice,
      status: item.orderStatus,      
    })
  });

  useEffect(()=>{
    dispatch(myOrders())
    
 },[dispatch,]);

  return (
    <Fragment>
      <MetaData tittle={`${user.name} - Order`}/>
      <ToastContainer position='top-center' hideProgressBar={true} autoClose={2000} />
      {loading ? (<Loading/>):(
        <div className="myOrderPage">
          <DataGrid rows={rows} columns={columns} autoPageSize disableRowSelectionOnClick disableColumnSelector className='myOrdersTable'/>

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  )
}

export default MyOrders

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
import { deleteOrder, getAllOrders } from '../../actions/OrderAction';
import { deleteOrderAction } from '../../Reducer/OrderReducer';

const OrderList = () => {
    const dispatch = useDispatch();

    const { error, orders, loading } = useSelector((state) => state.allOrder)
    const { error:deleteError, isDeleted } = useSelector((state) => state.deleteOrder)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null)

    const deleteOrderHandle = (id) => {
        dispatch(deleteOrder(id))
    }

    console.log(error, "error", isDeleted, "delteerror", deleteError)

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
                dispatch(deleteOrderAction.Delete_Order_Clear_Errors())
            }, 4000);
        }

        if(isDeleted){
            setOpen(true)
            setValue("Order Deleted Successfully")

            setTimeout(() => {
                setOpen(false)
                setValue(null)
                dispatch(deleteOrderAction.Delete_Order_Reset())
            }, 4000);
        }

        dispatch(getAllOrders())
    }, [error, isDeleted, deleteError, setOpen, setValue]);



    const coloumns = [
        { field: 'id', headerName: 'Order Id', width: 150, flex: 0.2, type: Number },
        { field: 'itemQty', headerName: 'Items qty', width: 150, flex: 0.1, type: Number },
        { field: 'amount', headerName: 'Amount', width: 150, flex: 0.1, type: Number },
        {
            field: 'status', headerName: 'Status', width: 150, flex: 0.1,
            cellClassName: (params) => {
                return params.row.status === "Delivered" ? "greenColor" : "redColor"
            }
        },
        {
            field: "action", headerName: "Actions", minWidth: 150, sortable: false, type: "number",
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/order/${params.id}`}> <Edit /> </Link>

                        <Button onClick={() => deleteOrderHandle(params.id)}><Delete /></Button>
                    </Fragment>
                )
            }
        },
    ];

    const rows = [];

    orders && orders.forEach((item) => {
        rows.push({
            itemQty: item.orderItems.length,
            id: item._id,
            amount: item.totalPrice,
            status: item.orderStatus,
        })
    });

    return (
        <Fragment>
            <MetaData tittle={"All Orders - Admin"} />
            <div className="dashboard">
                <Sidebar />

                <div className="productListContainer">
                    {loading ? (<Loading />) : (
                        <Fragment>
                            {open ? (<Alert severity={error ? "error" : "success"} style={{ position: "sticky", top: "0px", zIndex: "10" }}> {value} </Alert>) : ("")}
                            <h1>All Orders</h1>
                            <DataGrid rows={rows} columns={coloumns} pageSizeOptions={10} disableRowSelectionOnClick className='productListTable' autoHeight />
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default OrderList

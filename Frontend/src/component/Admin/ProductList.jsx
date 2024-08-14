import React, { Fragment, useEffect, useState } from 'react'
import './ProdcutList.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Edit from '@mui/icons-material/Edit';
import RateReview from '@mui/icons-material/RateReview'
import Delete from '@mui/icons-material/Delete';
import { Alert, Button } from '@mui/material';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { DataGrid } from '@mui/x-data-grid'
import { deleteProduct, getAllProdcutAdmin } from '../../actions/ProductActions';
import Loading from '../layout/Loading'
import { DeleteProductAction } from '../../Reducer/ProductReducer';

const ProductList = () => {
    const dispatch = useDispatch();

    const { error, products, loading } = useSelector((state) => state.AdminProducts)
    const { error:deleteError , isDeleted } = useSelector((state) => state.DeleteProduct)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null)

    const deleteProductHandle = (id)=>{
        dispatch(deleteProduct(id))
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
                dispatch(DeleteProductAction.Delete_Product_Clear_Errors())
            }, 4000);
        }

        if(isDeleted){
            setOpen(true)
            setValue(isDeleted)

            setTimeout(() => {
                setOpen(false)
                setValue(null)
                dispatch(DeleteProductAction.Delete_Product_Reset())
            }, 4000);
        }

        dispatch(getAllProdcutAdmin())
    }, [dispatch, error, isDeleted, deleteError, setOpen, setValue]);

    const coloumns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3 },
        { field: "price", headerName: "Price", type: "number", minWidth: 150, flex: 0.5 },
        {
            field: "review", headerName: "Review", minWidth: 200, sortable: false, type: "number",
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/reviews/${params.id}`} style={{textDecoration: "none"}}> <RateReview /> See Review </Link>
                    </Fragment>
                )
            }
        },
        {
            field: "action", headerName: "Actions", minWidth: 150, sortable: false, type: "number",
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.id}`}> <Edit /> </Link>

                        <Button onClick={()=> deleteProductHandle(params.id)}><Delete /></Button>
                    </Fragment>
                )
            }
        },
    ];

    const rows = [];

    products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.Stock,
            price: item.Price,
            name: item.name,
        })
    });

    return (
        <Fragment>
            <MetaData tittle={"All Products - Admin"} />
            <div className="dashboard">
                <Sidebar />

                <div className="productListContainer">
                    {loading ? (<Loading />) : (
                        <Fragment>
                            {open? (<Alert severity={error ? "error" : "success"} style={{position: "sticky", top: "0px", zIndex: "10"}}> {value} </Alert>) : ("")}    
                            <h1>All Products</h1>
                            <DataGrid rows={rows} columns={coloumns} pageSizeOptions={10} disableRowSelectionOnClick className='productListTable' autoHeight />
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default ProductList

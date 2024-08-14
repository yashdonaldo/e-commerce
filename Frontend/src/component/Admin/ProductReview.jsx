import React, { Fragment, useEffect, useState } from 'react'
import './ProdcutList.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Delete from '@mui/icons-material/Delete';
import { Alert, Button } from '@mui/material';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { DataGrid } from '@mui/x-data-grid'
import { deleteReview, getAllReviews } from '../../actions/ProductActions';
import Loading from '../layout/Loading'
import { deleteReviewAction } from '../../Reducer/ProductReducer';

const ProductReview = () => {
    const dispatch = useDispatch();
    const params = useParams()

    const { error, reviews, loading } = useSelector((state) => state.allReview)
    const { error:deleteError , isDeleted } = useSelector((state) => state.deleteReview)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null)

    const deleteProductHandle = (id)=>{
        dispatch(deleteReview(params.id, id))
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
                setValue(null)
                dispatch(deleteReviewAction.Delete_Review_Clear_Error())
            }, 4000);
        }

        if(isDeleted){
            setOpen(true)
            setValue("Review Deleted Successfully")

            setTimeout(() => {
                setOpen(false)
                setValue(null)
                dispatch(deleteReviewAction.Delete_Review_Reset())
            }, 4000);
        }

        dispatch(getAllReviews(params.id))
    }, [dispatch, error, isDeleted, deleteError, setOpen, setValue]);


    const coloumns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        { field: "user", headerName: "User", minWidth: 250, flex: 1 },
        { field: "rating", headerName: "Rating", type: "number", minWidth: 150, flex: 0.3 },
        { field: "comment", headerName: "Comment", type: "number", minWidth: 350, flex: 0.5 },
        {
            field: "action", headerName: "Actions", minWidth: 150, sortable: false, type: "number",
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Button onClick={()=> deleteProductHandle(params.id)}><Delete /></Button>
                    </Fragment>
                )
            }
        },
    ];

    const rows = [];

    reviews && reviews.forEach((item) => {
        rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            user: item.name,
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
                            <h1>All Reviews</h1>
                            <DataGrid rows={rows} columns={coloumns} pageSizeOptions={10} disableRowSelectionOnClick className='productListTable' autoHeight />
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default ProductReview

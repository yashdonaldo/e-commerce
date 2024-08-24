import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, newReview } from '../../actions/ProductActions';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { FiShoppingBag, FiShoppingCart } from 'react-icons/fi'
import ReviewCard from './ReviewCard'
import Loading from '../layout/Loading';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/CartAction';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { NewReviewAction } from '../../Reducer/ProductReducer';


const ProductDetails = () => {
    const param = useParams()
    const [index, setIndex] = useState(0)
    const dispatch = useDispatch()
    const { product, loading } = useSelector((state) => {
        return state.Product_Details
    })

    const { review, error: reviewError } = useSelector((state) => {
        return state.newReview
    })


    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const increaceQuantity = () => {
        if (product.Stock <= quantity) return toast.info(`only ${product.Stock} Quantity left`);
        const qty = quantity + 1;
        setQuantity(qty)
    }
    const decreaceQuantity = () => {
        if (quantity > 1) {
            const qty = quantity - 1;
            setQuantity(qty)
        }
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(param.id, quantity))
        toast.success("Added To Cart")
    };



    const product_img = document.getElementById("product-img");
    const smallImg = document.getElementsByClassName('bottom-img');


    const options = {
        size: !window.innerWidth < 600 ? "30px" : "20",
    }

    const handletab = i => {
        setIndex(i)
    }
    const ref = useRef(null)

    const submitReviewToggle = () => {
        ref.current.click()
    }

    const submitReviewHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", param.id);


        dispatch(newReview(myForm));
    }
    useEffect(() => {
        if (reviewError) {
            toast.info(reviewError.payload);
            dispatch(NewReviewAction.NEW_REVIEW_CLEAR_ERRORS());
        };
        if (review) {
            toast.success("Review Submit Successfully");
        };
        toast.success("tost working")
        dispatch(getProductDetails(param.id))
    }, [dispatch, param.id, review, toast, reviewError, NewReviewAction]);


    return (
        <Fragment>
            {loading ? (<Loading />) : (
                <Fragment>
                    <ToastContainer position='top-center' />
                    <MetaData tittle={`${product.name}---VR LIFESTYLE`} />
                    <div className="ProductDetails">

                        <div className="ProductImage">
                            <div className="mainImg">
                                {product.images &&
                                    <img id='product-img' src={product.images[index].url} alt="" />

                                }
                            </div>
                            <div className="optionImg">
                                {product.images && product.images.map((item, i) => (
                                    <img className='bottom-img' key={item._id} src={item.url} alt={`${i} slide`} onClick={() => handletab(i)} />
                                ))}
                            </div>
                        </div>
                        <div className="ProductInfo">
                            <div className="product-tittle">
                                <h1>{product.name}</h1>
                                <p>#productId: {product._id}</p>
                            </div>
                            <div className="detail-block-2">
                                <StarRatings starRatedColor='tomato' numberOfStars={5} rating={product.ratings} starDimension={options.size} starSpacing='3px' />
                                <p> ({product.numOfReviews} Reviews)</p>
                            </div>
                            <p>
                                Status:
                                <b className={product.Stock > 0 ? "greenColor" : "redColor" }>
                                    {product.Stock > 0 ? " In Stock" : " Out Of Stock" }
                                </b>
                            </p>
                            <div className="detail-block-3" style={{ display: "flex" }}>
                                <h2 style={{ textDecoration: "line-through", marginRight: "15px" }}>Rs. {product.MRPRate}</h2>
                                <h2> ₹{product.Price} </h2>
                            </div>
                            <div className="detail-block-4">
                                <div className="detail-block-4-1">
                                    <button id='plus' onClick={decreaceQuantity}>-</button>
                                    <input readOnly value={quantity} type="number" style={{ outline: "none", border: "none", fontSize: "23px", width: "57px" }} />
                                    <button id='minus' onClick={increaceQuantity}>+</button>
                                </div>
                                <button disabled={product.Stock > 0 ? false : true} id='cart' onClick={addToCartHandler}><FiShoppingCart /> Add To Cart</button>
                                <button id='buy'><FiShoppingBag /> Buy</button>
                            </div>


                            <div className="detail-block-5">
                                Description: <p> {product.description} </p>
                            </div>

                            <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
                        </div>
                    </div>

                    {/* Review Modal */}
                    <button hidden ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Submit Review</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <textarea cols={50} rows={5} value={comment} onChange={((e) => setComment(e.target.value))} placeholder='Write a review'></textarea>
                                    <Typography component="legend">Rate by Star</Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={rating}
                                        onChange={(e) => {
                                            setRating(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={submitReviewHandler} data-bs-dismiss="modal">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <h1 className="reviewHeading">REVIEWS</h1>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews && product.reviews.map((review) => <ReviewCard key={review._id} review={review} />)}
                        </div>
                    ) : (
                        <p className='noReview'> No Review Yet</p>
                    )}
                </Fragment>
            )}

        </Fragment>
    )
}

export default ProductDetails

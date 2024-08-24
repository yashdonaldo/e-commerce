import React, { Fragment } from 'react'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom'
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import './CartItemCard.scss'
import { useDispatch } from 'react-redux';
import { addItemsToCart, removeCart } from '../../actions/CartAction';
import { toast } from 'react-toastify';

const CartItemCard = ({item}) => {
    const dispatch = useDispatch()

    const increaseQuantity = (id, quantity)=>{
        const newQty = Number(quantity) + Number( item.quantity);
        dispatch(addItemsToCart(id, newQty))
    }

    const deleteCart = (id) =>{
        dispatch(removeCart(id))
        toast.success("Item Removed")
    }
    return (
        <Fragment>
            <div className="cart-box">
                <img src={item.image} alt="loading" />
                
                <div className="cart-details">
                    <div className="cart-details-block-1">

                        <div className="cart-item-details">
                            <div className="tittle">{item.name}</div>
                            <div className="colour-variant">Black | white</div>
                            <div className="price">{item.price}</div>
                        </div>

                        <div className="cart-quantity">
                            <select name="quantity" id="quantity" onClick={(e)=>increaseQuantity(item.product , e.target.value )}>
                                <option value="0" >Select</option>
                                <option value="1" >1</option>
                                <option value="2" >2</option>
                                <option value="3">3</option>
                                <option value="4" >4</option>
                                <option value="5" >5</option>
                                <option value="6">6</option>
                            </select>
                        </div>

                        <div className="cart-delete" onClick={()=> deleteCart(item.product)}><Link><MdDelete /></Link></div>
                    </div>
                    <div className="cart-details-block-2">
                        {!item.stock >= 1 ? (<h3 style={{color: "red"}}> <RxCross2 style={{fontSize:"22px"}}/> Out of Stock</h3>) : (<h3> <FaCheck /> In Stock</h3>)}
                        
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CartItemCard

import React from 'react'
import ReactStar from 'react-star-ratings'
import {Link} from 'react-router-dom'

const options = {
    size: window.innerWidth < 600 ? "20" : "20",
}
const Featured = ({ product }) => {
    return (
        <Link className='card' to={`/product/${product._id}`} style={{width: "18rem", textDecoration: "none", color: "black"}}>
            <div id="card" style={{width: "18rem", textDecoration: "none", color: "black"}} >
                <img src={product.images[0].url} className="card-img-top" alt="..." />
                <div className="card-body" >
                    <h5 className="card-title">{product.name}</h5>
                    <div className="componet">
                        <ReactStar starRatedColor='tomato' numberOfStars={5} rating={product.ratings} starDimension={options.size} starSpacing='3px' {...options} /> <span>({product.numOfReviews} Reviews)</span>
                    </div>
                    <div className="price" style={{display: "flex"}}>
                    <p className="card-text" style={{color: "black", fontSize: "20px", marginTop: "10px", textDecoration: "line-through"}}>₹{product.MRPRate}</p>
                    <p className="card-text" style={{color: "black", fontSize: "20px", marginTop: "10px", marginLeft: "10px"}}>₹{product.Price}</p>

                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Featured

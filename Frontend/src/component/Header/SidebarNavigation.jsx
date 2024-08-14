// SidebarNavigation.js
import { Fragment, React, useEffect, useState } from 'react';
import './SidebarNavigation.scss';
import { useDispatch } from 'react-redux'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import { Link } from 'react-router-dom';
import { getProduct } from '../../actions/ProductActions';

const categories = [
    "Laptop",
    "product",
    "shoe",
    "shirt",
    "Shoap"
];

const SidebarNavigation = (props) => {
    const [price, setPrice] = useState([0, 25000])
    const [ratings, setRatings] = useState(0)
    const priceHandler = (event, namePrice) => {
        setPrice(namePrice)
        props.sendPrice(namePrice)
    }
    // console.log(category)
    return (
        <Fragment>

            <div className="sidebar-navigation">
                <div className="left-navigate">
                    <h2>Filter By:</h2>
                    <ul className="filter-options">
                        <div className="btn-group">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                Category
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <ul className='categoryBox'>
                                    {categories.map((category) => (
                                        <li
                                            className='category-link'
                                            key={category}
                                            onClick={function handleCategory(){
                                                props.sendCategory(category)
                                            }}
                                            style={{listStyle:"none"}}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </ul>
                        </div>
                        <div className="btn-group">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                Price
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <div className="filterBox">
                                    <Typography>Price</Typography>
                                    <Slider
                                        value={price}
                                        onChange={priceHandler}
                                        valueLabelDisplay='auto'
                                        aria-labelledby='range-slider'
                                        min={0}
                                        max={2500}>
                                    </Slider>
                                </div>
                            </ul>
                        </div>
                    </ul>
                </div>
                <div className="right-navigate">
                    <h2>Short By:</h2>
                    <ul className="filter-options">
                        <div className="btn-group">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                Rating
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <div className="rating" style={{width:"10vmax", margin:"auto"}}>
                                <Typography>Rating</Typography>
                                <Slider 
                                    value={ratings}
                                    onChange={(e, newRating)=>{
                                        setRatings(newRating)
                                        props.sendRating(newRating)
                                    }}
                                    valueLabelDisplay='auto'
                                    aria-labelledby='range-slider'
                                    min={0}
                                    max={5}
                                />
                                </div>
                            </ul>
                        </div>
                        <p>Total {props.totalProduct} Product</p>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};

export default SidebarNavigation;

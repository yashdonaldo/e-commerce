import React from 'react'
import StarRatings from 'react-star-ratings'

const ReviewCard = ({ review }) => {
    const options = {
        size: !window.innerWidth < 600 ? "20px" : "10",
    }
    return (
        <div className='review-card'>
            <img src="https://cdn.belairdirect.com/images/travel/homme.png" alt="user" />
            <p> {review.name} </p>
            <StarRatings starRatedColor='tomato' numberOfStars={5} rating={review.rating} starDimension={options.size} starSpacing='3px' />
            <span>{review.comment}</span>
        </div>
    )
}

export default ReviewCard

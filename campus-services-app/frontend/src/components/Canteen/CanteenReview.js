import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CanteenReview = () => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('/api/canteen/reviews');
            setReviews(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/canteen/reviews', { rating, comment });
            fetchReviews();
            setRating(0);
            setComment('');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Canteen Reviews</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                    />
                </div>
                <div>
                    <label>Comment:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit">Submit Review</button>
            </form>
            <h3>Previous Reviews</h3>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <strong>Rating: {review.rating}</strong>
                        <p>{review.comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CanteenReview;
import React from 'react';
import Rating from './Rating';

function Review({ review }) {
  return (
    <div>
      <Rating value={review.rating} text="" nomargin />
      <p
        className="mt-2"
        style={{ marginBottom: '1px', color: 'black' }}
      >
        {review.comment}
      </p>
      <p style={{ color: '#5F5F5F' }}>
        <small>{review.name}</small>&nbsp;|&nbsp;
        <small>{review.date}</small>
      </p>
      <hr />
    </div>
  );
}

export default Review;

/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import Review from './Review';
import { getReviews, postReview } from '../actions/reviewActions';

const Ratings = ({ war, setWar, productId }) => {
  const [values, setValues] = useState({
    comment: '',
    rating: '',
  });
  const [message, setMessage] = useState('');
  const [ratings, setRatings] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const dispatch = useDispatch();
  const history = useHistory();

  const { reviews, errorReviews } = useSelector(
    (state) => state.reviewGet,
  );

  useEffect(() => {
    if (reviews.length !== 0) {
      setRatings(reviews);
    }
  }, [reviews]);

  useEffect(() => {
    dispatch(getReviews(productId));
  }, []);

  const handleDone = () => {
    console.log(Number(values.rating));
    if (!values.comment || !values.rating) {
      setMessage('Please fill all the fields');
      console.log('Please fill all the fields');
    } else if (
      Number(values.rating) < 1 ||
      Number(values.rating) > 5
    ) {
      setMessage('Rating must be between 1 to 5');
      console.log('Rating must be between 1 to 5');
    } else if (
      Number(values.rating) >= 1 &&
      Number(values.rating) <= 5
    ) {
      let time = new Date();
      time = time.toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
      if (userInfo) {
        const tempReview = {
          name: userInfo.name,
          rating: values.rating,
          comment: values.comment,
          date: time,
          productId,
        };
        dispatch(postReview(tempReview));
        setMessage('');
        setWar(false);
        setValues({
          comment: '',
          rating: '',
        });
        setRatings([tempReview, ...ratings]);
      } else {
        history.push({
          pathname: '/login',
          state: {
            redirect: `${window.location.pathname}`,
          },
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <>
      <span
        style={{ color: '#30475E', cursor: 'pointer' }}
        onClick={() => {
          setWar((t) => !t);
        }}
      >
        <i
          className="far fa-edit"
          style={{
            display: 'inline',
            fontSize: '20px',
            color: '#30475E',
          }}
        />
        &nbsp;
        <span style={{ display: 'inline' }}>Write a Review</span>
      </span>
      {war && (
        <div style={{ position: 'relative' }}>
          <hr />
          <label htmlFor="question">Review</label>
          <input
            type="text"
            className="form-control"
            id="question"
            placeholder="Enter your Review"
            name="comment"
            style={{ backgroundColor: 'white' }}
            onChange={(e) => {
              handleInputChange(e);
            }}
            value={values.comment}
          />
          <label htmlFor="question" style={{ marginTop: '0.5rem' }}>
            Rating: (1 to 5)
          </label>
          <Input
            type="number"
            className="form-control"
            id="question"
            placeholder="Enter Rating"
            name="rating"
            style={{ backgroundColor: 'white' }}
            value={values.rating}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: '2rem',
              color: 'red',
            }}
          >
            {message}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.5rem',
            }}
          >
            <Button
              className="btn btn-success rounded mt-2 px-2 py-1"
              style={{ fontWeight: '1000' }}
              onClick={() => {
                handleDone();
              }}
            >
              Done
            </Button>
            <Button
              className="btn btn-success rounded mt-2 px-2 py-1"
              style={{ fontWeight: '1000' }}
              onClick={() => {
                setWar(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      <hr />
      {ratings.length !== 0 ? (
        ratings.map((review, index) => {
          return <Review review={review} key={index} />;
        })
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
          }}
        >
          No Reviews
        </div>
      )}
      {errorReviews && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
          }}
        >
          No Reviews
        </div>
      )}
    </>
  );
};

export default Ratings;

const Input = styled.input`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

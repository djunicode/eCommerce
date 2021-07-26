/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Button } from 'react-bootstrap';
import Review from './Review';

const Ratings = ({
  war,
  setWar,
  handleInputChange,
  values,
  handleDone,
}) => {
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
        <>
          <hr />
          <label htmlFor="question">Review</label>
          <input
            type="text"
            className="form-control"
            id="question"
            placeholder="Enter your Qustion"
            name="question"
            style={{ backgroundColor: 'white' }}
            onChange={(e) => {
              handleInputChange(e);
            }}
            value={values.question}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
          </div>
        </>
      )}
      <Review />
    </>
  );
};

export default Ratings;

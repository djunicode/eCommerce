/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Button } from 'react-bootstrap';
import Question from './Question';

const Questions = ({
  aaq,
  setAaq,
  handleInputChange,
  handleDone,
  values,
  questions,
}) => {
  return (
    <>
      <span
        style={{ color: '#30475E', cursor: 'pointer' }}
        onClick={() => {
          setAaq((t) => !t);
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
        <span style={{ display: 'inline' }}>ASK A QUESTION</span>
      </span>
      {aaq && (
        <>
          <hr />
          <label htmlFor="question">Question</label>
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
      {questions.map((question, index) => {
        return (
          <div key={index}>
            <Question
              question={question.question}
              answer={question.answer}
            />
          </div>
        );
      })}
    </>
  );
};

export default Questions;

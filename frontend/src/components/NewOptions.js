import React, { useState } from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';

function NewOptions (props) {

    // const [quest, setQuest] = useState('');

    // function SubmitForm(e) {
    //     e.preventDefault();
    //     // addQuestion(quest);
    //     addOption(optName, optPrice, optDiscount, optQty);
    // }

    // const handleInputChange = (e)=>{
    //     const {name,value} = e.target;
    //     setSample({
    //       [name]: value
    //     })
    //     console.log(sample);
    //   }

    return (
        <Form>
            <Row>
                <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="optName"
                        // onChange={(e)=>{handleInputChange(e)}}
                        onChange={(e) => {props.setOptName(e.target.value)}}
                    />
                </Col>
                <Col>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter price"
                        name="optPrice"
                        // onChange={(e)=>{handleInputChange(e)}}
                        onChange={(e) => {props.setOptPrice(e.target.value)}}
                    />
                </Col>
                <Col>
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter discount"
                        name="optDiscount"
                        // onChange={(e)=>{handleInputChange(e)}}
                        onChange={(e) => {props.setOptDiscount(e.target.value)}}
                    />
                </Col>
                <Col>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter quantity"
                        name="optQty"
                        // onChange={(e)=>{handleInputChange(e)}}
                        onChange={(e) => {props.setOptQty(e.target.value)}}
                    />
                </Col>
            </Row>
        </Form>
    );
}

export default NewOptions;
import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';

function NewOptions ({addOption}) {

    // const [quest, setQuest] = useState('');
    const [optName, setOptName] = useState('');
    const [optPrice, setOptPrice] = useState(0);
    const [optDiscount, setOptDiscount] = useState(0);
    const [optQty, setOptQty] = useState(0);

    function SubmitForm(e) {
        e.preventDefault();
        // addQuestion(quest);
        addOption(optName, optPrice, OptDiscount, optQty);
      }

    function changeInput(e) {
        setQuest(e.target.value);
        // addQuestion(quest);
        addOption(optName, optPrice, OptDiscount, optQty);
    }

    return (
        <Form onSubmit={SubmitForm} className="form-one">
            <Form.Label>Question</Form.Label>
            {/* htmlFor attribute links the label to the input since it has id with the same value */}
            <Form.Control  type="text" value={quest} onChange={changeInput} required/>
            <Button variant="outlined" color="primary" onClick={SubmitForm} size="small" className="add-button">
                Add Question
            </Button>
        </Form>
    );
}

export default NewOptions;
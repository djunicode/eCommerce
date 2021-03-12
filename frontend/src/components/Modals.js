/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function SizeModal(props) {
  const [size, setSize] = useState('');
  const [price, setPrice] = useState(0);

  function SubmitForm(e) {
    e.preventDefault();
    props.addSize(size);
    props.addPrice(price);
  }

  function changeSize(e) {
    setSize(e.target.value);
    props.addSize(size);
  }

  function changePrice(e) {
    setPrice(e.target.value);
    props.addPrice(size);
  }

  return (
    <Modal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add size and price
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={SubmitForm} className="size-form">
          <Form.Label htmlFor={size}>Add Size: </Form.Label>
          <Form.Control
            id={size}
            type="text"
            placeholder="Enter size"
            value={size}
            onChange={changeSize}
          />
          <Form.Label htmlFor={price}>Add Price: </Form.Label>
          <Form.Control
            id={price}
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={changePrice}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={SubmitForm}>Add</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SizeModal;

//   function App() {
//     const [modalShow, setModalShow] = React.useState(false);

//     return (
//       <>
//         <Button variant="primary" onClick={() => setModalShow(true)}>
//           Launch vertically centered modal
//         </Button>

//         <FieldModal
//           show={modalShow}
//           onHide={() => setModalShow(false)}
//         />
//       </>
//     );
//   }

//   render(<App />);

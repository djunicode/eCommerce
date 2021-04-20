import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { editCategories } from '../actions/categoryActions';

export function CategoryModal(props) {

  const [newCat, setNewCat] = useState('');
  const [show, setShow] = useState(true);
  // const alertDisplay = [];

  const dispatch = useDispatch();

  const categoryEdit = useSelector((state) => state.categoryEdit);
  const { error, editCategory } = categoryEdit;

  const queryEditCategories = `mutation {
    updateCategory (name: "${props.selectedCategory}", newName: "${newCat}") {
      msg
    }
  }`;


  function SubmitForm(e) {
    e.preventDefault();
    props.editCat(newCat);
    console.log(newCat);
    dispatch(editCategories(queryEditCategories));
    console.log(editCategory.msg);
    // if(editCategory.msg==="success") {
    //   if (show) {
    //     alertDisplay.push (
    //       <Alert variant="info" onClose={() => setShow(false)} dismissible>
    //         <p>Category name has been successfully changed.</p>
    //       </Alert>
    //     );
    //   }
    // }
  }

  function changeCat(e) {
    console.log(e.target.value);
    setNewCat(e.target.value);
    props.editCat(newCat);
  }

  return (
    <>
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
          Edit Category : {props.selectedCategory}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={SubmitForm} className="category-form">
          <Form.Label>New category name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter value"
            value={newCat}
            onChange={changeCat}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={SubmitForm}>Save Changes</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    {/* <div>{alertDisplay}</div> */}
    </>
  );
}

export function SubCategoryModal(props) {

  const [newSubCat, setNewSubCat] = useState('');
  const [show, setShow] = useState(true);
  // const alertDisplay = [];

  const dispatch = useDispatch();

  const subCategoryEdit = useSelector((state) => state.subCategoryEdit);
  const { error, editSubCategory } = subCategoryEdit;

  const queryEditSub = `mutation {
    updateSubCategory (subCategoryId: "${props.subCateg}", name: "${newSubCat}") {
      msg
    }
  }`;


  function SubmitForm(e) {
    e.preventDefault();
    props.editCat(newSubCat);
    console.log(newSubCat);
    dispatch(editCategories(queryEditSub));
    console.log(editSubCategory.msg);
    // if(editSubCategory.msg==="success") {
    //   if (show) {
    //     alertDisplay.push (
    //       <Alert variant="info" onClose={() => setShow(false)} dismissible>
    //         <p>Category name has been successfully changed.</p>
    //       </Alert>
    //     );
    //   }
    // }
  }

  function changeSubCat(e) {
    console.log(e.target.value);
    setNewSubCat(e.target.value);
    props.editCat(newSubCat);
  }

  return (
    <>
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
          Edit Sub Category : {props.selectedSubCategory}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={SubmitForm} className="category-form">
          <Form.Label>New sub category name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter value"
            value={newSubCat}
            onChange={changeSubCat}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={SubmitForm}>Save Changes</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    {/* <div>{alertDisplay}</div> */}
    </>
  );
}

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

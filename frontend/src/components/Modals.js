/* eslint-disable no-unused-vars, react/destructuring-assignment */
import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { editBrands, deleteBrands } from '../actions/brandActions';
import {
  editCategories,
  deleteCategories,
  deleteSubCategories,
} from '../actions/categoryActions';

export function CategoryEditModal(props) {
  const [newCat, setNewCat] = useState('');

  const dispatch = useDispatch();

  const categoryEdit = useSelector((state) => state.categoryEdit);
  const { error, editCategory } = categoryEdit;

  const queryEditCategories = `mutation {
    updateCategory (name: "${props.selectedCategory}", newName: "${newCat}") {
      msg
    }
  }`;

  function SubmitForm(e) {
    props.editCat(newCat);
    console.log(newCat);
    dispatch(editCategories(queryEditCategories));
    console.log(editCategory.msg);
    document.location.reload();
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
    </>
  );
}
export function CategoryDeleteModal(props) {
  const dispatch = useDispatch();

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { deleteCategory } = categoryDelete;

  const queryDeleteCategories = `mutation {
    deleteCategory (name: "${props.selectedCategory}") {
        msg
    }
  }`;

  function SubmitForm() {
    dispatch(deleteCategories(queryDeleteCategories));
    // document.location.reload();
    props.onHide();
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
          <Modal.Title>
            Are you sure you want to delete category :{' '}
            {props.selectedCategory} ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={SubmitForm}>Delete</Button>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function SubCategoryEditModal(props) {
  const [newSubCat, setNewSubCat] = useState('');

  const dispatch = useDispatch();

  const subCategoryEdit = useSelector(
    (state) => state.subCategoryEdit,
  );
  const { error, editSubcategory } = subCategoryEdit;

  const queryEditSub = `mutation {
    updateSubCategory (subCategoryId: "${props.subCateg}", name: "${newSubCat}") {
      msg
    }
  }`;

  function SubmitForm(e) {
    props.editSubCat(newSubCat);
    console.log(newSubCat);
    dispatch(editCategories(queryEditSub));
    console.log(editSubcategory.msg);
    document.location.reload();
  }

  function changeSubCat(e) {
    console.log(e.target.value);
    setNewSubCat(e.target.value);
    props.editSubCat(newSubCat);
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
    </>
  );
}
export function SubCategoryDeleteModal(props) {
  const dispatch = useDispatch();

  const subCategoryDelete = useSelector(
    (state) => state.subCategoryDelete,
  );
  const { deleteSubcategory } = subCategoryDelete;

  const queryDeleteSub = `mutation {
    deleteSubCategory (subCategoryId: "${props.subCateg}") {
        msg
    }
  }`;

  function SubmitForm() {
    dispatch(deleteSubCategories(queryDeleteSub));
    // document.location.reload();
    props.onHide();
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
          <Modal.Title>
            Are you sure you want to delete sub category :{' '}
            {props.selectedSubCategory} ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={SubmitForm}>Delete</Button>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function BrandEditModal(props) {
  const [newBrand, setNewBrand] = useState('');

  const dispatch = useDispatch();

  const brandEdit = useSelector((state) => state.brandEdit);
  const { error, editBrand } = brandEdit;

  const queryEditBrand = `mutation {
    updateBrand (name: "${props.selectedBrand}", newName: "${newBrand}") {
      msg
    }
  }`;

  function SubmitForm(e) {
    props.editBrand(newBrand);
    console.log(newBrand);
    dispatch(editBrands(queryEditBrand));
    console.log(editBrand.msg);
    document.location.reload();
  }

  function changeBrand(e) {
    console.log(e.target.value);
    setNewBrand(e.target.value);
    props.editBrand(newBrand);
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
            Edit Brand : {props.selectedBrand}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={SubmitForm} className="brand-form">
            <Form.Label>New brand name: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter value"
              value={newBrand}
              onChange={changeBrand}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={SubmitForm}>Save Changes</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export function BrandDeleteModal(props) {
  const dispatch = useDispatch();

  const brandDelete = useSelector((state) => state.brandDelete);
  const { deleteBrand } = brandDelete;

  const queryDeleteBrand = `mutation {
    deleteBrand (name: "${props.selectedBrand}") {
      msg
    }
  }`;

  function SubmitForm() {
    dispatch(deleteBrands(queryDeleteBrand));
    // document.location.reload();
    props.onHide();
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
          <Modal.Title>
            Are you sure you want to delete brand :{' '}
            {props.selectedBrand} ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={SubmitForm}>Delete</Button>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

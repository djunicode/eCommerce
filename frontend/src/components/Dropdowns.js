/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import {
  createCategories,
  listCategories,
  listSubCategories,
  deleteCategories,
  createSubCategories,
  deleteSubCategories,
} from '../actions/categoryActions';
import {
  CategoryEditModal,
  CategoryDeleteModal,
  SubCategoryEditModal,
  SubCategoryDeleteModal,
  BrandEditModal,
  BrandDeleteModal,
} from './Modals';
import {
  listBrands,
  createNewBrand,
  deleteBrands,
} from '../actions/brandActions';

const Option = (props) => {
  const { handleModal, handleDelete } = props.selectProps;

  return (
    <>
      <components.Option {...props}>
        <div
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <span>{props.data.label}</span>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <DropdownButtons href="#" onClick={handleModal}>
              <Icon className="fas fa-edit" />
            </DropdownButtons>
            <DropdownButtons href="#" onClick={handleDelete}>
              <Icon className="fas fa-trash" />
            </DropdownButtons>
          </div>
        </div>
      </components.Option>
    </>
  );
};

export const CatDropdown = ({ setCateg, dropdownError }) => {

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { createCategory } = categoryCreate;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { deleteCategory } = categoryDelete;

  const queryCategories = `query {
        getCategories {
          name,
          _id
        }
      }`;

  useEffect(() => {
    dispatch(listCategories(queryCategories));
  }, [dispatch]);

  const [optionList, setOptionList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (categories) {
      const optionsTwo = [];
      categories.map((cat) => {
        const optionsTemp = { label: cat.name, value: cat._id };
        optionsTwo.push(optionsTemp);
      });
      setOptionList(optionsTwo);
    }
    // console.log(optionList);
  }, [categories, createCategory, deleteCategory]);

  const handleChange = (newValue) => {
    if (newValue != null) {
      setSelectedCategory(newValue.label);
      setCateg(newValue.value);
    }
  };
  const handleInputChange = (inputValue) => {
    console.log(inputValue);
  };

  const createOption = (label) => ({
    label,
    value: createCategory._id,
  });

  const handleCreateCategory = (inputValue) => {
    const newOption = createOption(inputValue);
    // setValue(newOption);
    // setOptions([...options, newOption]);

    const queryCreateCategories = `mutation {
            createCategory (name: "${newOption.label}") {
                name
                _id
            }
        }`;

    dispatch(createCategories(queryCreateCategories));
    document.location.reload();
  };

  const [deleteModalShow, setDeleteModalShow] = React.useState(false)

  const handleDelete = (event) => {
    event.preventDefault();
    setDeleteModalShow(true);
  };

  const [editModalShow, setEditModalShow] = React.useState(false);
  const [newCat, setNewCat] = useState([
    {
      value: '',
    },
  ]);

  const editCat = (cat) => {
    setNewCat([{ cat }]);
  };

  const handleModal = (event) => {
    event.preventDefault();
    setEditModalShow(true);
  };

  return (
    <>
      <CategoryEditModal
        selectedCategory={selectedCategory}
        editCat={editCat}
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
      />
      <CategoryDeleteModal 
        selectedCategory={selectedCategory}
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
      />

      <Form.Label>Category</Form.Label>
      <CreatableSelect
        handleModal={handleModal}
        isClearable
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={optionList}
        components={{ Option }}
        onCreateOption={handleCreateCategory}
        handleDelete={handleDelete}
      />
      <Form.Control.Feedback type="invalid" style={{display: `${dropdownError.category}`}}>This field is required</Form.Control.Feedback>
    </>
  );
};

export const SubCatDropdown = ({ categ, subCateg, setSubCateg, dropdownError }) => {
  const dispatch = useDispatch();

  const subCategoryList = useSelector(
    (state) => state.subCategoryList,
  );
  const { subcategories } = subCategoryList;

  const subCategoryCreate = useSelector(
    (state) => state.subCategoryCreate,
  );
  const { createSubcategory } = subCategoryCreate;

  const subCategoryDelete = useSelector(
    (state) => state.subCategoryDelete,
  );
  const { deleteSubcategory } = subCategoryDelete;

  const querySub = `query{
        getSubCategories (categoryId: "${categ}") {
          name
          _id
        }
    }`;

  useEffect(() => {
    if (categ !== '') {
      dispatch(listSubCategories(querySub));
    }
  }, [categ]);

  const [optionList, setOptionList] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  useEffect(() => {
    if (subcategories) {
      const optionsTwo = [];
      subcategories.map((subCat) => {
        const optionsTemp = { label: subCat.name, value: subCat._id };
        optionsTwo.push(optionsTemp);
      });
      setOptionList(optionsTwo);
    }
  }, [subcategories, createSubcategory, deleteSubcategory]);

  const handleChange = (newValue) => {
    if (newValue != null) {
      setSelectedSubCategory(newValue.label);
      setSubCateg(newValue.value);
    }
  };
  const handleInputChange = (inputValue) => {
    console.log(inputValue);
  };

  const createOption = (label) => ({
    label,
    value: createSubcategory._id,
  });

  const [suberrordisplay, setSuberrordisplay] = useState('none')

  const handleCreateSubCategory = (inputValue) => {
    const newOption = createOption(inputValue);

    const queryCreateSub = `mutation {
            createSubCategory (name: "${newOption.label}", category: "${categ}") {
                name
                _id
            }
        }`;

    if(categ === '') {
      setSuberrordisplay('flex');
    }
    else {
      dispatch(createSubCategories(queryCreateSub));
      document.location.reload();
      setSuberrordisplay('none');
    }
  };

  const [deleteModalShow, setDeleteModalShow] = React.useState(false)

  const handleDelete = (event) => {
    event.preventDefault();
    setDeleteModalShow(true);
  };

  const [editModalShow, setEditModalShow] = React.useState(false);
  const [newSubCat, setNewSubCat] = useState([
    {
      value: '',
    },
  ]);

  const editSubCat = (subcat) => {
    setNewSubCat([{ subcat }]);
  };

  const handleModal = (event) => {
    event.preventDefault();
    setEditModalShow(true);
  };

  return (
    <>
      <SubCategoryEditModal
        subCateg={subCateg}
        selectedSubCategory={selectedSubCategory}
        editSubCat={editSubCat}
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
      />
      <SubCategoryDeleteModal 
        selectedSubCategory={selectedSubCategory}
        show={deleteModalShow}
        subCateg={subCateg}
        onHide={() => setDeleteModalShow(false)}
      />

      <Form.Label>Sub Category</Form.Label>
      <CreatableSelect
        handleModal={handleModal}
        isClearable
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={optionList}
        components={{ Option }}
        onCreateOption={handleCreateSubCategory}
        handleDelete={handleDelete}
      />
      <Form.Control.Feedback type="invalid" style={{display: `${dropdownError.subcategory}`}}>This field is required</Form.Control.Feedback>
      <Form.Control.Feedback style={{color: 'red', display: `${suberrordisplay}`}}>Select a category first</Form.Control.Feedback>
    </>
  );
};

export const BrandDropdown = ({ setBrand, dropdownError }) => {
  const dispatch = useDispatch();

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;

  const brandCreate = useSelector((state) => state.brandCreate);
  const { createBrand } = brandCreate;

  const brandDelete = useSelector((state) => state.brandDelete);
  const { deleteBrand } = brandDelete;

  const queryBrands = `query {
        getBrands {
          name,
          _id
        }
      }`;

  useEffect(() => {
    dispatch(listBrands(queryBrands));
  }, [dispatch]);

  const [optionList, setOptionList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    if (brands) {
      const optionsTwo = [];
      brands.map((br) => {
        const optionsTemp = { label: br.name, value: br._id };
        optionsTwo.push(optionsTemp);
      });
      setOptionList(optionsTwo);
    }
  }, [brands, createBrand, deleteBrand]);

  const handleChangeBrand = (newValue) => {
    if (newValue != null) {
      setSelectedBrand(newValue.label);
      setBrand(newValue.value);
      console.log(newValue.label)
    }
  };
  const handleInputChange = (inputValue) => {
    console.group('Input Changed');
  };

  const createBrandOption = (label) => ({
    label,
    value: createBrand._id,
  });

  const handleCreateBrand = (inputValue) => {
    const newOption = createBrandOption(inputValue);

    const queryCreateBrand = `mutation {
            createBrand (name: "${newOption.label}") {
                name
                _id
            }
        }`;

    dispatch(createNewBrand(queryCreateBrand));
    document.location.reload();
  };

  const [deleteModalShow, setDeleteModalShow] = React.useState(false)

  const handleDelete = (event) => {
    event.preventDefault();
    setDeleteModalShow(true);
  };

  const [editModalShow, setEditModalShow] = React.useState(false);
  const [newBrand, setNewBrand] = useState([
    {
      value: '',
    },
  ]);

  const editBrand = (br) => {
    setNewBrand([{ br }]);
  };

  const handleModal = (event) => {
    event.preventDefault();
    setEditModalShow(true);
  };

  return (
    <>
      <BrandEditModal
        selectedBrand={selectedBrand}
        editBrand={editBrand}
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
      />
      <BrandDeleteModal 
        selectedBrand={selectedBrand}
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
      />

      <Form.Label>Brand</Form.Label>
      <CreatableSelect
        handleModal={handleModal}
        isClearable
        onChange={handleChangeBrand}
        onInputChange={handleInputChange}
        options={optionList}
        components={{ Option }}
        onCreateOption={handleCreateBrand}
        handleDelete={handleDelete}
      />
      <Form.Control.Feedback type="invalid" style={{display: `${dropdownError.brand}`}}>This field is required</Form.Control.Feedback>
    </>
  );
};

const Icon = styled.i`
  margin: 0 10px;
  color: #929293;
  &:hover {
    color: #30475e;
  }
`;
const DropdownButtons = styled.button `
  border: none;
  background: none;
`;

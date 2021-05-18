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
  CategoryModal,
  SubCategoryModal,
  BrandModal,
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
              justifyContent: 'space-between',
            }}
          >
            <button href="#" onClick={handleModal}>
              <Icon className="fas fa-edit" />
            </button>
            <button href="#" onClick={handleDelete}>
              <Icon className="fas fa-trash" />
            </button>
          </div>
        </div>
      </components.Option>
    </>
  );
};

export const CatDropdown = ({ setCateg }) => {
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
    console.group('Value Changed');
    console.log(selectedCategory);
    console.groupEnd();
  };
  const handleInputChange = (inputValue) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.groupEnd();
  };

  const createOption = (label) => ({
    label,
    value: createCategory._id,
  });

  const handleCreateCategory = (inputValue) => {
    const newOption = createOption(inputValue);
    console.log(newOption);
    console.groupEnd();
    // setValue(newOption);
    // setOptions([...options, newOption]);
    console.log('new option created');

    const queryCreateCategories = `mutation {
            createCategory (name: "${newOption.label}") {
                name
                _id
            }
        }`;

    dispatch(createCategories(queryCreateCategories));
  };

  const handleDelete = () => {
    const queryDeleteCategories = `mutation {
            deleteCategory (name: "${selectedCategory}") {
                msg
            }
        }`;

    if (
      window.confirm('Are you sure you want to delete this category?')
    ) {
      dispatch(deleteCategories(queryDeleteCategories));
      console.log(selectedCategory);
      console.log('category deleted');
      console.log(deleteCategory.msg);
    }
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [newCat, setNewCat] = useState([
    {
      value: '',
    },
  ]);

  console.log(newCat);

  const editCat = (cat) => {
    setNewCat([{ cat }]);
  };

  const handleModal = (event) => {
    event.preventDefault();
    console.log('Open Modal');
    setModalShow(true);
    console.log(modalShow);
  };

  return (
    <>
      <CategoryModal
        selectedCategory={selectedCategory}
        editCat={editCat}
        show={modalShow}
        onHide={() => setModalShow(false)}
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
    </>
  );
};

export const SubCatDropdown = ({ categ, subCateg, setSubCateg }) => {
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
    // console.log(optionList);
  }, [subcategories, createSubcategory, deleteSubcategory]);

  const handleChange = (newValue) => {
    if (newValue != null) {
      setSelectedSubCategory(newValue.label);
      setSubCateg(newValue.value);
    }
    console.group('Value Changed');
    console.log(selectedSubCategory);
    console.groupEnd();
  };
  const handleInputChange = (inputValue) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.groupEnd();
  };

  const createOption = (label) => ({
    label,
    value: createSubcategory._id,
  });

  const handleCreateSubCategory = (inputValue) => {
    const newOption = createOption(inputValue);
    console.log(newOption);
    console.groupEnd();
    // setValue(newOption);
    // setOptions([...options, newOption]);
    console.log('new option created');

    const queryCreateSub = `mutation {
            createSubCategory (name: "${newOption.label}", category: "${categ}") {
                name
                _id
            }
        }`;

    dispatch(createSubCategories(queryCreateSub));
  };

  const handleDelete = () => {
    const queryDeleteSub = `mutation {
            deleteSubCategory (subCategoryId: "${subCateg}") {
                msg
            }
        }`;

    if (
      window.confirm(
        'Are you sure you want to delete this sub category?',
      )
    ) {
      dispatch(deleteSubCategories(queryDeleteSub));
      console.log(selectedSubCategory);
      console.log('sub category deleted');
      console.log(deleteSubcategory.msg);
    }
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [newSubCat, setNewSubCat] = useState([
    {
      value: '',
    },
  ]);

  console.log(newSubCat);

  const editSubCat = (subcat) => {
    setNewSubCat([{ subcat }]);
  };

  const handleModal = (event) => {
    event.preventDefault();
    console.log('Open Modal');
    setModalShow(true);
    console.log(modalShow);
  };

  return (
    <>
      <SubCategoryModal
        subCateg={subCateg}
        selectedSubCategory={selectedSubCategory}
        editSubCat={editSubCat}
        show={modalShow}
        onHide={() => setModalShow(false)}
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
    </>
  );
};

export const BrandDropdown = ({ setBrand }) => {
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
    // console.log(optionList);
  }, [brands, createBrand, deleteBrand]);

  const handleChange = (newValue) => {
    if (newValue != null) {
      setSelectedBrand(newValue.label);
      setBrand(newValue.value);
    }
    console.group('Value Changed');
    console.log(selectedBrand);
    console.groupEnd();
  };
  const handleInputChange = (inputValue) => {
    console.group('Input Changed');
    console.log(inputValue);
    console.groupEnd();
  };

  const createOption = (label) => ({
    label,
    value: createBrand._id,
  });

  const handleCreateBrand = (inputValue) => {
    const newOption = createOption(inputValue);
    console.log(newOption);
    console.groupEnd();
    console.log('new option created');

    const queryCreateBrand = `mutation {
            createBrand (name: "${newOption.label}") {
                name
                _id
            }
        }`;

    dispatch(createNewBrand(queryCreateBrand));
  };

  const handleDelete = () => {
    const queryDeleteBrand = `mutation {
            deleteBrand (name: "${selectedBrand}") {
                msg
            }
        }`;

    if (
      window.confirm('Are you sure you want to delete this brand?')
    ) {
      dispatch(deleteBrands(queryDeleteBrand));
      console.log(selectedBrand);
      console.log('brand deleted');
      console.log(deleteBrand.msg);
    }
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [newBrand, setNewBrand] = useState([
    {
      value: '',
    },
  ]);

  console.log(newBrand);

  const editBrand = (br) => {
    setNewBrand([{ br }]);
  };

  const handleModal = (event) => {
    event.preventDefault();
    console.log('Open Modal');
    setModalShow(true);
    console.log(modalShow);
  };

  return (
    <>
      <BrandModal
        selectedBrand={selectedBrand}
        editBrand={editBrand}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <Form.Label>Brand</Form.Label>
      <CreatableSelect
        handleModal={handleModal}
        isClearable
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={optionList}
        components={{ Option }}
        onCreateOption={handleCreateBrand}
        handleDelete={handleDelete}
      />
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createCategories, listCategories, listSubCategories, deleteCategories, createSubCategories, deleteSubCategories } from '../actions/categoryActions';
import ReactDOM from "react-dom";
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import {CategoryModal, SubCategoryModal} from './Modals';


const Option = (props) => {
    
    const { handleModal, handleDelete } = props.selectProps;

    return (
        <>
            <components.Option {...props}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{props.data.label}</span>
                <a href="#" onClick={handleModal}>Edit</a>
                <a href="#" onClick={handleDelete}>Delete</a>
                </div>
            </components.Option>
        </>
    );
};


export const CatDropdown = ({categ, setCateg}) => {

    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categoryList);
    const { catloading, caterror, categories } = categoryList;

    const categoryCreate = useSelector((state) => state.categoryCreate);
    const { error, createCategory } = categoryCreate;

    const categoryDelete = useSelector((state) => state.categoryDelete);
    const { catError, deleteCategory } = categoryDelete;

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
        if(categories) {
            let optionsTwo = [];
            categories.map((cat) => {
                let optionsTemp = {label: cat.name, value: cat._id}  
                optionsTwo.push(optionsTemp);
            })
            setOptionList(optionsTwo);
        }
        console.log(optionList);
    }, [categories, createCategory, deleteCategory])
    
    const handleChange = (newValue, actionMeta) => {
        if(newValue != null) {
            setSelectedCategory(newValue.label);
            setCateg(newValue.value);
        }
        console.group("Value Changed");
        console.log(selectedCategory);
        // console.log(`action: ${actionMeta.action}`);
        console.groupEnd();

    };
    const handleInputChange = (inputValue, actionMeta) => {
        console.group("Input Changed");
        console.log(inputValue);
        // console.log(`action: ${actionMeta.action}`);
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
        console.log("new option created");

        const queryCreateCategories = `mutation {
            createCategory (name: "${newOption.label}") {
                name
                _id
            }
        }`;

        dispatch(createCategories(queryCreateCategories));
    }

    const handleDelete = () => {
        const queryDeleteCategories = `mutation {
            deleteCategory (name: "${selectedCategory}") {
                msg
            }
        }`;

        if(window.confirm("Are you sure you want to delete this category?")) {
            dispatch(deleteCategories(queryDeleteCategories));
            console.log(selectedCategory);
            console.log("category deleted");
            console.log(deleteCategory.msg);
        }
    }


    const [modalShow, setModalShow] = React.useState(false);
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
        console.log("Open Modal");
        setModalShow(true);
        console.log(modalShow);
    };
    

    return(
        <>
            {/* <Col controlId="categ">
                <Form.Label>Category</Form.Label>
                <Form.Control
                    as="select"
                    onChange={(e) => {setCateg(e.target.value);}}
                >
                {categories.map((cat) => (
                    <option value={cat._id}>{cat.name}</option>
                ))}
                </Form.Control>
            </Col> */}

            <CategoryModal 
                selectedCategory={selectedCategory}
                editCat={editCat}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            <Col>
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
            </Col>
        </>
    )
}










export const SubCatDropdown = ({categ, subCateg, setSubCateg}) => {

    const dispatch = useDispatch();

    const subCategoryList = useSelector((state) => state.subCategoryList);
    const { subloading, suberror, subcategories } = subCategoryList;

    const subCategoryCreate = useSelector((state) => state.subCategoryCreate);
    const { error, createSubcategory } = subCategoryCreate;

    const subCategoryDelete = useSelector((state) => state.subCategoryDelete);
    const { Error, deleteSubcategory } = subCategoryDelete;

    const querySub = `query{
        getSubCategories (categoryId: "${categ}") {
          name
          _id
        }
    }`;

    useEffect(() => {
        if(categ != "") {
            dispatch(listSubCategories(querySub));
          }
    }, [categ]);

    const [optionList, setOptionList] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    useEffect(() => {
        if(subcategories) {
            let optionsTwo = [];
            subcategories.map((subCat) => {
                let optionsTemp = {label: subCat.name, value: subCat._id}  
                optionsTwo.push(optionsTemp);
            })
            setOptionList(optionsTwo);
        }
        console.log(optionList);
    }, [subcategories, createSubcategory, deleteSubcategory])
    
    const handleChange = (newValue, actionMeta) => {
        if(newValue != null) {
            setSelectedSubCategory(newValue.label);
            setSubCateg(newValue.value);
        }
        console.group("Value Changed");
        console.log(selectedSubCategory);
        // console.log(`action: ${actionMeta.action}`);
        console.groupEnd();

    };
    const handleInputChange = (inputValue, actionMeta) => {
        console.group("Input Changed");
        console.log(inputValue);
        // console.log(`action: ${actionMeta.action}`);
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
        console.log("new option created");

        const queryCreateSub = `mutation {
            createCategory (name: "${newOption.label}", category: "${categ}") {
                name
                _id
            }
        }`;

        dispatch(createSubCategories(queryCreateSub));
    }

    const handleDelete = () => {
        const queryDeleteSub = `mutation {
            deleteSubcategory (subCategoryId: "${subCateg}") {
                msg
            }
        }`;

        if(window.confirm("Are you sure you want to delete this sub category?")) {
            dispatch(deleteSubCategories(queryDeleteSub));
            console.log(selectedSubCategory);
            console.log("sub category deleted");
            console.log(deleteSubcategory.msg);
        }
    }


    const [modalShow, setModalShow] = React.useState(false);
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
        console.log("Open Modal");
        setModalShow(true);
        console.log(modalShow);
    };


    return(
        <>
            {/* <Col controlId="subCateg">
                <Form.Label>Sub Category</Form.Label>
                <Form.Control
                    as="select"
                    value={subCategory} 
                    onChange={(e) => {setSubCateg(e.target.value);}}
                >
                {subcategories.map((sub) => (
                    <option value={sub._id}>{sub.name}</option>
                ))}
                </Form.Control>
            </Col> */}

            <SubCategoryModal 
            subCateg={subCateg}
            selectedSubCategory={selectedSubCategory}
            editSubCat={editSubCat}
            show={modalShow}
            onHide={() => setModalShow(false)}
            />

            <Col>
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
            </Col>
        </>
    )
}
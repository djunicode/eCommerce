import React, { useEffect, useState } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listProducts,
  deleteProduct,
  createProduct,
  searchProducts,
  listProductByCategory,
  listProductBySubCategory,
} from '../actions/productActions';
import {
  listCategories,
  listSubCategories,
} from '../actions/categoryActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
  const [searchProd, setSearchProd] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productSearch = useSelector((state) => state.productSearch);
  const {
    searchloading,
    searcherror,
    searchproducts = [],
  } = productSearch;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { catloading, caterror, categories } = categoryList;

  const subCategoryList = useSelector(
    (state) => state.subCategoryList,
  );
  const { suberror, subcategories = [] } = subCategoryList;

  const productByCategory = useSelector(
    (state) => state.productByCategory,
  );
  const { Cerror, pByC = [] } = productByCategory;

  const productBySubCategory = useSelector(
    (state) => state.productBySubCategory,
  );
  const { SCerror, pBySC = [] } = productBySubCategory;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const querylist = `query {
    getProducts{
     _id
     name
    }
  }`;

  const search = `query {
    searchProduct (searchTerm: "${searchProd}") {
     name
     _id
     category {
      name
      _id
    }
    subcategory {
      name
      _id
    }
  }
}`;

  const queryCategories = `query {
  getCategories {
    name
    _id
  }
}`;

  const querySub = `query {
  getSubCategories (categoryId: "${category}") {
    name
    _id
  }
}`;

  const catProd = `query {
  getProductByCategory (categoryId: "${category}") {
    _id
    name
    category {
      name
      _id
    }
    subcategory {
      name
      _id
    }
  }
}`;

  const subCatProd = `query {
  getProductBySubCategory (subCategoryId: "${subCategory}") {
    _id
    name
    category {
      name
      _id
    }
    subcategory {
      name
      _id
    }
  }
}`;

  //* ********* USE EFFECTS **********
  useEffect(() => {
    dispatch(listProducts(querylist));
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  useEffect(() => {
    dispatch(searchProducts(search));
  }, [searchProd]);

  useEffect(() => {
    console.log(searchproducts);
    // dispatch(searchProducts(search));
  }, [searchproducts]);

  useEffect(() => {
    dispatch(listCategories(queryCategories));
  }, [dispatch]);

  useEffect(() => {
    if (category != '') {
      dispatch(listSubCategories(querySub));
      dispatch(listProductBySubCategory(subCatProd));
    }
  }, [category]);

  useEffect(() => {
    dispatch(listProductByCategory(catProd));
  }, [category]);

  //* ********* CRUD FUNCTIONS **********
  const deleteHandler = (id) => {
    const queryDeleteProduct = `query {
      deleteProduct(id: "${id}") {
        name
      }
    }`;

    if (
      window.confirm('Are you sure you want to delete this product?')
    ) {
      dispatch(deleteProduct(queryDeleteProduct));
      console.log(successDelete);
      console.log('product is deleted');
    }
  };

  const columnWidths = [338, 225, 200, 240, 105];
  const rowHeights = [48, 320];

  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div style={style}>
      <Table striped bordered hover responsive className="table-sm">
        <tbody>
          {rowIndex === 0 ? (
            columnIndex === 0 ? (
              <GridHeadings>product name</GridHeadings>
            ) : columnIndex === 1 ? (
              <GridHeadings>category</GridHeadings>
            ) : columnIndex === 2 ? (
              <GridHeadings>subcategory</GridHeadings>
            ) : columnIndex === 3 ? (
              <GridHeadings>id</GridHeadings>
            ) : (
              <GridHeadings>actions</GridHeadings>
            )
          ) : searchProd === '' ? (
            category === '' ? (
              products.map((pr) => (
                <tr>
                  {columnIndex === 0 ? (
                    <td style={{ height: '70px' }}>{pr.name}</td>
                  ) : columnIndex === 1 ? (
                    <td style={{ height: '70px' }}>{pr.name}</td>
                  ) : columnIndex === 2 ? (
                    <td style={{ height: '70px' }}>{pr.name}</td>
                  ) : columnIndex === 3 ? (
                    <td style={{ height: '70px' }}>{pr._id}</td>
                  ) : (
                    <td style={{ padding: '7.4px', height: '70px' }}>
                      <LinkContainer
                        to={`/admin/product/${pr._id}/edit`}
                      >
                        <ActionButton className="btn-sm">
                          <i className="fas fa-edit" />
                        </ActionButton>
                      </LinkContainer>
                      <ActionButton
                        className="btn-sm"
                        onClick={() => deleteHandler(pr._id)}
                      >
                        <i className="fas fa-trash" />
                      </ActionButton>
                    </td>
                  )}
                </tr>
              ))
            ) : subCategory === '' ? (
              pByC.map((prodbycat) => (
                <tr>
                  {columnIndex === 0 ? (
                    <td style={{ height: '70px' }}>
                      {prodbycat.name}
                    </td>
                  ) : columnIndex === 1 ? (
                    <td style={{ height: '70px' }}>
                      {prodbycat.category.name}
                    </td>
                  ) : columnIndex === 2 ? (
                    <td style={{ height: '70px' }}>
                      {prodbycat.subcategory.name}
                    </td>
                  ) : columnIndex === 3 ? (
                    <td style={{ height: '70px' }}>
                      {prodbycat._id}
                    </td>
                  ) : (
                    <td style={{ padding: '7.4px', height: '70px' }}>
                      <LinkContainer
                        to={`/admin/prodbycatoduct/${prodbycat._id}/edit`}
                      >
                        <ActionButton className="btn-sm">
                          <i className="fas fa-edit" />
                        </ActionButton>
                      </LinkContainer>
                      <ActionButton
                        className="btn-sm"
                        onClick={() => deleteHandler(prodbycat._id)}
                      >
                        <i className="fas fa-trash" />
                      </ActionButton>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              pBySC.map((prodbysubcat) => (
                <tr>
                  {columnIndex === 0 ? (
                    <td style={{ height: '70px' }}>
                      {prodbysubcat.name}
                    </td>
                  ) : columnIndex === 1 ? (
                    <td style={{ height: '70px' }}>
                      {prodbysubcat.category.name}
                    </td>
                  ) : columnIndex === 2 ? (
                    <td style={{ height: '70px' }}>
                      {prodbysubcat.subcategory.name}
                    </td>
                  ) : columnIndex === 3 ? (
                    <td style={{ height: '70px' }}>
                      {prodbysubcat._id}
                    </td>
                  ) : (
                    <td style={{ padding: '7.4px', height: '70px' }}>
                      <LinkContainer
                        to={`/admin/prodbysubcatoduct/${prodbysubcat._id}/edit`}
                      >
                        <ActionButton className="btn-sm">
                          <i className="fas fa-edit" />
                        </ActionButton>
                      </LinkContainer>
                      <ActionButton
                        className="btn-sm"
                        onClick={() =>
                          deleteHandler(prodbysubcat._id)
                        }
                      >
                        <i className="fas fa-trash" />
                      </ActionButton>
                    </td>
                  )}
                </tr>
              ))
            )
          ) : (
            searchproducts.map((sr) => (
              <tr>
                {columnIndex === 0 ? (
                  <td style={{ height: '70px' }}>{sr.name}</td>
                ) : columnIndex === 1 ? (
                  <td style={{ height: '70px' }}>
                    {sr.category.name}
                  </td>
                ) : columnIndex === 2 ? (
                  <td style={{ height: '70px' }}>
                    {sr.subcategory.name}
                  </td>
                ) : columnIndex === 3 ? (
                  <td style={{ height: '70px' }}>{sr._id}</td>
                ) : (
                  <td style={{ padding: '7.4px', height: '70px' }}>
                    <LinkContainer
                      to={`/admin/sroduct/${sr._id}/edit`}
                    >
                      <ActionButton className="btn-sm">
                        <i className="fas fa-edit" />
                      </ActionButton>
                    </LinkContainer>
                    <ActionButton
                      className="btn-sm"
                      onClick={() => deleteHandler(sr._id)}
                    >
                      <i className="fas fa-trash" />
                    </ActionButton>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );

  return (
    <div style={{ padding: '120px 4rem' }}>
      <Row>
        <Col>
          <Form.Label>Search Products</Form.Label>
          <Form
            style={{
              border: '1px solid #929293',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Form.Control
              type="text"
              placeholder="Search products"
              value={searchProd}
              onChange={(e) => setSearchProd(e.target.value)}
            />
            <i
              className="fas fa-search"
              style={{
                color: '#929293',
                fontSize: '1rem',
                marginRight: '1rem',
              }}
            />
          </Form>
        </Col>
        <Col>
          <Form.Label>Filter by Category</Form.Label>
          <Form.Control
            as="select"
            defaultValue="Filter by Category"
            // value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              console.log(category);
            }}
            style={{ border: '1px solid #929293' }}
          >
            {categories.map((cat) => (
              <option value={cat._id}>{cat.name}</option>
            ))}
          </Form.Control>
        </Col>
        <Col controlId="subCategory">
          <Form.Label>Filter by Sub Category</Form.Label>
          <Form.Control
            as="select"
            defaultValue="Filter by Sub Category"
            onChange={(e) => {
              setSubCategory(e.target.value);
              console.log(subcategories);
            }}
            style={{ border: '1px solid #929293' }}
          >
            {subcategories.map((sub) => (
              <option value={sub._id}>{sub.name}</option>
            ))}
          </Form.Control>
        </Col>
        <Col className="text-right">
          <Link to="/admin/product/create">
            <Button
              className="my-3"
              style={{ background: '#F05454' }}
            >
              <i className="fas fa-plus" /> Create Product
            </Button>
          </Link>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && (
        <Message variant="danger">{errorDelete}</Message>
      )}
      {loadingCreate && <Loader />}
      {errorCreate && (
        <Message variant="danger">{errorCreate}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div style={{ overflowX: 'scroll', marginTop: '35px' }}>
            <Grid
              className="Grid"
              columnCount={5}
              columnWidth={(index) => columnWidths[index]}
              rowCount={2}
              rowHeight={(index) => rowHeights[index]}
              width={1120}
              height={400}
            >
              {Cell}
            </Grid>
          </div>

          {/* <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.subcategory}</td>
                  <td>{product._id}</td>
                  <td>
                    <LinkContainer
                      to={`/admin/product/${product._id}/edit`}
                    >
                      <ActionButton className="btn-sm">
                        <i className="fas fa-edit" />
                      </ActionButton>
                    </LinkContainer>
                    <ActionButton
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash" />
                    </ActionButton>
                  </td>
                </tr>
              ))}
              </tbody> */}
          {/* </Table>  */}
        </>
      )}
    </div>
  );
};

export default ProductListScreen;

const GridHeadings = styled.th`
  text-transform: uppercase;
  color: #5eaaa8;
  font-size: 1rem;
`;
const ActionButton = styled(Button)`
  background: none;
  color: #1a1a1a;
`;

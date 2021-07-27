/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Nav, Table } from 'react-bootstrap';
import { FixedSizeGrid as Grid } from 'react-window';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

function OrdersScreen() {
  const [sdate, setSdate] = useState('');
  const [edate, setEdate] = useState('');
  const [filtered, setFiltered] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [completed, setCompleted] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, loading, error } = useSelector(
    (state) => state.orderList,
  );

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  useEffect(() => {
    console.log(filtered);
  }, [filtered]);

  useEffect(() => {
    if (data) {
      let d;
      if (completed) {
        d = data.filter((value) => {
          if (value.isDelivered) {
            return value;
          }
          return null;
        });
      } else {
        d = data.filter((value) => {
          if (!value.isDelivered) {
            return value;
          }
          return null;
        });
      }
      setProducts(d);
    }
  }, [data, completed]);

  useEffect(() => {
    if (sdate && edate) {
      const Sdate = new Date(sdate);
      const Edate = new Date(edate);
      const Filter = products.filter((product) => {
        const date = new Date(Number(product.createdAt));
        console.log(Date);
        if (Sdate <= date && date <= Edate) {
          return product;
        }
        return null;
      });
      setFiltered(Filter);
    }
  }, [sdate, edate]);

  const Cell = ({ columnIndex, rowIndex, style }) => {
    if (filtered)
      return (
        <div style={style}>
          <Table
            bordered
            hover
            responsive
            className="table-sm"
            style={{ backgroundColor: 'white' }}
          >
            {rowIndex === 0 ? (
              columnIndex === 0 ? (
                <thead>
                  <tr>
                    <GridHeadings>ID</GridHeadings>
                  </tr>
                </thead>
              ) : columnIndex === 1 ? (
                <thead>
                  <tr>
                    <GridHeadings>USER</GridHeadings>
                  </tr>
                </thead>
              ) : columnIndex === 2 ? (
                <thead>
                  <tr>
                    <GridHeadings>DATE</GridHeadings>
                  </tr>
                </thead>
              ) : (
                <thead>
                  <tr>
                    <GridHeadings>AMOUNT</GridHeadings>
                  </tr>
                </thead>
              )
            ) : columnIndex === 0 ? (
              <tbody>
                {filtered.map((product, index) => (
                  <tr key={index}>
                    <td>
                      {product._id}
                      <br />
                      <br />
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : columnIndex === 1 ? (
              <tbody>
                {filtered.map((product, index) => (
                  <tr key={index}>
                    <td>
                      {product.user.name}
                      <br />
                      <span style={{ color: '#5F5F5F' }}>
                        PAID
                        {product.isPaid ? (
                          <i className="fas fa-check-circle text-success" />
                        ) : (
                          <i className="fas fa-times-circle text-secondary" />
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : columnIndex === 2 ? (
              <tbody>
                {filtered.map((product, index) => {
                  let date;
                  if (completed) {
                    date = new Date(product.deliveredAt);
                  } else {
                    date = new Date(product.paidAt);
                  }
                  return (
                    <tr key={index}>
                      <td>
                        {`${date.getFullYear()}-${
                          date.getMonth() + 1
                        }-${date.getDate()}`}
                        {console.log(typeof product.deliveredAt)}
                        <br />
                        <span style={{ color: '#5F5F5F' }}>
                          {completed
                            ? `DELIVERED ${
                                product.isDelivered ? (
                                  <i className="fas fa-check-circle text-success" />
                                ) : (
                                  <i className="fas fa-times-circle text-secondary" />
                                )
                              }`
                            : `PAID ${
                                product.isPaid ? (
                                  <i className="fas fa-check-circle text-success" />
                                ) : (
                                  <i className="fas fa-times-circle text-secondary" />
                                )
                              }`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody>
                {filtered.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {product.totalPrice} Rs
                        <br />
                        <span
                          style={{
                            color: '#5F5F5F',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            history.push(
                              `orderdetails/${product._id}`,
                            );
                          }}
                        >
                          SEE DETAILS &gt;
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </Table>
        </div>
      );
    return (
      <div style={style}>
        <Table
          bordered
          hover
          responsive
          className="table-sm"
          style={{ backgroundColor: 'white' }}
        >
          {rowIndex === 0 ? (
            columnIndex === 0 ? (
              <thead>
                <tr>
                  <GridHeadings>ID</GridHeadings>
                </tr>
              </thead>
            ) : columnIndex === 1 ? (
              <thead>
                <tr>
                  <GridHeadings>USER</GridHeadings>
                </tr>
              </thead>
            ) : columnIndex === 2 ? (
              <thead>
                <tr>
                  <GridHeadings>DATE</GridHeadings>
                </tr>
              </thead>
            ) : (
              <thead>
                <tr>
                  <GridHeadings>AMOUNT</GridHeadings>
                </tr>
              </thead>
            )
          ) : columnIndex === 0 ? (
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    {product._id}
                    <br />
                    <br />
                  </td>
                </tr>
              ))}
            </tbody>
          ) : columnIndex === 1 ? (
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    {product.user.name}
                    <br />
                    <span style={{ color: '#5F5F5F' }}>
                      PAID
                      {product.isPaid ? (
                        <i className="fas fa-check-circle text-success" />
                      ) : (
                        <i className="fas fa-times-circle text-secondary" />
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : columnIndex === 2 ? (
            <tbody>
              {products.map((product, index) => {
                let date;
                if (completed) {
                  date = new Date(product.deliveredAt);
                } else {
                  date = new Date(product.paidAt);
                }
                return (
                  <tr key={index}>
                    <td>
                      {`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}
                      <br />
                      <span style={{ color: '#5F5F5F' }}>
                        {completed ? (
                          <>
                            DELIVERED{' '}
                            {product.isDelivered ? (
                              <i className="fas fa-check-circle text-success" />
                            ) : (
                              <i className="fas fa-times-circle text-secondary" />
                            )}
                          </>
                        ) : (
                          <>
                            PAID{' '}
                            {product.isPaid ? (
                              <i className="fas fa-check-circle text-success" />
                            ) : (
                              <i className="fas fa-times-circle text-secondary" />
                            )}
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {product.totalPrice} Rs
                      <br />
                      <span
                        style={{
                          color: '#5F5F5F',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          history.push(`orderdetails/${product._id}`);
                        }}
                      >
                        SEE DETAILS &gt;
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </Table>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div>
          {console.log(data)}
          <Container>
            <Row style={{ position: 'relative' }}>
              <h5 style={{ color: '#5EAAA8' }}>TOTAL ORDERS (50)</h5>
              <Styledspan>
                <Form.Label style={{ transform: 'translateY(15%)' }}>
                  Filter by Date :&nbsp;
                </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter date"
                  style={{
                    display: 'inline',
                    padding: '0px',
                    height: '1.8rem',
                    width: 'auto',
                  }}
                  value={sdate}
                  onChange={(e) => {
                    const currentTime = new Date();
                    const Sdate = new Date(e.target.value);
                    if (Sdate <= currentTime) {
                      setSdate(e.target.value);
                      setMessage('');
                    } else setMessage('Incorrect details');
                  }}
                />
                <Form.Label style={{ transform: 'translateY(15%)' }}>
                  &nbsp;to&nbsp;
                </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter date"
                  style={{
                    display: 'inline',
                    padding: '0px',
                    height: '1.8rem',
                    width: 'auto',
                  }}
                  value={edate}
                  onChange={(e) => {
                    const currentTime = new Date();
                    const Edate = new Date(e.target.value);
                    const Sdate = new Date(sdate);
                    if (sdate) {
                      if (Sdate <= Edate && Edate <= currentTime) {
                        setEdate(e.target.value);
                        setMessage('');
                      } else setMessage('Incorrect details');
                    } else setMessage('Incorrect details');
                  }}
                />
                <br />
                <small className="text-danger">{message}&nbsp;</small>
              </Styledspan>
            </Row>
            <Nav
              className="mt-4"
              fill
              variant="tabs"
              defaultActiveKey="/home"
            >
              <Nav.Item
                style={{ marginRight: '0', flex: '0 1 auto' }}
              >
                <Nav.Link
                  name="pd"
                  style={{
                    backgroundColor: `${
                      completed ? '#F9F9F9' : 'white'
                    }`,
                    fontWeight: '700',
                    padding: '0.4rem 0.5rem',
                  }}
                  onClick={() => {
                    setCompleted(false);
                  }}
                >
                  Pending Orders
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                style={{ marginRight: '0', flex: '0 1 auto' }}
              >
                <Nav.Link
                  name="rr"
                  style={{
                    backgroundColor: `${
                      completed ? 'white' : '#F9F9F9'
                    }`,
                    fontWeight: '700',
                    padding: '0.4rem 0.5rem',
                  }}
                  onClick={() => {
                    setCompleted(true);
                  }}
                >
                  Completed Orders
                </Nav.Link>
              </Nav.Item>
            </Nav>
            {/* <Table responsive="sm" style={{ backgroundColor: '#F9F9F9' }}>
          <thead>
            <tr style={{ color: '#30475E' }}>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <List
              height={1500}
              itemCount={100}
              itemSize={100}
              width={1050}
            >
              {RowCell}
            </List>
          </tbody>
        </Table>
        <Table responsive="sm" style={{ backgroundColor: '#F9F9F9' }}>
          
        </Table> */}
            <div style={{ overflowX: 'auto' }}>
              <Grid
                className="Grid"
                columnCount={4}
                columnWidth={277}
                rowCount={2}
                rowHeight={50}
                width={1110}
                height={400}
              >
                {Cell}
              </Grid>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default OrdersScreen;

const GridHeadings = styled.th`
  text-transform: uppercase;
  color: #5eaaa8;
  font-size: 1rem;
`;

const Styledspan = styled.span`
  position: absolute;
  right: 0;
  text-align: right;

  @media (max-width: 768px) {
    position: static;
    text-align: left;
    padding-left: 1rem;
  }
`;

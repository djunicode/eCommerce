import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Nav, Table } from 'react-bootstrap';
import { FixedSizeGrid as Grid } from 'react-window';
import styled from 'styled-components';

const products = [
  {
    id: 1234567892345609,
    user: 'Palka Dhirawani',
    date: '2021-02-08',
    amount: 'Rs 4000',
  },
  {
    id: 1234567892345609,
    user: 'Palka Dhirawani',
    date: '2021-02-09',
    amount: 'Rs 4000',
  },
  {
    id: 1234567892345609,
    user: 'Palka Dhirawani',
    date: '2021-02-10',
    amount: 'Rs 4000',
  },
  {
    id: 1234567892345609,
    user: 'Palka Dhirawani',
    date: '2021-02-11',
    amount: 'Rs 4000',
  },
];

function OrdersScreen() {
  const [sdate, setSdate] = useState();
  const [edate, setEdate] = useState();
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    if (sdate && edate) {
      const Sdate = new Date(sdate);
      const Edate = new Date(edate);
      const Filter = products.filter((product) => {
        const date = new Date(product.date);
        if (Sdate <= date && date <= Edate) {
          console.log(Sdate);
          console.log(date);
          console.log(Edate);
          return product;
        }
        return null;
      });
      console.log(Filter);
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
                <GridHeadings>ID</GridHeadings>
              ) : columnIndex === 1 ? (
                <GridHeadings>USER</GridHeadings>
              ) : columnIndex === 2 ? (
                <GridHeadings>DATE</GridHeadings>
              ) : (
                <GridHeadings>AMOUNT</GridHeadings>
              )
            ) : columnIndex === 0 ? (
              <tbody>
                {filtered.map((product) => (
                  <tr>
                    <td>
                      {product.id}
                      <br />
                      <br />
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : columnIndex === 1 ? (
              <tbody>
                {filtered.map((product) => (
                  <tr>
                    <td>
                      {product.user}
                      <br />
                      <span style={{ color: '#5F5F5F' }}>
                        PAID
                        <i className="fas fa-check-circle text-success" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : columnIndex === 2 ? (
              <tbody>
                {filtered.map((product) => (
                  <tr>
                    <td>
                      {product.date}
                      <br />
                      <span style={{ color: '#5F5F5F' }}>
                        DELIVERED
                        <i className="fas fa-check-circle text-success" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                {filtered.map((product) => (
                  <tr>
                    <td>
                      {product.amount}
                      <br />
                      <br />
                    </td>
                  </tr>
                ))}
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
              <GridHeadings>ID</GridHeadings>
            ) : columnIndex === 1 ? (
              <GridHeadings>USER</GridHeadings>
            ) : columnIndex === 2 ? (
              <GridHeadings>DATE</GridHeadings>
            ) : (
              <GridHeadings>AMOUNT</GridHeadings>
            )
          ) : columnIndex === 0 ? (
            <tbody>
              {products.map((product) => (
                <tr>
                  <td>
                    {product.id}
                    <br />
                    <br />
                  </td>
                </tr>
              ))}
            </tbody>
          ) : columnIndex === 1 ? (
            <tbody>
              {products.map((product) => (
                <tr>
                  <td>
                    {product.user}
                    <br />
                    <span style={{ color: '#5F5F5F' }}>
                      PAID
                      <i className="fas fa-check-circle text-success" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : columnIndex === 2 ? (
            <tbody>
              {products.map((product) => (
                <tr>
                  <td>
                    {product.date}
                    <br />
                    <span style={{ color: '#5F5F5F' }}>
                      DELIVERED
                      <i className="fas fa-check-circle text-success" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              {products.map((product) => (
                <tr>
                  <td>
                    {product.amount}
                    <br />
                    <br />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </div>
    );
  };

  return (
    <div>
      <Container>
        <Row style={{ position: 'relative' }}>
          <h5 style={{ color: '#5EAAA8' }}>TOTAL ORDERS (50)</h5>
          <span
            className="text-right"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              right: '0',
            }}
          >
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
                setSdate(e.target.value);
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
                setEdate(e.target.value);
                console.log(edate);
              }}
            />
          </span>
        </Row>
        <Nav
          className="mt-4"
          fill
          variant="tabs"
          defaultActiveKey="/home"
        >
          <Nav.Item style={{ marginRight: '0', flex: '0 1 auto' }}>
            <Nav.Link
              name="pd"
              style={{
                backgroundColor: '#F9F9F9',
                fontWeight: '700',
                padding: '0.4rem 0.5rem',
              }}
            >
              Placong Orders
            </Nav.Link>
          </Nav.Item>
          <Nav.Item style={{ marginRight: '0', flex: '0 1 auto' }}>
            <Nav.Link
              name="rr"
              style={{
                backgroundColor: 'white',
                fontWeight: '700',
                padding: '0.4rem 0.5rem',
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
  );
}

export default OrdersScreen;

const GridHeadings = styled.th`
  text-transform: uppercase;
  color: #5eaaa8;
  font-size: 1rem;
`;

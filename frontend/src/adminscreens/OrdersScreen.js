import React from 'react';
import { Container, Row, Form, Nav, Table } from 'react-bootstrap';
import { FixedSizeGrid as Grid } from 'react-window';
import styled from 'styled-components';

const products = [
  {
    id: 1234567892345609,
    user: 'Palka Dhirawani',
    date: '08-02-2021',
    amount: 'Rs 4000',
  },
  {
    id: 1234567892345609,
    user: 'Palka Dhirawani',
    date: '08-02-2021',
    amount: 'Rs 4000',
  },
  {
    id: 1234567892345609,
    user: 'Palka Dhirawani',
    date: '08-02-2021',
    amount: 'Rs 4000',
  },
  {
    id: 1234567892345609,
    user: 'Palka Dhirawani',
    date: '08-02-2021',
    amount: 'Rs 4000',
  },
];

const Cell = ({ columnIndex, rowIndex, style }) => (
  <div style={style}>
    <Table striped bordered hover responsive className="table-sm">
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
              <td>{product.id}</td>
            </tr>
          ))}
        </tbody>
      ) : columnIndex === 1 ? (
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.user}</td>
            </tr>
          ))}
        </tbody>
      ) : columnIndex === 2 ? (
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.date}</td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.amount}</td>
            </tr>
          ))}
        </tbody>
      )}
    </Table>
  </div>
);

function OrdersScreen() {
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
              type="text"
              placeholder="Enter date"
              style={{
                display: 'inline',
                padding: '0px',
                height: '1.8rem',
                width: 'auto',
              }}
            />
            <Form.Label style={{ transform: 'translateY(15%)' }}>
              &nbsp;to&nbsp;
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter date"
              style={{
                display: 'inline',
                padding: '0px',
                height: '1.8rem',
                width: 'auto',
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
        <Grid
          className="Grid"
          columnCount={4}
          columnWidth={260}
          rowCount={2}
          rowHeight={50}
          width={1300}
          height={400}
        >
          {Cell}
        </Grid>
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

import React from 'react';
import { Container, Row, Form, Nav } from 'react-bootstrap';
import { FixedSizeGrid as Grid } from 'react-window';

const Cell = ({ columnIndex, rowIndex, style }) => (
  <div
    className={
      columnIndex % 2
        ? rowIndex % 2 === 0
          ? 'GridItemOdd'
          : 'GridItemEven'
        : rowIndex % 2
        ? 'GridItemEven'
        : 'GridItemOdd'
    }
    style={style}
  >
    r{rowIndex}, c{columnIndex}
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
              placeholder="Enter email"
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
              placeholder="Enter email"
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
          columnCount={1000}
          columnWidth={150}
          height={400}
          rowCount={1000}
          rowHeight={35}
          width={400}
        >
          {Cell}
        </Grid>
      </Container>
    </div>
  );
}

export default OrdersScreen;

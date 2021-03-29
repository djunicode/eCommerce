import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import Switch from 'bootstrap-switch-button-react';
import {
    PEACH,
} from '../util/colors';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderDetailsAdmin = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [id]);

    const orderById = useSelector(
        (state) => state.orderDetails,
    );
    const { loading, error, order } = orderById;
    console.log(order);

    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(order ? order.isDelivered : false);
    }, [order]);
    return (
        <>
        {loading ? (
            <Loader />
        ) : error ? (
            <Message variant="danger">{error}</Message>
        ) : (
        <Container fluid>
            <StyledOrderIdHeader>Order ID: {id}</StyledOrderIdHeader>
            <StyledMainGridContainer>
                <StyledLeftGridContainer xs={12} sm={12} md={7}>
                    <StyledUserDetails>USER DETAILS</StyledUserDetails>
                    <Row>
                        <Col><StyledBoldSpan>Name: </StyledBoldSpan>{order.user.name}</Col>
                        <Col style={{ textAlign: 'right' }}><StyledBoldSpan>Phone No: </StyledBoldSpan>{order.user.phoneNo}</Col>
                    </Row>
                    <Row>
                        <Col><StyledBoldSpan>Email: </StyledBoldSpan>{order.user.email}</Col>
                    </Row>
                    <Row>
                    <Col>
                        <StyledBoldSpan>Address: </StyledBoldSpan>
                        {order.shippingAddress.address}, {` `}
                        {order.shippingAddress.city}, {` `}
                        {order.shippingAddress.country}, {` `}
                        {order.shippingAddress.postalCode}
                    </Col>
                    </Row>
                    <StyledFlexRow>
                        <div>
                            <StyledBoldSpan>
                                {checked ? `DELIVERED` : `NOT DELIVERED`}
                            </StyledBoldSpan>
                        </div>
                        <div>
                            <Switch 
                            checked={checked} 
                            onClick={() => setChecked(!checked)}
                            onlabel='Yes'
                            offlabel='No'
                            size='sm'
                            onstyle='success'
                            offstyle='danger'
                            width={75}
                            />
                        </div>
                    </StyledFlexRow>
                    <StyledOrangeLine />
                    <StyledUserDetails>ORDER DETAILS</StyledUserDetails>
                    <Row>
                        {order.orderItems.map(elem => (
                            <StyledDivElemRow>
                            <Col xs={2} sm={2} md={2}>
                                <img src={process.env.PUBLIC_URL + `/images/phone.jpg`} width={120} height={120}/>
                            </Col>
                            <Col xs={6} sm={6} md={6} style={{ margin: 'auto 8px' }}>
                                <StyledRowElemName>{elem.name}</StyledRowElemName>
                                <StyledRowElemSeller>elem.user.name</StyledRowElemSeller>
                                <StyledRowElem>
                                    <div><StyledBoldSpan>Price: </StyledBoldSpan>{elem.price}</div>
                                    <div><StyledBoldSpan>Qty: </StyledBoldSpan>{elem.qty}</div>
                                </StyledRowElem>
                            </Col>
                            <Col xs={3} sm={3} md={3} style={{ textAlign: 'right' }}>
                                <StyledBoldSpan>Rs {elem.price}/-</StyledBoldSpan>
                            </Col>
                            </StyledDivElemRow>
                        ))}
                    </Row>
                </StyledLeftGridContainer>
                <StyledRightGridContainer xs={12} sm={12} md={4}>
                    <StyledUserDetails>PAYMENT DETAILS</StyledUserDetails>
                    <StyledOrangeLine />
                    <Row>
                        <StyledMoveRightCol xs={7} sm={7} md={7}><StyledBoldSpan>Price: </StyledBoldSpan></StyledMoveRightCol>
                        <Col xs={5} sm={5} md={5}>Rs {order.totalPrice}/-</Col>
                    </Row>
                    <Row>
                        <StyledMoveRightCol style={{ color: 'gray' }}>{order.orderItems.length} items</StyledMoveRightCol>
                    </Row>
                    <StyledShippingCostRow>
                        <StyledMoveRightCol xs={7} sm={7} md={7}>Delivery<br /> Charges</StyledMoveRightCol>
                        <Col xs={5} sm={5} md={5}>Rs {order.shippingPrice}/-</Col>
                    </StyledShippingCostRow>
                    <Row>
                        <StyledMoveRightCol xs={7} sm={7} md={7}>Total<br /> Amount</StyledMoveRightCol>
                        <Col xs={5} sm={5} md={5}>Rs {parseFloat(order.totalPrice) + parseFloat(order.shippingPrice)}/-</Col>
                    </Row>
                    <StyledOrangeLine />
                    <Row>
                        <StyledMoveRightCol xs={7} sm={7} md={7}>Mode of<br /> Payment</StyledMoveRightCol>
                        <Col xs={5} sm={5} md={5}>{order.paymentMethod}</Col>
                    </Row>
                    <Row>
                        <StyledMoveRightCol xs={7} sm={7} md={7}><StyledBoldSpan>PAID</StyledBoldSpan></StyledMoveRightCol>
                        <Col xs={5} sm={5} md={5}>
                            {order.isPaid ? (
                                <StyledIcon className="fas fa-check-circle" iconColor="green"/>
                            ) : (
                                <StyledIcon className="fas fa-times-circle" iconColor="red"/>
                            )}
                        </Col>
                    </Row>
                </StyledRightGridContainer>
            </StyledMainGridContainer>
        </Container>
    )}
    </>
    );
};

export default OrderDetailsAdmin;

const StyledOrderIdHeader = styled.p`
    font-size: 36px;
    text-transform: uppercase;
`;

const StyledMainGridContainer = styled(Row)`
    text-align: center;
    margin: auto;
`;

const StyledLeftGridContainer = styled(Col)`
    border: 1px solid #ccc;
    padding: 14px;
    text-align: left !important;
    font-size: 26px;
    display: flex;
    gap: 14px;
    flex-direction: column;
    margin: 0 auto;
`;

const StyledUserDetails = styled.p`
    font-size: 30px;
    margin-bottom: 0;
`;

const StyledBoldSpan = styled.span`
    font-weight: bold !important;
`;

const StyledFlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 8px;
`;

const StyledOrangeLine = styled.div`
    background-color: ${PEACH};
    width: 100%;
    height: 1px;
`;

const StyledRightGridContainer = styled(Col)`
    border: 1px solid #ccc;
    background-color: #e5f4fb;
    padding: 14px;
    text-align: left !important;
    font-size: 26px;
    display: flex;
    gap: 14px;
    flex-direction: column;
    margin: 0 auto;
`;

const StyledDivElemRow = styled(Row)`
    font-size: 20px;
    width: 100%;
    margin: 8px 20px;
`;

const StyledRowElemName = styled(Row)`
    margin: 4px auto;
    text-transform: uppercase;
`;

const StyledRowElemSeller = styled(Row)`
    margin: 4px auto;
    color: gray;
`;

const StyledRowElem = styled(Row)`
    margin: 4px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 12px;
`;

const StyledMoveRightCol = styled(Col)`
    padding-left: 40px;
`;

const StyledShippingCostRow = styled(Row)`
    border-bottom: 1px gray solid;
    padding-bottom: 6px;
`;

const StyledIcon = styled.i`
    width: 100;
    color: ${props => props.iconColor};
    margin-left: 18px;
`;
import React, { useEffect, useState } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../Message";
import Loader from "../Loader";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../../actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import {
  ORDERS_DELIVER_ACTIONS,
  ORDER_PAY_ACTIONS,
} from "../../constants/orderConstants";
const OrderScreen = () => {
  const dispatch = useDispatch();
  const id = useParams();
  const navigate = useNavigate("");
  const [sdkReady, setSdkReady] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { success: successPay, loading: loadingPay } = useSelector(
    (state) => state.orderPay
  );
  const { success: successDeliver, loading: loadingDeliver } = useSelector(
    (state) => state.orderDeliver
  );
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(id));
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_ACTIONS.ORDER_PAY_RESET });
      dispatch({ type: ORDERS_DELIVER_ACTIONS.ORDERS_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, navigate, order, successDeliver, successPay, userInfo]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message varaint="danger">{error}</Message>
  ) : (
    <>
      <Row>
        <Col md={8}>
          <ListGroup varaint="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message varaint="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message varaint="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message varaint="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message varaint="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup varaint="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup varaint="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}>
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
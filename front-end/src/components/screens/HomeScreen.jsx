import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Product";
import { listProducts } from "../../actions/productAction";
import Message from "../Message";
import Loader from "../Loader";
import { Link, useParams } from "react-router-dom";
import Paginate from "../Paginate";
import ProductCarousel from "../ProductCarousel";
import Meta from "../Meta";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1 } = useParams();
  const { products, loading, error, page, pages } = useSelector(
    (state) => state.productList
  );
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to={"/"} className="btn btn-light">Go Back</Link>
      )}
      <h1 className="mt-3">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varaint="danger"> {error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;

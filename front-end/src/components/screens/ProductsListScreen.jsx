import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../Message";
import Loader from "../Loader";
import {
  deleteProduct,
  listProducts,
  createProduct,
} from "../../actions/productAction.js";
import { useNavigate, useParams } from "react-router-dom";
import { CREATE_PRODUCT } from "../../constants/productsConst";
import Paginate from "../Paginate";
const ProductsListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keyword, pageNumber = 1 } = useParams();
  const { loading, error, products, page, pages } = useSelector(
    (state) => state.productList
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    success,
  } = useSelector((state) => state.productDelete);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = useSelector((state) => state.productCreate);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch({ type: CREATE_PRODUCT.PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    success,
    successCreate,
    createdProduct,
    pageNumber,
  ]);
  const deleteHandler = (productId) => {
    if (window.confirm("Are you sure that you want to delete it?"))
      dispatch(deleteProduct(productId));
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message varaint="danger">{errorCreate}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message varaint="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varaint="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} isAdmin/>
    </>
  );
};

export default ProductsListScreen;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { editProduct, productsDetails } from "../../actions/productAction";
import FormContainer from "../FormContainer";
import Message from "../Message";
import Loader from "../Loader";
import { EDIT_PRODUCT } from "../../constants/productsConst";
import axios from "axios";
const ProductEditScreen = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = useSelector((state) => state.productEdit);

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: EDIT_PRODUCT.PRODUCT_EDIT_RESET });
      navigate("/admin/productlist");
    }
  }, [dispatch, successEdit, navigate]);

  useEffect(() => {
    if (!product.name || product._id !== id) {
      dispatch(productsDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [id, product, dispatch]);
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    console.log(file, formData);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editProduct({
        _id: id,
        user: id,
        name,
        category,
        countInStock,
        description,
        price,
        brand,
        image,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-ligh my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingEdit && <Loader />}
        {errorEdit && <Message varaint="danger">{errorEdit}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message varaint="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="price" className="my-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="image" className="my-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}></Form.Control>
              <Form.Control
                type="file"
                label="Choose File"
                onChange={uploadFileHandler}
              />
            </Form.Group>
            <Form.Group controlId="brand" className="my-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock" className="my-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) =>
                  setCountInStock(e.target.value)
                }></Form.Control>
            </Form.Group>
            <Form.Group controlId="category" className="my-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>{" "}
            <Form.Group controlId="description" className="my-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;

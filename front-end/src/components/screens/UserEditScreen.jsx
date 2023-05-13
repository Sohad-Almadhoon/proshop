import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, editUser } from "../../actions/userActions";
import FormContainer from "../FormContainer";
import Message from "../Message";
import Loader from "../Loader";
import { USERS_UPDATE } from "../../constants/userConstants";
const UserEditScreen = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userDetails);
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = useSelector((state) => state.userEdit);

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: USERS_UPDATE.USERS_UPDATE_RESET });
      navigate("/admin/userlist");
    }
  }, [dispatch, successEdit, navigate]);

  useEffect(() => {
    if (!user.name || user._id !== id) {
      dispatch(getUserDetails(id)); 
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [id, user,dispatch])
  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editUser({ _id: id, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-ligh my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingEdit && <Loader />}
        {errorEdit && <Message varaint="danger">{errorEdit }</Message>}
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
            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin" className="my-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
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

export default UserEditScreen;

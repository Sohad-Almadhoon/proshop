import React from 'react'
import { Alert } from 'react-bootstrap'
const Message = ({ varaint = 'info',children }) => {
  return <Alert variant={varaint}>{children}</Alert>;
};

export default Message
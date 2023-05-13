import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({
  title = "Welcome To Proshop",
  description = "We sell the best products for cheap",
  keywords = "elctronics, buy elctronics, cheap elctronics",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

export default Meta;

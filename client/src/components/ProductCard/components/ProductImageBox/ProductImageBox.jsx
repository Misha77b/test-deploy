import React from "react";
import { Link } from "react-router-dom";
import "./ProductImageBox.scss";

const ProductImageBox = ({ sale, image, brand, newItem, id }) => {
	return (
		<Link
			style={{ textDecoration: "none", position: "relative" }}
			className="logo__box"
			to={`/products/${id}`}
		>
			<img className="logo" src={image} alt={brand} />
		</Link>
	);
};

export default ProductImageBox;

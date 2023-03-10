import React from "react";
import "./ProductFlag.scss";

const ProductFlag = ({ sale }) => {
	return (
		<div className={`ribbon ribbon-top-right ${sale ? "red" : "orange"}`}>
			<span>{sale ? "sale" : "new item"}</span>
		</div>
	);
};

export default ProductFlag;

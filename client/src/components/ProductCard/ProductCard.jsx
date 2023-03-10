import React from "react";
import styled from "styled-components";
import ProductImageBox from "./components/ProductImageBox";
import ProductDescription from "./components/ProductDescription";
import ProductPrice from "../ProductPrice";
import ToCartButton from "../ToCartButton";
import FavoriteHeartIcon from "../FavoriteHeartIcon";
import ProductFlag from "./components/ProductFlag";

const ProductCard = ({ card, withCart = true, priceColor, setNotification }) => {
	const { name, currentPrice, previousPrice, newItem, itemNo, sale, brand, imageUrls, color } =
		card;
	return (
		<ProductCardWrapper id={itemNo}>
			<ProductFlag sale={sale} newItem={newItem} />
			<ProductImageBox
				image={imageUrls[0]}
				brand={brand}
				sale={sale}
				newItem={newItem}
				id={itemNo}
			/>
			<ProductDescription name={name} color={color} />
			<ProductPrice
				id={itemNo}
				priceColor={priceColor}
				currentPrice={currentPrice}
				previousPrice={previousPrice}
			/>
			{withCart && <ToCartButton id={itemNo} setNotification={setNotification} />}
			<FavoriteHeartIcon id={itemNo} />
		</ProductCardWrapper>
	);
};
const ProductCardWrapper = styled.div`
	background-color: rgba(245, 245, 245, 0.5);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 25px;
	padding: 10px;
	position: relative;
	width: 100%;
	height: 100%;
	transition: all 0.3s ease-in;
	&:hover {
		transform: scale(1.1);
		box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.4);
		border-color: #007042;
	}
`;
export default ProductCard;

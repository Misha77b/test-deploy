import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import styles from "./cartItem.module.scss";
import Amount from "../Product/Amount";
import { removeItemShoppingCart } from "../../store/reducers/cartSlice";
import { deleteCardIdFromStore } from "../../helpers/deleteCardIdFromStore";
import { selectShoppingCart } from "../../store/selectors";

const CartItem = ({ dbId, imageUrls, itemNo, name, currentPrice, setTotalSum }) => {
	const dispatch = useDispatch();
	const shoppingCart = useSelector(selectShoppingCart);
	useEffect(() => {
		if (!itemNo) return;
		const sum = shoppingCart[itemNo] * currentPrice;
		setTotalSum((prev) => ({ ...prev, [itemNo]: sum }));
	}, [shoppingCart, itemNo]);
	return (
		<Box className={styles.item}>
			{imageUrls && (
				<Link to={`/products/${itemNo}`}>
					<img src={imageUrls[0]} alt="product-item" className={styles.item__image} />
				</Link>
			)}
			<Typography className={styles.item__text}>{name}</Typography>
			<Amount amount={shoppingCart[itemNo]} setAmount={() => {}} itemNo={itemNo} />
			<Typography className={styles.item__text}>{currentPrice}</Typography>
			<Typography className={styles.item__text}> x {shoppingCart[itemNo] ?? 0} </Typography>
			<Typography className={styles.item__text}>
				{/* eslint-disable-next-line no-unsafe-optional-chaining */}
				{Math.floor(currentPrice * shoppingCart[itemNo] ?? 0)}
			</Typography>
			<button
				type="button"
				className={styles.item__btn}
				onClick={() => {
					dispatch(removeItemShoppingCart(itemNo));
				}}
			>
				<img
					src="https://res.cloudinary.com/dyvsyavmb/image/upload/v1676543739/images/llvbuvkf2jaupb5sfimm.svg"
					alt="arrow"
				/>
			</button>
		</Box>
	);
};

export default CartItem;

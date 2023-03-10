import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Button, Typography } from "@mui/material";
import { getItems } from "../../helpers/getItems";
import { fetchProducts } from "../../store/reducers/productsSlice";
import OrderItem from "../../components/OrderItem";
import { getLocalItem } from "../../helpers/getLocalItem";
import ToastNotification from "../../components/ToastNotification";

const FavoritePage = () => {
	const dispatch = useDispatch();
	const [notification, setNotification] = useState(false);
	const [products, setProducts] = useState([]);
	const parsed = JSON.parse(getLocalItem("favorites") || "[]");
	const favorites = useSelector((state) => state.favorite.favorite);
	useEffect(() => {
		const params = new URLSearchParams();
		params.set("itemNo", parsed.join(","));
		dispatch(fetchProducts(params.toString())).then((res) => {
			setProducts(res.payload.products);
		});
	}, [favorites]);
	return (
		<Container>
			{notification && <ToastNotification text="An item has been successfully added to the cart" />}
			<div className="cart-products">
				<Typography
					className="cart-products--title"
					variant="h3"
					fontWeight="fontWeightBold"
					sx={{ fontSize: "18px" }}
				>
					Улюблене
				</Typography>
				{!products.length && (
					<Typography
						variant="h3"
						fontWeight="fontWeightBold"
						sx={{ fontSize: "30px", color: "black", textAlign: "center", marginTop: "150px" }}
					>
						Товарів поки немає
					</Typography>
				)}
				<Box component="div" className="scroll">
					{products?.map((item) => {
						return (
							<OrderItem
								setNotification={setNotification}
								key={item.itemNo}
								item={item}
								deleteCross={true}
							/>
						);
					})}
				</Box>
			</div>
		</Container>
	);
};

export default FavoritePage;

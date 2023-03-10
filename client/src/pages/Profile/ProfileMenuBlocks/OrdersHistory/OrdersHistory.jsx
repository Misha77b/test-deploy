import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { DOMAIN } from "../../../../config/API";
import { getLocalItem } from "../../../../helpers/getLocalItem";

const OrdersHistory = () => {
	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	}));
	const isLoggedIn = useSelector((state) => state.auth.isAuth);
	const [orders, setOrders] = useState([]);

	const accessToken = getLocalItem("token");
	useEffect(() => {
		axios
			.get(`${DOMAIN}/orders`, {
				headers: {
					Authorization: accessToken,
				},
			})
			.then((response) => {
				setOrders(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div>
			<Typography
				variant="h4"
				fontWeight="fontWeightBold"
				fontFamily="Open Sans, sans-serif"
				align="center"
				color="grey.main"
				mb={2}
			>
				Історія замовлень
			</Typography>
			<Table stickyHeader>
				<TableHead>
					<StyledTableRow>
						<TableCell align="center">Замовлення №</TableCell>
						<TableCell align="center">Назва товару</TableCell>
						<TableCell align="center">Кількість</TableCell>
						<TableCell align="center">Сума</TableCell>
						<TableCell align="center">Дата</TableCell>
						<TableCell align="center">Статус</TableCell>
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{isLoggedIn &&
						orders?.map((order) => (
							<StyledTableRow key={order._id}>
								<TableCell align="center">{order.orderNo}</TableCell>
								<TableCell>{order.products[0].product.name}</TableCell>
								<TableCell align="center">{order.products[0].cartQuantity}</TableCell>
								<TableCell align="center">{order.totalSum}</TableCell>
								<TableCell align="center">{order.date.slice(0, 10)}</TableCell>
								<TableCell align="center">{order.status}</TableCell>
							</StyledTableRow>
						))}
				</TableBody>
			</Table>
		</div>
	);
};

export default OrdersHistory;

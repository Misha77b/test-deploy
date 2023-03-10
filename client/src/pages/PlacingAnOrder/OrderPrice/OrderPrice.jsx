import { Typography } from "@mui/material";
import React from "react";

const OrderPrice = ({ total }) => {
	return (
		<div
			style={{
				marginTop: "30px",
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "space-between",
				alignItems: "flex-end",
			}}
		>
			<Typography
				sx={{ fontSize: "24px" }}
				fontWeight="fontWeightBold"
				color="primary.contrastText"
			>
				Сума замовлення
			</Typography>

			<Typography
				sx={{ fontSize: "32px" }}
				fontWeight="fontWeightBold"
				color="primary.contrastText"
			>
				{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} грн
			</Typography>
		</div>
	);
};

export default OrderPrice;

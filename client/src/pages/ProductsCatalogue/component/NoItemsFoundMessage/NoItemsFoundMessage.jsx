import React from "react";
import { Typography } from "@mui/material";

const NoItemsFoundMessage = () => {
	return (
		<Typography variant="h3" sx={{ textAlign: "center", fontSize: "30px" }}>
			Товарів не знайдено
		</Typography>
	);
};

export default NoItemsFoundMessage;

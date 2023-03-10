import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const LogoIcon = () => {
	const navigate = useNavigate();
	return (
		<Box
			component="img"
			src="https://res.cloudinary.com/dsx708og4/image/upload/v1676297440/Lori_project/logo_b1xcve.png"
			alt="logo"
			align="center"
			sx={{
				maxWidth: "150px",
				cursor: "pointer",
			}}
			onClick={() => {
				navigate("/");
			}}
		/>
	);
};

export default LogoIcon;

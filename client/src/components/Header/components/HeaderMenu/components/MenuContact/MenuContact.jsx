import React from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

const MenuContact = () => {
	const CustomLink = styled(NavLink)(({ theme }) => ({
		color: "inherit",
		textDecoration: "none",
		"&: hover": {
			textDecoration: "underline",
		},
	}));

	return (
		<>
			<Button sx={{ padding: { sm: "20px 18px", md: "20px 35px" } }} id="button-home">
				<CustomLink onClick={() => handleClearSearch()} to="/contacts">
					Контакти
				</CustomLink>
			</Button>
		</>
	);
};

export default MenuContact;

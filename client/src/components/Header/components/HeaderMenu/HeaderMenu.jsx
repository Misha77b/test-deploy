import React from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

import MenuCatalog from "./components/MenuCatalog";
import MenuBayer from "./components/MenuBayer";
import MenuAbout from "./components/MenuAbout";
import MenuContact from "./components/MenuContact/MenuContact";

const HeaderMenu = () => {
	return (
		<div style={{ textAlign: "center", whiteSpace: "nowrap" }}>
			<Button sx={{ padding: { sm: "20px 18px", md: "20px 35px" } }} id="button-home">
				<CustomLink to="/">Головна</CustomLink>
			</Button>
			<MenuCatalog />
			<MenuBayer />
			<MenuAbout />
			<MenuContact />
		</div>
	);
};
const CustomLink = styled(NavLink)(({ theme }) => ({
	color: "inherit",
	textDecoration: "none",
	"&: hover": {
		textDecoration: "underline",
	},
}));
export default HeaderMenu;

import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { clearSearch } from "../../../../../../store/reducers/searchSlice";

const MenuCatalog = () => {
	const CustomLink = styled(NavLink)(({ theme }) => ({
		color: "inherit",
		textDecoration: "none",
		"&: hover": {
			textDecoration: "underline",
		},
	}));

	const dispatch = useDispatch;

	function handleClearSearch() {
		dispatch(clearSearch());
	}
	return (
		<>
			<Button sx={{ padding: { sm: "20px 18px", md: "20px 35px" } }} id="button-home">
				<CustomLink onClick={() => handleClearSearch()} to="/products">
					Каталог
				</CustomLink>
			</Button>
		</>
	);
};

export default MenuCatalog;

import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField, InputAdornment, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { fetchSearchProducts, clearSearch } from "../../../../store/reducers/searchSlice";
import useLocationParams from "../../../../pages/ProductsCatalogue/hooks/useLocationParams";

const Search = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [input, setInput] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const { params } = useLocationParams({ query: input });

	function handleClearSearch() {
		dispatch(clearSearch());
	}

	return (
		<Box
			onSubmit={(e) => e.preventDefault()}
			component="form"
			sx={{
				"& .MuiTextField-root": {
					width: { xs: "280px", sm: "300px", md: "440px" },
				},

				position: "relative",
			}}
			noValidate
			autoComplete="off"
		>
			<TextField
				sx={{
					"& .MuiInputBase-root": {
						backgroundColor: { xs: "#ffffff", md: "transparent" },
						outline: "none",
						"&:hover": { border: "#007042" },
					},
					"& .MuiInputBase-input": {
						p: "16px 100px 16px 14px",
						border: "5px",
					},
				}}
				onChange={(e) => {
					setInput(e.target.value);
				}}
				color="secondary"
				id="outlined-search"
				label="Пошук..."
				variant="outlined"
				InputProps={{
					endAdornment: (
						<InputAdornment
							position="end"
							sx={{
								"& .MuiIconButton-edgeEnd": {
									position: "absolute",
									right: "85px",
								},
							}}
						>
							{input && (
								<IconButton edge="end" onClick={() => handleClearSearch()} href="/products">
									<ClearIcon color="secondary" />
								</IconButton>
							)}
						</InputAdornment>
					),
				}}
			/>
			<Button
				onClick={() => {
					if (input.length <= 2) return;
					setSearchParams((prev) => {
						prev.set("query", input);
						return prev;
					});
					dispatch(
						fetchSearchProducts({
							query: searchParams.get("query"),
						}),
					);

					navigate(`/products?${params}`);
				}}
				sx={{
					position: "absolute",
					top: "2px",
					right: "2px",
					height: "51px",
					backgroundColor: "#A0A9AF",
					borderRadius: "0 2px 2px 0",
					"&:hover": { backgroundColor: "#007042" },
				}}
			>
				<SearchIcon
					color="grey"
					sx={{
						fontSize: "44px",
						color: "#ffffff",
					}}
				/>
			</Button>
		</Box>
	);
};

export default Search;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Stack, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import "../PopularBrands.scss";
import { selectorArrFilters } from "../../../store/selectors";
import { actionFetchFilters } from "../../../store/reducers/filtersSlice";

const paragraph = {
	margin: "0",
	fontSize: "16px",
	position: "relative",
	"z-index": 1,
};
const heading = {
	margin: "0",
	fontSize: "30px",
	position: "relative",
	"z-index": 1,
	color: "#fff",
};
const button = {
	zIndex: "4",
	cursor: "pointer",
	width: "134px",
	height: "38px",
	"&:hover": {
		color: "#FFFF",
		backgroundColor: "#007042",
	},
};

const GridItem = () => {
	const dispatch = useDispatch();
	const filters = useSelector(selectorArrFilters);
	useEffect(() => {
		const abort = new AbortController();
		dispatch(actionFetchFilters(abort.signal));
		return () => {
			abort.abort();
		};
	}, []);

	const brands = filters.filter((obj) => obj.type === "brand");
	const blockBrand = brands.map(({ name, description }, index) => {
		const params = new URLSearchParams();
		params.set("brand", name);
		return (
			<Grid item xs={12} sm={12} md={6} key={index}>
				<div className={`popular popular--${name}`}>
					<div className="popular--overlay" />
					<div className="popular--text">
						<Stack spacing={4} sx={{ width: "50%" }}>
							<Stack spacing={1}>
								<Typography
									variant="h4"
									fontWeight="fontWeightBold"
									sx={heading}
									className="typography"
									gutterBottom
								>
									{name}
								</Typography>
								<Typography
									variant="h5"
									fontWeight="fontWeightMedium"
									sx={paragraph}
									className="typography--p"
								>
									{description}
								</Typography>
							</Stack>
							<Link to={`/products?${params.toString()}`} className="link">
								<Button color="primary" variant="contained" sx={button}>
									Детальніше
								</Button>
							</Link>
						</Stack>
					</div>
				</div>
			</Grid>
		);
	});

	return <>{blockBrand}</>;
};

export default GridItem;

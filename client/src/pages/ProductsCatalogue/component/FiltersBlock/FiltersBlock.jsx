import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import useLocationParams from "../../hooks";
import Selection from "../Select";
import RangePrice from "../RangePrice";
import { fetchProducts } from "../../../../store/reducers/productsSlice";
import { selectorArrFilters } from "../../../../store/selectors";
import { actionFetchFilters } from "../../../../store/reducers/filtersSlice";
import SortBox from "../SortBox";
import "./FiltersBlock.scss";

const FiltersBlock = ({ products, setFilteredData }) => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const { params } = useLocationParams();
	const filters = useSelector(selectorArrFilters);

	const [brands, setBrands] = useState([]);
	const [processor, setProcessor] = useState([]);
	const [diagonal, setDiagonal] = useState([]);
	const [iternalStorage, setIternalStorage] = useState([]);
	const [RAM, setRAM] = useState([]);
	const [waterResistant, setWaterResistant] = useState([]);
	useEffect(() => {
		setBrands([]);
		setProcessor([]);
		setIternalStorage([]);
		setDiagonal([]);
		setRAM([]);
		setWaterResistant([]);
		filters.forEach((obj) => {
			switch (obj.type) {
				case "brand":
					setBrands((prev) => [...prev, obj.name]);
					break;
				case "processor":
					setProcessor((prev) => [...prev, obj.name]);
					break;
				case "diagonal":
					setDiagonal((prev) => [...prev, obj.name]);
					break;
				case "iternalStorage":
					setIternalStorage((prev) => [...prev, obj.name]);
					break;
				case "RAM":
					setRAM((prev) => [...prev, obj.name]);
					break;
				case "waterResistant":
					setWaterResistant((prev) => [...prev, obj.name]);
					break;
				default:
					break;
			}
		});
	}, [filters]);

	useEffect(() => {
		const abort = new AbortController();
		dispatch(actionFetchFilters(abort.signal));
		return () => {
			abort.abort();
		};
	}, []);

	const clearFiltersHandler = () => {
		searchParams.delete("brand");
		searchParams.delete("processor");
		searchParams.delete("diagonal");
		searchParams.delete("iternalStorage");
		searchParams.delete("RAM");
		searchParams.delete("waterResistant");
		searchParams.delete("minPrice");
		searchParams.delete("maxPrice");
	};
	const priceHandler = (minPrice, maxPrice) => {
		searchParams.get("minPrice");
		setSearchParams((prev) => {
			prev.set("minPrice", minPrice);
			return prev;
		});
		searchParams.get("maxPrice");
		setSearchParams((prev) => {
			prev.set("maxPrice", maxPrice);
			return prev;
		});
	};
	return (
		<Box sx={{ margin: "0 auto" }}>
			<Stack spacing={3} sx={{ position: "sticky", top: "30px" }}>
				<Typography component="legend" sx={{ textAlign: "left", color: "grey" }}>
					Діапазон ціни, грн
				</Typography>
				<RangePrice setPriceParams={priceHandler} sx={{ "text-align": "center" }} />
				<Typography component="legend" sx={{ textAlign: "left", color: "grey" }}>
					Фільтри
				</Typography>
				<SortBox
					value={searchParams.get("sort")}
					setCurrentValue={(value) => {
						setSearchParams((prev) => {
							prev.set("sort", value);
							return prev;
						});
					}}
				/>
				<Selection
					value={searchParams.get("brand")}
					setCurrentValue={(value) => {
						setSearchParams((prev) => {
							prev.set("brand", value);
							return prev;
						});
					}}
					nameLabel="Бренд"
					arrayProps={brands}
				/>
				<Selection
					value={searchParams.get("processor")}
					nameLabel="Процесор"
					arrayProps={processor}
					setCurrentValue={(value) => {
						setSearchParams((prev) => {
							prev.set("processor", value);
							return prev;
						});
					}}
				/>
				<Selection
					value={searchParams.get("diagonal")}
					nameLabel="Діагональ"
					arrayProps={diagonal}
					setCurrentValue={(value) => {
						setSearchParams((prev) => {
							prev.set("diagonal", value);
							return prev;
						});
					}}
				/>
				<Selection
					value={searchParams.get("iternalStorage")}
					nameLabel="Внутрішня память"
					arrayProps={iternalStorage}
					setCurrentValue={(value) => {
						setSearchParams((prev) => {
							prev.set("iternalStorage", value);
							return prev;
						});
					}}
				/>
				<Selection
					value={searchParams.get("RAM")}
					nameLabel="RAM"
					arrayProps={RAM}
					setCurrentValue={(value) => {
						setSearchParams((prev) => {
							prev.set("RAM", value);
							return prev;
						});
					}}
				/>
				<Selection
					value={searchParams.get("waterResistant")}
					nameLabel="Захист від вологи"
					arrayProps={waterResistant}
					setCurrentValue={(value) => {
						setSearchParams((prev) => {
							prev.set("waterResistant", value);
							return prev;
						});
					}}
				/>
				<Button
					variant="contained"
					color="secondary"
					sx={{
						width: "245px",
						height: "46px",
					}}
					onClick={() => {
						if (searchParams.has("query")) {
							searchParams.delete("query");
							setSearchParams(searchParams);
						}
						dispatch(fetchProducts(params));
					}}
				>
					Пошук
				</Button>
				<Link to="/products" className="link">
					<Button
						onClick={clearFiltersHandler}
						variant="contained"
						color="secondary"
						sx={{
							width: "245px",
							height: "46px",
						}}
					>
						Очистити
					</Button>
				</Link>
			</Stack>
		</Box>
	);
};
export default FiltersBlock;

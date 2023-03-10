import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Container, Typography, Box, Button } from "@mui/material";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { fetchProducts, setParams } from "../../store/reducers/productsSlice";
import { selectSearch } from "../../store/selectors";
import AppPagination from "../../components/AppPagination";
import ToastNotification from "../../components/ToastNotification";
import { selectProductsQuantity } from "../../store/selectors/products.selectors";
import useLocationParams from "./hooks";
import FiltersBlock from "./component/FiltersBlock/FiltersBlock";
import Spinner from "../../components/Spinner";
import NoItemsFoundMessage from "./component/NoItemsFoundMessage";
import useFetchData from "../Home/hooks";

const ProductsCatalogue = () => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const initialProducts = useFetchData();
	const productsLoading = useSelector((state) => state.products.loader);
	const [products, setProducts] = useState([...initialProducts]);
	const [notification, setNotification] = useState(false);
	const [startPage, setStartPage] = useState(1);
	const [filteredData, setFilteredData] = useState([]);
	const perPage = 5;

	const productsQuantity = useSelector(selectProductsQuantity);
	const dataFromSearch = useSelector(selectSearch);

	const { params } = useLocationParams({ startPage, perPage });
	useEffect(() => {
		dispatch(fetchProducts(params)).then((res) => {
			setProducts(res.payload.products);
		});
	}, [startPage, params, filteredData, dataFromSearch]);
	return (
		<Container>
			{dataFromSearch.length > 0 && (
				<Box
					pb={6}
					display="flex"
					alignItems="center"
					sx={{ justifyContent: { xs: "center", sm: "space-between" } }}
				>
					<Typography
						sx={{ display: { xs: "none", sm: "flex" } }}
						variant="h5"
						fontWeight="fontWeightRegular"
						fontFamily="Open Sans, sans-serif"
						color="grey.main"
					>
						Результати пошуку
					</Typography>
				</Box>
			)}
			{notification && <ToastNotification text="An item has been successfully added to the cart" />}
			<FiltersPhones>
				<FiltersBlock products={initialProducts} setFilteredData={setFilteredData} />
				{productsLoading && <Spinner />}
				<CatalogueWrapper>
					{/* eslint-disable-next-line no-nested-ternary */}
					{filteredData.length
						? filteredData?.map((card, index) => (
								<ProductCard
									priceColor="#57646E"
									key={index}
									card={card}
									setNotification={setNotification}
								/>
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  ))
						: dataFromSearch.length
						? dataFromSearch?.map((card, index) => (
								<ProductCard
									priceColor="#57646E"
									key={index}
									card={card}
									setNotification={setNotification}
								/>
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  ))
						: products?.map((card, index) => (
								<ProductCard
									priceColor="#57646E"
									key={index}
									card={card}
									setNotification={setNotification}
								/>
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  ))}
					{filteredData.length === 0 && dataFromSearch.length === 0 && products.length === 0 && (
						<NoItemsFoundMessage />
					)}
				</CatalogueWrapper>
			</FiltersPhones>
			<AppPagination
				pages={Math.ceil(productsQuantity / perPage)}
				page={startPage}
				onPageChange={(e, page) => {
					setStartPage((prev) => page);
					setSearchParams(params);
				}}
			/>
		</Container>
	);
};
const CatalogueWrapper = styled.div`
	display: grid;
	gap: 60px;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;
const FiltersPhones = styled.div`
	display: grid;
	gap: 10px;
	grid-template-columns: 300px auto;
`;
export default ProductsCatalogue;

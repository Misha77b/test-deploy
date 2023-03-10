import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Container, Box } from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import CategoryTitle from "../CategoryTitle";
import ProductCard from "../ProductCard";

import "./styles.scss";

const PopularProducts = ({ products, advertisement = false }) => {
	return (
		<Container>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				{!advertisement && <CategoryTitle text="Популярні товари" />}
				{advertisement && <CategoryTitle text="Ви також можете розглянути товари на знижкі" />}
				{!advertisement && (
					<Link style={{ textDecoration: "none" }} to="/products">
						<Button color="secondary" variant="contained">
							Усі товари
						</Button>
					</Link>
				)}
			</Box>
			{/* <CardsContainer> */}
			<Swiper
				slidesPerView="auto"
				spaceBetween={50}
				navigation={true}
				modules={[Navigation]}
				className="productsSwiper"
			>
				{products?.map((card, index) => {
					if (!advertisement) {
						return (
							card.popular && (
								<SwiperSlide key={index} className="popularProducts-swiperSlide">
									<ProductCard key={index} card={card} withCart={false} />
								</SwiperSlide>
							)
						);
					}
					return (
						card.sale && (
							<SwiperSlide key={index} className="popularProducts-swiperSlide">
								<ProductCard key={index} card={card} withCart={false} />
							</SwiperSlide>
						)
					);
				})}
			</Swiper>
			{/* </CardsContainer> */}
		</Container>
	);
};
// export const CardsContainer = styled.div`
// 	display: flex;
// 	gap: 50px;
// 	max-height: 700px;
// 	padding: 35px;
// 	overflow: scroll;
// `;
export default PopularProducts;

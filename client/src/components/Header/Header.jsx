import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Box, IconButton, Container, Badge } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import { Link, NavLink } from "react-router-dom";
import HeaderMenu from "./components/HeaderMenu";
import BurgerMenu from "./components/BurgerMenu";
import Search from "./components/Search";
import Breadcrumb from "./components/Breadcrumbs";
import LogoIcon from "../LogoIcon";
import { selectFavorite, selectShoppingCart, selectUser } from "../../store/selectors";
import { setIsAuth } from "../../store/reducers/authSlice";
import { getLocalItem } from "../../helpers/getLocalItem";

const Header = ({ modal }) => {
	const dispatch = useDispatch();
	const [countF, setCountF] = useState(0);
	const [countC, setCountC] = useState(0);
	const favorite = useSelector(selectFavorite);
	const shoppingCart = useSelector(selectShoppingCart);
	const isLoggedIn = useSelector((state) => state.auth.isAuth);
	const totalCartQuantity = useSelector((state) => state.cart.totalCartQuantity);
	const token = getLocalItem("token");

	useEffect(() => {
		setCountF(favorite.length);
		setCountC(totalCartQuantity);
	}, [favorite, shoppingCart, token, isLoggedIn]);

	const CustomLink = styled(NavLink)(({ theme }) => ({
		color: "#ffffff",
		"&: hover": {
			textDecoration: "underline",
		},
	}));

	const menuLinkItem = {
		color: isLoggedIn ? "#007042" : "#57646E",
		fontSize: "30px",
	};
	return (
		<Box component="header">
			<AppBar position="static">
				<Container>
					<Toolbar
						disableGutters={true}
						sx={{ justifyContent: "space-between", marginTop: "15px" }}
					>
						<BurgerMenu />
						<LogoIcon />

						<Typography
							fontWeight="fontWeightBold"
							fontFamily="Open Sans"
							color="graphite.main"
							sx={{ display: { xs: "none", lg: "block" } }}
						>
							(096)166-64-16
						</Typography>
						<Typography
							fontWeight="fontWeightBold"
							fontFamily="Open Sans"
							color="graphite.main"
							sx={{ m: " 0 10px", display: { xs: "none", lg: "block" } }}
						>
							(098)259-25-99
						</Typography>
						<Box sx={{ display: { xs: "none", sm: "flex" } }}>
							<Search />
						</Box>
						<Box>
							{isLoggedIn ? (
								<IconButton color="grey.main" component={Link} to="/profile/edit-profile">
									<AccountCircleOutlinedIcon sx={menuLinkItem} />
									<Typography
										color="grey.main"
										sx={{ display: { xs: "none", md: "block" }, p: "0" }}
									>
										Особистий кабінет
									</Typography>
								</IconButton>
							) : (
								<IconButton
									color="grey.main"
									onClick={() => {
										modal("LOGIN");
									}}
								>
									<AccountCircleOutlinedIcon sx={menuLinkItem} />
									<Typography
										color="grey.main"
										sx={{ display: { xs: "none", md: "block" }, p: "0" }}
									>
										Увійти
									</Typography>
								</IconButton>
							)}
							<IconButton size="large" aria-label="Basket" color="grey.main" sx={{ p: "10px" }}>
								<CustomLink to="/cart">
									<Badge badgeContent={countC} color="secondary">
										<ShoppingCartOutlinedIcon sx={menuLinkItem} />
									</Badge>
								</CustomLink>
							</IconButton>
							<IconButton size="large" aria-label="Favorites" color="grey.main" sx={{ p: "0" }}>
								<CustomLink to="/favorites">
									<Badge badgeContent={countF} color="secondary">
										<FavoriteIcon sx={menuLinkItem} />
									</Badge>
								</CustomLink>
							</IconButton>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>

			<Box backgroundColor="grey.main" sx={{ display: { xs: "none", sm: "flex" }, mb: "22px" }}>
				<Container>
					<HeaderMenu />
				</Container>
			</Box>

			<Box backgroundColor="grey.main" sx={{ display: { xs: "flex", sm: "none" }, mb: "22px" }}>
				<Container>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<Search />
					</Box>
				</Container>
			</Box>
			<Container>
				<Breadcrumb />
			</Container>
		</Box>
	);
};

export default Header;

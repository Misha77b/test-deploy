import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
	Container,
	Grid,
	Box,
	Typography,
	TextField,
	Button,
	RadioGroup,
	FormControlLabel,
	Radio,
	Autocomplete,
} from "@mui/material";
import "./PlacingAnOrder.scss";
import CategoryTitle from "../../components/CategoryTitle";
import FillTheFromText from "./FillTheFormText";
import OrderItem from "../../components/OrderItem";
import { submitBtn } from "./sxStyles/submitBtn";
import { AdressesDataBase } from "./AdressesDataBase/AdressesDataBase";

import OrderPrice from "./OrderPrice";
import { fetchProducts } from "../../store/reducers/productsSlice";
import { schema as validationSchema } from "./Schema";

// order data testing
import { createOrder } from "../../store/reducers/ordersSlice";
import { selectTotalCartSum } from "../../store/selectors/cart.selectors";
import { selectShoppingCart } from "../../store/selectors";
import { clearCart, setTotalCartSum } from "../../store/reducers/cartSlice";
import Field from "../../components/Form/Field/Field";
import { setModal, setOrderNo } from "../../store/reducers/modalSlice";

const RGStyle = {
	height: "40px",
	"@media (max-width: 448px)": { height: "72px" },
};

const PlacingAnOrder = () => {
	const dispatch = useDispatch();
	const [products, setProducts] = useState([]);
	const cartItems = useSelector(selectShoppingCart);
	const total = useSelector(selectTotalCartSum);
	const [shippingMethod, setShippingMethod] = useState("Кур’єром додому");
	const [paymentMethod, setPaymentMethod] = useState("Банківською карткою онлайн");
	const [adressTitle, setAdressTitle] = useState("Адреса");

	const [value, setValue] = useState();
	const [inputValue, setInputValue] = useState();

	const handleShippingMethodChange = (e) => {
		if (shippingMethod === "Кур’єром додому") {
			setAdressTitle("Пункт видачі");
		} else setAdressTitle("Адреса");
		setShippingMethod(e.target.value);
	};

	const handlePaymentMethodChange = (e) => {
		setPaymentMethod(e.target.value);
	};

	useEffect(() => {
		setTotalCartSum(total);
		const params = new URLSearchParams();
		params.set("itemNo", Object.keys(cartItems).join(","));
		dispatch(fetchProducts(params.toString())).then((res) => {
			setProducts(res.payload.products);
		});
		localStorage.setItem("totalCartSum", total);
	}, [cartItems, total]);
	const newObj = products.map((obj) => {
		const result = {};
		result._id = obj._id;
		result.product = obj;
		result.cartQuantity = cartItems[obj.itemNo];
		return result;
	});

	const orders = (values) => {
		const sendOrder = {};
		sendOrder.products = newObj;
		sendOrder.deliveryAddress = values.adress;
		sendOrder.shipping = shippingMethod;
		sendOrder.paymentInfo = paymentMethod;
		sendOrder.email = values.email;
		sendOrder.mobile = values.phoneNumber;
		sendOrder.letterSubject = "Thank you for order!";
		sendOrder.letterHtml = `<h1>Your order is placed.</h1>
		</br>
		<p>Сумма замовлення становить ${total} грн.</p>`;
		return sendOrder;
	};

	const formik = useFormik({
		initialValues: {
			fullName: "",
			phoneNumber: "",
			email: "",
			adress: inputValue || "",
		},
		onSubmit: async (values) => {
			const newOrder = orders(values);
			const orderNo = await dispatch(createOrder(newOrder)).then(
				(res) => res.payload.order.orderNo,
			);
			console.log("orderNo", orderNo);
			dispatch(setOrderNo(orderNo));
			dispatch(setModal("SUCCESS"));
			dispatch(clearCart());
		},
		validationSchema,
	});
	const { values, errors, touched } = formik;
	return (
		<Container>
			<form className="form-wrapper" onSubmit={formik.handleSubmit}>
				<CategoryTitle text="Оформлення замовлення" />

				<Grid container spacing={{ xs: 2, md: 5, lg: 20 }}>
					<Grid item xs={12} sm={12} md={6}>
						<FillTheFromText />
						<Typography variant="h6">Контактні дані</Typography>
						<Box className="inputs-wrapper">
							<Field
								name="fullName"
								type="text"
								description="Ім’я одержувача"
								value={values.fullName}
								onChange={formik.handleChange}
								errors={touched.fullName && errors.fullName}
							/>
							<Field
								name="phoneNumber"
								type="text"
								description="Телефон"
								value={values.phoneNumber}
								onChange={formik.handleChange}
								errors={touched.phoneNumber && errors.phoneNumber}
							/>
							<Field
								name="email"
								type="text"
								description="E-mail"
								value={values.email}
								onChange={formik.handleChange}
								errors={touched.email && errors.email}
							/>
						</Box>

						<Typography sx={{ margin: "40px 0 20px" }} variant="h6">
							Доставка та оплата
						</Typography>
						<Grid container>
							<Grid item xs={6} md={5}>
								<Typography>Спосіб доставки</Typography>
								<RadioGroup
									aria-labelledby="demo-controlled-radio-buttons-group"
									name="controlled-radio-buttons-group"
									value={shippingMethod}
									onChange={handleShippingMethodChange}
								>
									<FormControlLabel
										sx={RGStyle}
										value="Кур’єром додому"
										control={<Radio sx={{ "&.Mui-checked": { color: "#007042" } }} />}
										label="Кур’єром додому"
									/>
									<FormControlLabel
										sx={RGStyle}
										value="Самовивіз"
										control={<Radio sx={{ "&.Mui-checked": { color: "#007042" } }} />}
										label="Самовивіз"
									/>
								</RadioGroup>
							</Grid>

							<Grid item xs={6} md={7}>
								<Typography>Спосіб розрахунку</Typography>
								<RadioGroup
									aria-labelledby="demo-controlled-radio-buttons-group"
									name="controlled-radio-buttons-group"
									value={paymentMethod}
									onChange={handlePaymentMethodChange}
								>
									<FormControlLabel
										sx={RGStyle}
										value="Банківською карткою онлайн"
										control={<Radio sx={{ "&.Mui-checked": { color: "#007042" } }} />}
										label="Банківською карткою онлайн"
									/>
									<FormControlLabel
										sx={RGStyle}
										value="Готівкою або карткою при отриманні"
										control={<Radio sx={{ "&.Mui-checked": { color: "#007042" } }} />}
										label="Готівкою або карткою при отриманні"
									/>
								</RadioGroup>
							</Grid>
						</Grid>

						<Typography sx={{ margin: "20px 0 10px" }}>{adressTitle}</Typography>
						{adressTitle === "Пункт видачі" ? (
							<Autocomplete
								disablePortal
								id="adress"
								name="adress"
								value={(values.adress = inputValue)}
								onChange={(event, newValue) => {
									setValue(newValue);
								}}
								inputValue={inputValue}
								onInputChange={(event, newInputValue) => {
									setInputValue(newInputValue);
								}}
								options={AdressesDataBase}
								sx={{ width: "100%" }}
								renderInput={(params) => (
									<TextField
										fullWidth
										color="secondary"
										placeholder="Оберіть пункт видачі"
										{...params}
									/>
								)}
							/>
						) : (
							<TextField
								fullWidth
								id="adress"
								name="adress"
								color="secondary"
								value={values.adress}
								onChange={formik.handleChange}
								placeholder="Місто, вулиця, будинок, квартира"
								multiline={true}
							/>
						)}
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<div className="cart-products">
							<Typography
								className="cart-products--title"
								variant="h3"
								fontWeight="fontWeightBold"
								sx={{ fontSize: "18px" }}
							>
								Товари у кошику
							</Typography>

							<Box component="div" className="scroll">
								{!products.length && (
									<Typography
										variant="h3"
										fontWeight="fontWeightBold"
										sx={{
											fontSize: "24px",
											color: "black",
											textAlign: "center",
											marginTop: "20px",
										}}
									>
										Кошик пустий
									</Typography>
								)}
								{products?.map((item) => {
									const cartQuantity = cartItems[item.itemNo];
									return <OrderItem key={item.itemNo} item={item} cartQuantity={cartQuantity} />;
								})}
							</Box>

							<OrderPrice total={total} />
						</div>

						<Button type="submit" sx={submitBtn} color="primary">
							ПІДТВЕРДИТИ ЗАМОВЛЕННЯ
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default PlacingAnOrder;

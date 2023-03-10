import React, { useState } from "react";
import {
	Grid,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio,
	Autocomplete,
	TextField,
} from "@mui/material";

import { AdressesDataBase } from "../AdressesDataBase/AdressesDataBase";

const PaymentAndShipping = () => {
	const [shippingMethod, setShippingMethod] = useState("Кур’єром додому");
	const [paymentMethod, setPaymentMethod] = useState("Банківською карткою онлайн");
	const [adressTitle, setAdressTitle] = useState("Адреса");

	const handleShippingMethodChange = (e) => {
		if (shippingMethod === "Кур’єром додому") {
			setAdressTitle("Пункт видачі");
		} else setAdressTitle("Адреса");

		setShippingMethod(e.target.value);
	};

	const handlePaymentMethodChange = (e) => {
		setPaymentMethod(e.target.value);
	};

	return (
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
						value="Кур’єром додому"
						control={<Radio sx={{ "&.Mui-checked": { color: "#007042" } }} />}
						label="Кур’єром додому"
					/>
					<FormControlLabel
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
						value="Банківською карткою онлайн"
						control={<Radio sx={{ "&.Mui-checked": { color: "#007042" } }} />}
						label="Банківською карткою онлайн"
					/>
					<FormControlLabel
						value="Готівкою або карткою при отриманні"
						control={<Radio sx={{ "&.Mui-checked": { color: "#007042" } }} />}
						label="Готівкою або карткою при отриманні"
					/>
				</RadioGroup>
			</Grid>

			<Typography sx={{ margin: "20px 0 10px" }}>{adressTitle}</Typography>
			{adressTitle === "Пункт видачі" ? (
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					options={AdressesDataBase}
					sx={{ width: "100%" }}
					renderInput={(params) => (
						<TextField fullWidth color="black" placeholder="Оберіть пункт видачі" {...params} />
					)}
				/>
			) : (
				<TextField
					fullWidth
					color="black"
					// value={}
					placeholder="Місто, вулиця, будинок, квартира"
					multiline={true}
				/>
			)}
			{/* <TextField
				fullWidth
				color="black"
				// value={}
				placeholder="Місто, вулиця, будинок, квартира"
				multiline={true}
			/>
			<Typography sx={{ margin: "20px 0 10px" }}>{adressTitle}</Typography>
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				options={AdressesDataBase}
				sx={{ width: "100%" }}
				renderInput={(params) => (
					<TextField fullWidth color="black" placeholder="Оберіть пункт видачі" {...params} />
				)}
			/> */}
		</Grid>
	);
};

export default PaymentAndShipping;

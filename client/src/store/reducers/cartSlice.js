import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { object } from "prop-types";
import { DOMAIN } from "../../config/API";

const initialState = {
	shoppingCart: JSON.parse(localStorage.getItem("cart") || "{}"),
	totalCartQuantity: 0,
	// totalCartSum: 0,
	totalCartSum: JSON.parse(localStorage.getItem("totalCartSum") || 0),
};

Object.keys(initialState.shoppingCart).forEach((key) => {
	initialState.totalCartQuantity += initialState.shoppingCart[key];
});

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addShoppingCart: (state, action) => {
			if (!state.shoppingCart[action.payload]) {
				state.shoppingCart = { ...state.shoppingCart, [action.payload]: 1 };
				state.totalCartQuantity = 0;
				Object.keys(state.shoppingCart).forEach((key) => {
					state.totalCartQuantity += state.shoppingCart[key];
				});
			}
			localStorage.setItem("cart", JSON.stringify(state.shoppingCart));
		},
		removeItemShoppingCart: (state, action) => {
			if (state.shoppingCart[action.payload]) {
				delete state.shoppingCart[action.payload];
				state.totalCartQuantity = 0;
				Object.keys(state.shoppingCart).forEach((key) => {
					state.totalCartQuantity += state.shoppingCart[key];
				});
			}
			localStorage.setItem("cart", JSON.stringify(state.shoppingCart));
		},
		addQuantityToShoppingCart: (state, action) => {
			if (state.shoppingCart[action.payload.itemNo]) {
				let newVal = state.shoppingCart[action.payload.itemNo] + action.payload.addToQty;
				if (newVal < 1) {
					newVal = 1;
				}

				state.shoppingCart = { ...state.shoppingCart, [action.payload.itemNo]: newVal };
				state.totalCartQuantity = 0;
				Object.keys(state.shoppingCart).forEach((key) => {
					state.totalCartQuantity += state.shoppingCart[key];
				});
			}
			localStorage.setItem("cart", JSON.stringify(state.shoppingCart));
		},
		setTotalCartSum: (state, action) => {
			state.totalCartSum = action.payload;
		},
		clearCart: (state) => {
			state.shoppingCart = {};
			state.totalCartQuantity = 0;
			state.totalCartSum = 0;
			localStorage.setItem("cart", JSON.stringify(state.shoppingCart));
		},
	},
});

export const fetchCart = createAsyncThunk("cart/fetchData", async (newCart) => {
	const response = await axios.post(`${DOMAIN}/cart`, newCart);
	return response;
});
export const {
	removeItemShoppingCart,
	addShoppingCart,
	setTotalCartSum,
	addQuantityToShoppingCart,
	clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

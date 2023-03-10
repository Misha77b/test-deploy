import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";
import setAuthToken from "../../config/setAuthToken";

const initialState = { customer: {} };

export const fetchCustomer = createAsyncThunk("customer/fetchCustomer", async () => {
	const token = localStorage.getItem("token");
	setAuthToken(token);
	const response = await axios.get(`${DOMAIN}/customers/customer`, {
		headers: {
			Authorization: token,
		},
	});
	return response.data;
});
export const customerSlice = createSlice({
	name: "customer",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchCustomer.fulfilled, (state, action) => {
			state.customer = action.payload;
		});
	},
});

export default customerSlice.reducer;

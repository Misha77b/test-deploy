import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";

const initialState = { message: false };
export const fetchUpdateCustomerInfo = createAsyncThunk(
	"customerInfo/fetchUpdateCustomerInfo",
	async (updatedCustomer) => {
		return axios.put(`${DOMAIN}/customers`, updatedCustomer);
	},
);
export const updateCustomerInfoSlice = createSlice({
	name: "updateCustomerInfo",
	initialState,
	reducers: {
		removeMessage: (state, action) => {
			state.message = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUpdateCustomerInfo.fulfilled, (state, action) => {
			state.message = true;
		});
	},
});
export const { removeMessage } = updateCustomerInfoSlice.actions;

export default updateCustomerInfoSlice.reducer;

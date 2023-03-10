import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN } from "../../config/API";
import sendRequest from "../../helpers/sendRequest";

const initialState = {
	pageObj: {},
	loading: false,
};

const oneProductSlice = createSlice({
	name: "oneProducts",
	initialState,
	reducers: {
		actionPage: (state, { payload }) => {
			state.pageObj = { ...payload };
		},
		actionLoading: (state, { payload }) => {
			state.loading = payload;
		},
	},
});
export const { actionPage, actionLoading } = oneProductSlice.actions;

export const actionFetchProduct = (id) => (dispatch) => {
	dispatch(actionLoading(true));
	return sendRequest(`${DOMAIN}/products/${id}`).then((data) => {
		dispatch(actionPage(data));
		dispatch(actionLoading(false));
	});
};

export default oneProductSlice.reducer;

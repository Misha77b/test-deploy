import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN } from "../../config/API";

const initialState = {
	arrFilters: [],
	load: false,
};

const filtersSlice = createSlice({
	name: "filtersSlice",
	initialState,
	reducers: {
		actionFilters: (state, action) => {
			state.arrFilters = action.payload;
		},
		actionLoad: (state, { payload }) => {
			state.load = payload;
		},
	},
});
export const { actionLoad, actionFilters } = filtersSlice.actions;

export const actionFetchFilters = (signal) => (dispatch) => {
	dispatch(actionLoad(true));
	fetch(`${DOMAIN}/filters`, { signal })
		.then((data) => {
			return data.json();
		})
		.then((data) => {
			dispatch(actionFilters(data));
			dispatch(actionLoad(false));
		})
		.catch((err) => {
			// console.warn(err);
		});
};

export default filtersSlice.reducer;

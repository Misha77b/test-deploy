import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN } from "../../config/API";
import sendRequest from "../../helpers/sendRequest";

const initialState = {
	slidesData: [],
	loader: true,
};

export const fetchSlides = createAsyncThunk("slides/fetchData", async () => {
	const response = sendRequest(`${DOMAIN}/slides`);
	return response;
});

export const slidesSlice = createSlice({
	name: "slides",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchSlides.pending, (state) => {
			state.loader = true;
		});
		builder.addCase(fetchSlides.fulfilled, (state, action) => {
			state.slidesData = action.payload;
			state.loader = false;
		});
	},
});

export default slidesSlice.reducer;

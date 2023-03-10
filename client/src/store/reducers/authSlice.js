import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN } from "../../config/API";

const initialState = {
	user: {},
	isAuth: false,
	loader: true,
	error: null,
};
export const fetchAuth = createAsyncThunk("user/login", async (object) => {
	axios
		.post(`${DOMAIN}/customers/login`, object)
		.then(({ data }) => {
			localStorage.setItem("token", data.token);
		})
		.catch((err) => {
			localStorage.removeItem("token");
			throw err;
		});
});
export const fetchRegister = createAsyncThunk("user/register", async (object) => {
	axios
		.post(`${DOMAIN}/customers`, object)
		.then((savedCustomer) => savedCustomer)
		.catch((err) => {
			throw err;
		});
});

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setIsAuth: (state, action) => {
			state.isAuth = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAuth.pending, (state) => {
			state.loader = true;
		});

		builder.addCase(fetchAuth.fulfilled, (state, action) => {
			state.user = action.payload;
			state.isAuth = true;
			state.loader = false;
		});
		builder.addCase(fetchAuth.rejected, (state, action) => {
			state.loader = false;
			state.isAuth = false;
			state.error = action.error.message;
		});
	},
});

export const { setIsAuth } = userSlice.actions;

export default userSlice.reducer;

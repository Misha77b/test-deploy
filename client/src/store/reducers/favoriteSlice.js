import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	favorite: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

export const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		setFavorite: (state, action) => {
			state.favorite = [...new Set([...state.favorite, action.payload])];
			localStorage.setItem("favorites", JSON.stringify(state.favorite));
		},
		removeItemFavorite: (state, action) => {
			state.favorite = state.favorite.filter((item) => item !== action.payload);
			localStorage.setItem("favorites", JSON.stringify(state.favorite));
		},
	},
});
export const { removeItemFavorite, setFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { deleteCardIdFromStore } from "../../helpers/deleteCardIdFromStore";
import { setLocalItem } from "../../helpers/setLocalItem";
import { selectFavorite } from "../../store/selectors";
import { removeItemFavorite, setFavorite } from "../../store/reducers/favoriteSlice";

const FavoriteHeartIcon = ({ id, product }) => {
	const dispatch = useDispatch();
	const favorites = useSelector(selectFavorite);
	const [liked, setLiked] = useState(false);
	const likeUpdateHandler = () => {
		if (liked) {
			dispatch(removeItemFavorite(id));
			setLiked(false);
		} else {
			dispatch(setFavorite(id));
			setLiked(true);
		}
	};

	useEffect(() => {
		setLiked(favorites.some((el) => el === id));
	});

	return (
		<FavoriteIcon
			onClick={() => {
				likeUpdateHandler();
			}}
			color={liked ? "error" : "mediumgrey"}
			sx={
				product
					? {
							position: "absolute",
							right: "0",
							fontSize: "50px",
							cursor: "pointer",
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  }
					: { position: "absolute", cursor: "pointer", fontSize: "40px" }
			}
		/>
	);
};
export default FavoriteHeartIcon;

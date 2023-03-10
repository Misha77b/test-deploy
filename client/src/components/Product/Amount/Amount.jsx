import { useDispatch } from "react-redux";
import { addQuantityToShoppingCart } from "../../../store/reducers/cartSlice";
import "./Amount.scss";

export default function Amount({ amount, setAmount, itemNo }) {
	const dispatch = useDispatch();

	const increment = () => {
		// eslint-disable-next-line no-plusplus
		setAmount((prev) => ({ ...prev, [itemNo]: prev[itemNo]++ }));
		dispatch(addQuantityToShoppingCart({ itemNo, addToQty: 1 }));
	};

	const decrement = () => {
		if (amount === 1) return;
		// eslint-disable-next-line no-plusplus
		setAmount((prev) => ({ ...prev, [itemNo]: prev[itemNo]-- }));
		dispatch(addQuantityToShoppingCart({ itemNo, addToQty: -1 }));
	};

	return (
		<div className="inpt">
			<button type="button" className="inpt__button" onClick={decrement}>
				-
			</button>
			<p className="inpt__text">{amount}</p>
			<button type="button" className="inpt__button" onClick={increment}>
				+
			</button>
		</div>
	);
}

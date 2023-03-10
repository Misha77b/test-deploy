import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsData } from "../../../store/selectors";
import { fetchProducts } from "../../../store/reducers/productsSlice";

const useFetchData = () => {
	const dispatch = useDispatch();
	const initialProducts = useSelector(selectProductsData);
	const [products, setProducts] = useState([...initialProducts]);
	useEffect(() => {
		const data = dispatch(fetchProducts());
		data.then((res) => {
			setProducts(res.payload);
		});
	}, []);
	return products;
};

export default useFetchData;

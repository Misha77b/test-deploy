import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import styled from "styled-components";
import RootRouters from "../Router/Router";
import theme from "../theming";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { setModal } from "../store/reducers/modalSlice";
// eslint-disable-next-line import/named
import { modals } from "../components/Modal/configs";

const App = () => {
	const modal = useSelector((state) => state.modal.value);
	const dispatch = useDispatch();
	const actionModalHandler = (status) => {
		dispatch(setModal(status));
	};

	const activeModal = modals[modal] ?? null;
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Wrapper>
					{activeModal}
					<Header modal={actionModalHandler} />
					<RootRouters />
					<Footer />
				</Wrapper>
			</BrowserRouter>
		</ThemeProvider>
	);
};
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
export default App;

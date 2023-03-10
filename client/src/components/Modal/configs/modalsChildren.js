import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Typography } from "@mui/material";
import Modal from "../Modal";
import PageForm from "../../Form/Form";

const ModalContainer = styled.div`
	text-align: center;
	padding: 60px 85px;
`;

export const modals = {
	SUCCESS: (
		<Modal status="SUCCESS" customWidth={600}>
			{({ order, onStatusChange, onNavigate }) => {
				return (
					<>
						<ModalContainer>
							<Typography
								variant="h5"
								color="secondary"
								sx={{
									fontWeight: "700",
									fontSize: "30px",
									lineHeight: "180%",
									marginBottom: "12px",
								}}
							>
								Дякуємо, що вибрали нас!
							</Typography>
							<Typography
								component="p"
								sx={{ fontSize: "18px", lineHeight: " 180%", marginBottom: "50px" }}
							>
								`Ваше замовлення № {order} успішно оформлене. Чекайте на дзвінок від нашого
								фахівця.`
							</Typography>
							<Button
								color="secondary"
								variant="contained"
								sx={{
									padding: "15px 20px",
								}}
								onClick={() => {
									onNavigate("/products");
									onStatusChange(null);
								}}
							>
								продовжити покупки
							</Button>
						</ModalContainer>
					</>
				);
			}}
		</Modal>
	),
	LOGIN: (
		<Modal status="LOGIN" customWidth={600}>
			{({ onStatusChange }) => {
				return (
					<>
						<PageForm
							status="LOGIN"
							onClose={() => {
								onStatusChange(null);
							}}
							onRegisterToggle={() => {
								onStatusChange("REGISTER");
							}}
						/>
					</>
				);
			}}
		</Modal>
	),
	REGISTER: (
		<Modal status="REGISTER">
			{({ onStatusChange }) => {
				return (
					<>
						<PageForm
							status="REGISTER"
							onLoginToggle={() => {
								onStatusChange("LOGIN");
							}}
							onClose={() => {
								onStatusChange(null);
							}}
						/>
					</>
				);
			}}
		</Modal>
	),
};

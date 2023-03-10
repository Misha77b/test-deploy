import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { schema as validationSchema } from "./Schema";
import Field from "../../../../components/Form/Field/Field";
// eslint-disable-next-line import/named
import { InputWrapper } from "../../ProfileMenuBlocks/EditProfile/styled";
import {
	fetchUpdateCustomerInfo,
	removeMessage,
} from "../../../../store/reducers/updateUserInfoSlice";
import ToastNotification from "../../../../components/ToastNotification";

const UserInfoForm = ({ email, firstName, lastName, mobile }) => {
	const dispatch = useDispatch();
	const message = useSelector((state) => state.customerInfo.message);
	const formik = useFormik({
		initialValues: {
			firstName,
			lastName,
			email,
			mobile,
		},
		onSubmit: (usersData) => {
			dispatch(fetchUpdateCustomerInfo(usersData));
			setTimeout(() => {
				dispatch(removeMessage());
			}, 3000);
		},
		validationSchema,
	});
	const { values, errors, touched } = formik;
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit();
			}}
			style={{
				display: "flex",
				justifyContent: "flex-start",
				flexDirection: "column",
				gap: "40px",
			}}
		>
			{message && <ToastNotification text="Ваші дані успішно змінені" />}
			<InputWrapper>
				<Field
					name="firstName"
					type="text"
					description="First Name"
					value={values.firstName}
					onChange={formik.handleChange}
					errors={touched.firstName && errors.firstName}
				/>
				<Field
					name="lastName"
					type="text"
					description="Last Name"
					value={values.lastName}
					onChange={formik.handleChange}
					errors={touched.lastName && errors.lastName}
				/>
				<Field
					name="email"
					type="email"
					description="Email"
					value={values.email}
					onChange={formik.handleChange}
					errors={touched.email && errors.email}
				/>
				<Field
					name="mobile"
					type="tel"
					description="Mobile"
					value={values.mobile}
					onChange={formik.handleChange}
					errors={touched.mobile && errors.mobile}
				/>
			</InputWrapper>
			<div className="submit__btn__container">
				<button className="submit__btn" type="submit">
					Зберегти зміни
				</button>
			</div>
		</form>
	);
};

export default UserInfoForm;

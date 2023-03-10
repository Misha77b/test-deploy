import * as yup from "yup";

const REQUIRED = "This field is required to fill in";

export const schema = yup.object().shape({
	fullName: yup.string().required(REQUIRED),
	email: yup.string("Enter your email").required("Email is required"),
	phoneNumber: yup.number().required(REQUIRED),
});

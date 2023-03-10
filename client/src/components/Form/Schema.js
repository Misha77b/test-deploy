import * as yup from "yup";

const REQUIRED = "This field is required to fill in";

export const schema = yup.object().shape({
	firstName: yup.string().required(REQUIRED),
	lastName: yup.string().required(REQUIRED),
	login: yup.string().required(REQUIRED),
	email: yup.string().required(REQUIRED),
	telephone: yup.string().required(REQUIRED),
	password: yup.string().required(REQUIRED),
});
export const validationSchema2 = yup.object().shape({
	email: yup.string().required(REQUIRED),
	password: yup.string().required(REQUIRED),
});

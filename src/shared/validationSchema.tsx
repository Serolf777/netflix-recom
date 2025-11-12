import * as yup from 'yup';

const userNameRegex = /^[A-Za-z0-9]*$/;
const passwordCheckRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

export const SignInValidationSchema = yup.object().shape({
    username: yup.string().max(25, 'Username cannot be more than 25 characters')
        .matches(userNameRegex, "Username must only contain letters and numbers." )
        .required('User name is required.'),
    password: yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(passwordCheckRegex, "Password must have minimum one number and one uppercase letter.")
        .required('Password is required')
});
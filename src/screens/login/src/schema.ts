import { NO_WHITE_SPACE, VALID_EMAIL, VALID_PASSWORD } from 'utils/validate';
import * as yup from 'yup';

const loginSchema = yup.object({
    email: yup
        .string()
        .required('This Field is required.')
        .email('Email is invalid.')
        .matches(VALID_EMAIL, 'Email is invalid.'),
    password: yup
        .string()
        .required('This Field is required.')
        .matches(
            VALID_PASSWORD,
            'Passwords must contain at least 8 characters, capital letters, lowercase letters, numbers, no space and must match the duplicate password box.'
        )
        .matches(
            NO_WHITE_SPACE,
            'Passwords must contain at least 8 characters, capital letters, lowercase letters, numbers, no space and must match the duplicate password box.'
        ),
});

export default loginSchema;

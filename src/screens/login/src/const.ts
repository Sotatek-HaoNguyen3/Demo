const loginFieldName = {
    email: 'Email',
    password: 'Password',
};

const loginDataForm = [
    {
        name: loginFieldName.email,
        type: 'input-text',
        placeholder: 'Email',
        label: 'Email',
    },
    {
        name: loginFieldName.password,
        type: 'input-text',
        placeholder: 'Password',
        label: 'Password',
    },
];

export { loginFieldName, loginDataForm };

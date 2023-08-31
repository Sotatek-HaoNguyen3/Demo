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
        icon: 'IcEmail',
    },
    {
        name: loginFieldName.password,
        type: 'input-text',
        placeholder: 'Password',
        label: 'Password',
        icon: 'IcLock',
    },
];

export { loginFieldName, loginDataForm };

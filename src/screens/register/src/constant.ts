const registerFieldName = {
    email: 'Email',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'ConfirmPassword',
};

const registerDataForm = [
    {
        name: registerFieldName.email,
        type: 'input-text',
        placeholder: 'Email',
        icon: 'IcEmail',
    },
    {
        name: registerFieldName.username,
        type: 'input-text',
        placeholder: 'Username',
        icon: 'IcUsername',
    },
    {
        name: registerFieldName.password,
        type: 'input-text',
        placeholder: 'Password',
        icon: 'IcLock',
    },
    {
        name: registerFieldName.confirmPassword,
        type: 'input-text',
        placeholder: 'Confirm Password',
        icon: 'IcLock',
    },
];

export { registerFieldName, registerDataForm };

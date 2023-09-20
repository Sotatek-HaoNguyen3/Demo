const registerFieldName = {
    email: 'email',
    username: 'username',
    password: 'password',
    confirmPassword: 'confirmPassword',
};

const registerDataForm = [
    {
        name: registerFieldName.email,
        type: 'input-text',
        placeholder: 'Email',
        icon: 'Email',
    },
    {
        name: registerFieldName.username,
        type: 'input-text',
        placeholder: 'Username',
        icon: 'Username',
    },
    {
        name: registerFieldName.password,
        type: 'input-text',
        placeholder: 'Password',
        icon: 'Lock',
    },
    {
        name: registerFieldName.confirmPassword,
        type: 'input-text',
        placeholder: 'confirmPassword',
        icon: 'Lock',
    },
];

export { registerFieldName, registerDataForm };

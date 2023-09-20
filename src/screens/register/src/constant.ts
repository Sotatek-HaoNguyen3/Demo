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
        on: 'Email',
    },
    {
        name: registerFieldName.username,
        type: 'input-text',
        placeholder: 'Username',
        on: 'Username',
    },
    {
        name: registerFieldName.password,
        type: 'input-text',
        placeholder: 'Password',
        on: 'Lock',
    },
    {
        name: registerFieldName.confirmPassword,
        type: 'input-text',
        placeholder: 'confirmPassword',
        on: 'Lock',
    },
];

export { registerFieldName, registerDataForm };

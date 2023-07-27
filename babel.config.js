module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: ['.ts', '.tsx', '.js', 'jsx', '.ios.js', '.android.js'],
            },
        ],
        'react-native-reanimated/plugin',
        {
            globals: ['__scanCodes'],
        },
    ],
    env: {
        production: {
            plugins: ['transform-remove-console'],
        },
    },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                neue: ['"Neue"', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

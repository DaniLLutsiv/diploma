module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
    important: '#__next',
};
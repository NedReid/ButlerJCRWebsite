// tailwind.config.js
module.exports = {
    mode: 'jit',
    // purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    content: ["./**/*.{html,jsx}"],
    // specify other options here
    theme: {
        // Some useful comment
        fontFamily: {
            'raleway': ['raleway', 'sans-serif'],
        },
        extend: {
            keyframes: {
                pingOnce:  {
                    '25%': {transform: 'scale(1.05)', opacity:'0.8'},
                    '100%': {transform: 'scale(1)', opacity:'1'}
                }
            },
            animation: {
                pingOnce: 'pingOnce 0.5s cubic-bezier(0, 0, 0.2, 1)',
            }
        }
    },
    plugins: [require("daisyui")],

};
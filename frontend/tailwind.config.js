// tailwind.config.js
module.exports = {
    mode: 'jit',
    // purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    content: ["./**/*.{html,jsx}", "node_modules/daisyui/dist/**/*.js"],
    // specify other options here
    theme: {
        screens: {
            'xs': '450px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
            // Some useful comment
        fontFamily: {
            'raleway': ['raleway', 'sans-serif'],
        },
        extend: {
            keyframes: {
                pingOnce:  {
                    '25%': {transform: 'scale(1.05)', opacity:'0.8'},
                    '100%': {transform: 'scale(1)', opacity:'1'}
                },
                fadein:  {
                    '0%': {transform: 'scale(1)', opacity:'0'},
                    '100%': {transform: 'scale(1)', opacity:'1'}
                }
            },
            animation: {
                pingOnce: 'pingOnce 0.5s cubic-bezier(0, 0, 0.2, 1)',
                fadein: 'fadein 0.5s cubic-bezier(0, 0, 0.2, 1)',

            }
        }
    },
    plugins: [
        require("daisyui"),
        require('@tailwindcss/typography'),
    ],

};
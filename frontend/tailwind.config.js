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
    },
};
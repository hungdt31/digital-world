/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}", "./public/index.html"],
    theme: {
        extend: {
            fontFamily: {
                main: ["Poppins", "sans-serif;"],
            },
            width: {
                main: "1220px",
            },
            backgroundColor: {
                main: "#ee3131",
            },
            colors: {
                main: "#ee3131",
            },
            keyframes: {
                slideRight: {
                    "0%": {
                        transform: "translateX(100px)",
                    },
                    "100%": {
                        transform: "translateX(0px)",
                    },
                },
                scaleUpVerCenter: {
                    "0%": {
                        transform: "scaleY(0.4)",
                    },
                    "100%": {
                        transform: "scaleY(1)",
                    }
                }
            },
            screens: {
                'medium': '500px',
            },
        },
        plugins: [],
    },
};

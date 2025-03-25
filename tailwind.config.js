/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4F46E5", // Indigo
                secondary: "#10B981", // Emerald
                accent: "#F59E0B", // Amber
                background: "#F9FAFB", // Light gray
                text: "#1F2937", // Dark gray
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
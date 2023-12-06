/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			transitionTimingFunction: {
				"spring-1": "var(--ease-spring-1)",
				"spring-2": "var(--ease-spring-2)",
				"spring-3": "var(--ease-spring-3)",
				"spring-4": "var(--ease-spring-4)",
				"spring-5": "var(--ease-spring-5)",
			},
			fontFamily: {
				sans: ["Haskoy", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
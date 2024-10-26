import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {},
			screens: {
				"xs": "376px",
				"xsm": "425px",
				...defaultTheme.screens,
				"3xl": "1650px",
				"4xl": "1920px",
			},
		},
	},
	plugins: [],
}

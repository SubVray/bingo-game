import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "auto",
			workbox: {
				clientsClaim: true,
				skipWaiting: true,
			},
			manifest: {
				name: " Bingo Game",
				short_name: " Bingo Game",
				description: " Bingo Game",
				theme_color: "#13151a",
				background_color: "#13151a",
				display: "fullscreen",
				scope: "/",
				start_url: "/",
				icons: [
					{
						src: "/images/bingo.webp",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/images/bingo.webp",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
})

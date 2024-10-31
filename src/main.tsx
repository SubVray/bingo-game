import "@/styles/font.css"
import "@/styles/index.css"
// Supports weights 300-900
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./pages/App.tsx"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
)

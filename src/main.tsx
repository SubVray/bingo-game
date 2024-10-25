import "@/styles/font.css"
import "@/styles/index.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.tsx"
import PlayBingo from "./pages/PlayBingo.tsx"
import QuantityOfBingoCards from "./pages/QuantityOfBingoCards.tsx"
import SelectBingoCard from "./pages/SelectBingoCard.tsx"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/quantity-of-bingo-cards",
		element: <QuantityOfBingoCards />,
	},
	{
		path: "/select-bingo-card",
		element: <SelectBingoCard />,
	},
	{
		path: "/play-bingo",
		element: <PlayBingo />,
	},
])

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)

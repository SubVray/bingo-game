import { useNavigate } from "react-router-dom"
import { Button } from "./components/Button"
import { Logo } from "./components/Logo"
import Layout from "./layout/Layout"

const App = () => {
	const navigate = useNavigate()
	return (
		<Layout>
			<section>
				<Logo />
				<p className="text-center text-xl font-semibold my-6 max-w-[35ch] mx-auto">
					Seleccione el modo de juego
				</p>
				<div>
					<Button
						onClick={() => {
							navigate("/quantity-of-bingo-cards")
							localStorage.setItem("gameMode", "mi-bingo")
						}}
						className="bg-blue-500 border-blue-500/50 hover:ring ring-blue-500/30 hover:bg-blue-600 hover:border-blue-500"
					>
						Mi Carton Bingo
					</Button>
					<Button
						onClick={() => {
							navigate("quantity-of-bingo-cards")
							localStorage.setItem("gameMode", "carton-bingo")
						}}
						className="bg-orange-500 border-orange-500/50 hover:ring ring-orange-500/30 hover:bg-orange-600 hover:border-orange-500"
					>
						Carton Bingo
					</Button>
				</div>
			</section>
		</Layout>
	)
}

export default App

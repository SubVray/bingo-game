import { useNavigate } from "react-router-dom"
import { Button } from "./components/Button"
import { Container } from "./components/Container"
import InstallPrompt from "./components/InstallPrompt"
import { Logo } from "./components/Logo"
import { Section } from "./components/Section"
import Layout from "./layout/Layout"

const App = () => {
	const navigate = useNavigate()
	return (
		<Layout>
			<Section>
				<InstallPrompt />
				<Logo />
				<p className="text-center text-xl font-semibold my-6 max-w-[35ch] mx-auto">
					Seleccione el modo de juego
				</p>
				<Container>
					<Button
						onClick={() => {
							navigate("/quantity-of-bingo-cards")
							localStorage.setItem("gameMode", "mi-bingo")
						}}
						disabled={true}
						className="relative bg-blue-500 border-blue-500/50 hover:ring ring-blue-500/30 hover:bg-blue-600 hover:border-blue-500 overflow-hidden disabled:bg-blue-500 disabled:border-none py-[18px]  "
					>
						<span className="absolute top-5 -right-10  text-xs bg-red-500 px-12 rounded rotate-[30deg] ">
							Próximamente
						</span>
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
				</Container>
			</Section>
		</Layout>
	)
}

export default App

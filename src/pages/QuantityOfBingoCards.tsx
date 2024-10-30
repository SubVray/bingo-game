import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { Logo } from "@/components/Logo"
import { Section } from "@/components/Section"
import Layout from "@/layout/Layout"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const QuantityOfBingoCards = () => {
	const navigate = useNavigate()
	const SwalQuantityOfBingoCards = withReactContent(Swal)
	const [gameMode, setGameMode] = useState<string>("")

	useEffect(() => {
		const gameMode = localStorage.getItem("gameMode")
		if (gameMode) setGameMode(gameMode)
	}, [])

	const selectNumberOfBingoCards = async () => {
		try {
			const { value: quantityOfBingoCards } =
				await SwalQuantityOfBingoCards.fire({
					title: "Cartones",
					text: "Seleccione la cantidad de cartones",
					icon: "question",
					input: "range",
					inputAttributes: {
						min: "1",
						max: "4",
						step: "1",
					},
					inputValue: 2,
					confirmButtonText: "Continuar",
					confirmButtonColor: "#3085d6",
					customClass: {
						popup: " bg-[#13151a] ",
						title: "text-neutral-200",
						input: "!bg-transparent",
					},
				})

			if (quantityOfBingoCards) {
				localStorage.setItem("quantityOfBingoCards", quantityOfBingoCards)

				if (gameMode === "mi-bingo") {
					navigate("/select-mi-bingo-card")
				}

				if (gameMode === "carton-bingo") {
					navigate("/select-bingo-card")
				}
			}
		} catch (error) {
			console.error("Error selecting bingo cards:", error)
			Swal.fire(
				"Error",
				"Hubo un problema al seleccionar los cartones.",
				"error"
			)
		}
	}

	return (
		<Layout>
			<Section>
				<Logo />
				<p className="text-center text-xl font-semibold my-6 max-w-[35ch] mx-auto">
					Seleccione la cantidad de cartones
				</p>
				<Container>
					<Button
						onClick={selectNumberOfBingoCards}
						className="bg-blue-500 border-blue-500/50 hover:ring ring-blue-500/30 hover:bg-blue-600 hover:border-blue-500"
					>
						Cantidad de Cartones
					</Button>
					<Button
						onClick={() => navigate("/")}
						className="bg-red-500 border-red-500/50 hover:ring ring-red-500/30 hover:bg-red-600 hover:border-red-500"
					>
						Salir
					</Button>
				</Container>
			</Section>
		</Layout>
	)
}

export default QuantityOfBingoCards

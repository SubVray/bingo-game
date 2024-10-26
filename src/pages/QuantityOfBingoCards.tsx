import { Button } from "@/components/Button"
import { Logo } from "@/components/Logo"
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
		if (gameMode) {
			setGameMode(gameMode)
		}
	}, [])

	const selectNumberOfBingoCards = async () => {
		const { value: quantityOfBingoCards } = await SwalQuantityOfBingoCards.fire(
			{
				title: "Cuantos cartones?",
				icon: "question",
				input: "range",
				inputAttributes: {
					min: "1",
					max: "4",
					step: "1",
				},
				inputValue: 2,
				confirmButtonText: "Continue",
				confirmButtonColor: "#3085d6",
			}
		)

		if (quantityOfBingoCards) {
			localStorage.setItem("quantityOfBingoCards", quantityOfBingoCards)

			if (gameMode === "mi-bingo") {
				navigate("/select-mi-bingo-card")
			}

			if (gameMode === "carton-bingo") {
				navigate("/select-bingo-card")
			}
		}
	}

	return (
		<Layout>
			<section>
				<Logo />
				<p className="text-center text-xl font-semibold my-6 max-w-[40ch] mx-auto">
					Por favor seleccione la cantidad de cartones que desea.
				</p>
				<div className="">
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
				</div>
			</section>
		</Layout>
	)
}

export default QuantityOfBingoCards

import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { Logo } from "@/components/Logo"
import { Paragraph } from "@/components/Paragraph"
import { Section } from "@/components/Section"
import useDisableNavigationButtons from "@/hooks/useDisableNavigationButtons "
import { useGlobalStore } from "@/store/GlobalStore"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const QuantityOfBingoCards = () => {
	useDisableNavigationButtons()
	const setHome = useGlobalStore((state) => state.setHome)
	const setQuantityOfBingoCards = useGlobalStore(
		(state) => state.setQuantityOfBingoCards
	)
	const setSelectBingoCard = useGlobalStore((state) => state.setSelectBingoCard)
	const setSelectMiBingoCard = useGlobalStore(
		(state) => state.setSelectMiBingoCard
	)
	const SwalQuantityOfBingoCards = withReactContent(Swal)
	const [gameMode, setGameMode] = useState<string>("")

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
					setQuantityOfBingoCards(false)
					setSelectMiBingoCard(true)
				}

				if (gameMode === "carton-bingo") {
					setQuantityOfBingoCards(false)
					setSelectBingoCard(true)
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

	useEffect(() => {
		const gameMode = localStorage.getItem("gameMode")
		if (gameMode) setGameMode(gameMode)
	}, [])

	return (
		<Section>
			<Logo />
			<Paragraph className="mx-auto my-6 max-w-[35ch] text-center text-xl font-semibold">
				Seleccione la cantidad de cartones
			</Paragraph>
			<Container>
				<Button
					onClick={selectNumberOfBingoCards}
					className="border-blue-500/50 bg-blue-500 ring-blue-500/30 hover:border-blue-500 hover:bg-blue-600 hover:ring"
				>
					Cantidad de Cartones
				</Button>
				<Button
					onClick={() => {
						setQuantityOfBingoCards(false)
						setHome(true)
					}}
					className="border-red-500/50 bg-red-500 ring-red-500/30 hover:border-red-500 hover:bg-red-600 hover:ring"
				>
					Salir
				</Button>
			</Container>
		</Section>
	)
}

export default QuantityOfBingoCards

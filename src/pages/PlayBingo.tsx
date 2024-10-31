import { PlayBingoGame } from "@/components/PlayBingoGame"
import { Section } from "@/components/Section"
import useDisableNavigationButtons from "@/hooks/useDisableNavigationButtons "
import { Carton } from "@/types/carton"
import { ModeGame } from "@/types/modeGames"
import { useEffect, useState } from "react"

const PlayBingo = () => {
	useDisableNavigationButtons()
	const [modeGames, setModeGames] = useState<ModeGame[]>([])
	const [mostrarCartonesSeleccionados, setMostrarCartonesSeleccionados] =
		useState<Carton[]>([])
	const [numberOfCards, setNumberOfCards] = useState<number>(0)

	// Load initial data from localStorage on component mount
	useEffect(() => {
		try {
			const modeGames = localStorage.getItem("modeGames")
			const numberOfCards = localStorage.getItem("quantityOfBingoCards")
			const cartonesSeleccionados = localStorage.getItem("selectedBingoCards")

			if (modeGames) setModeGames(JSON.parse(modeGames))

			if (numberOfCards) setNumberOfCards(JSON.parse(numberOfCards))

			if (cartonesSeleccionados)
				setMostrarCartonesSeleccionados(JSON.parse(cartonesSeleccionados))
		} catch (error) {
			console.error("Error loading data from localStorage:", error)
		}
	}, [])

	return (
		<Section className="w-full mt-4">
			<PlayBingoGame
				modeGames={modeGames}
				mostrarCartonesSeleccionados={mostrarCartonesSeleccionados}
				numberOfCards={numberOfCards}
			/>
		</Section>
	)
}

export default PlayBingo

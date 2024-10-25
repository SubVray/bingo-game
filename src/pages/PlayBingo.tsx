import { PlayBingoGame } from "@/components/PlayBingoGame"
import Layout from "@/layout/Layout"
import { Carton } from "@/types/carton"
import { ModeGame } from "@/types/modeGames"
import { useEffect, useState } from "react"

const PlayBingo = () => {
	const [modeGames, setModeGames] = useState<ModeGame[]>([])
	const [mostrarCartonesSeleccionados, setMostrarCartonesSeleccionados] =
		useState<Carton[]>([])
	const [numberOfCards, setNumberOfCards] = useState<number>(0)

	useEffect(() => {
		const modeGames = localStorage.getItem("modeGames")
		if (modeGames) {
			setModeGames(JSON.parse(modeGames))
		}
	}, [])

	useEffect(() => {
		const numberOfCards = localStorage.getItem("numberOfCards")
		if (numberOfCards) {
			setNumberOfCards(JSON.parse(numberOfCards))
		}
	}, [])

	useEffect(() => {
		const cartonesSeleccionados = localStorage.getItem("selectedBingoCards")
		if (cartonesSeleccionados) {
			setMostrarCartonesSeleccionados(JSON.parse(cartonesSeleccionados))
		}
	}, [])
	return (
		<Layout>
			<section className="w-full mt-4">
				<PlayBingoGame
					modeGames={modeGames}
					mostrarCartonesSeleccionados={mostrarCartonesSeleccionados}
					numberOfCards={numberOfCards}
				/>
			</section>
		</Layout>
	)
}

export default PlayBingo

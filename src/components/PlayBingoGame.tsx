import { Carton } from "@/types/carton"
import { ModeGame } from "@/types/modeGames"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import BingoCards from "./BingoCards"

export const PlayBingoGame = ({
	modeGames,
	mostrarCartonesSeleccionados,
	numberOfCards,
}: {
	modeGames: ModeGame[]
	mostrarCartonesSeleccionados: Carton[]
	numberOfCards: number
}) => {
	const navigate = useNavigate()
	const MySwal = withReactContent(Swal)
	const [gameMode, setGameMode] = useState<string>("")
	const fetchSavedGames = (carton: Carton) => {
		const allCartones = Object.keys(localStorage)
			.filter((key) => key.startsWith("carton-")) // Filtra las claves que comienzan con "carton-"
			.map((key) => JSON.parse(localStorage.getItem(key) || "{}")) // Parsear cada cartón

		const cartonSaved = allCartones.find((c) => c.id === carton.id)
		return cartonSaved
	}

	useEffect(() => {
		const gameMode = localStorage.getItem("gameMode")
		if (gameMode) {
			setGameMode(gameMode)
		}
	}, [])

	const handleExit = () => {
		MySwal.fire({
			title: "Estas seguro que quieres salir?",
			text: "Si te sales pierdes tu progreso",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si",
			cancelButtonText: "No",
		}).then((result) => {
			if (result.isConfirmed) {
				Object.keys(localStorage)
					.filter((key) => key.startsWith("carton-"))
					.map((key) => localStorage.removeItem(key))
				Object.keys(localStorage)
					.filter((key) => key.startsWith("cartonIs"))
					.map((key) => localStorage.removeItem(key))

				if (gameMode === "mi-bingo") {
					navigate("/select-mi-bingo-card")
				}

				if (gameMode === "carton-bingo") {
					navigate("/select-bingo-card")
				}
			}
		})
	}

	return (
		<section className="mt-2 w-full">
			<header className="w-full px-8">
				<div className="flex w-full items-center justify-center gap-4">
					<button
						type="button"
						onClick={handleExit}
						className="block w-full rounded-md bg-red-500 px-4 py-2 text-center text-xl font-semibold text-white transition hover:bg-red-600"
					>
						Salir
					</button>
				</div>
			</header>
			<div
				className={`mt-6 flex w-full flex-wrap ${numberOfCards > 2 ? "flex-row" : "flex-col gap-3"} `}
			>
				{mostrarCartonesSeleccionados &&
					mostrarCartonesSeleccionados.map((carton: Carton) => (
						<div
							key={carton.id} // Esto fuerza la actualización
							className={` ${numberOfCards > 2 ? "w-1/2" : "w-full"}  `}
						>
							<BingoCards
								carton={fetchSavedGames(carton) || carton}
								modeGames={modeGames}
								numberOfCards={numberOfCards}
							/>
						</div>
					))}
			</div>
		</section>
	)
}

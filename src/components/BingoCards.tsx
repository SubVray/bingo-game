import { useCallback, useEffect, useState } from "react"

import Confetti from "react-confetti"
import useWindowSize from "react-use/lib/useWindowSize"

import { BingoLetter, Carton } from "@/types/carton"
import { initialModesState, ModeGame, ModeGameValue } from "@/types/modeGames"
import { gameModeValidation } from "@/utils/gameModeValidation"
import { capitalize } from "@/utils/helpers"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import ButtonNumbers from "./ButtonNumbers"
import ColumnHeader from "./ColumnHeader"
import { Container } from "./Container"
import { ModesGames } from "./ModesGames"

const soundWin = new Audio("/sounds/win.mp3")

const BingoCards = ({
	carton,
	modeGames,
	numberOfCards,
}: {
	carton: Carton
	modeGames: ModeGame[]
	numberOfCards: number
}) => {
	const MySwal = withReactContent(Swal)
	const { width, height } = useWindowSize()

	const [cartonState, setCartonState] = useState<Carton>(carton)
	const [isConfettiRunning, setIsConfettiRunning] = useState<boolean>(false)
	const [modesCompleted, setModesCompleted] = useState(initialModesState)
	const [disableButtons, setDisableButtons] = useState<boolean>(false)

	const showCompletionDialog = useCallback(async () => {
		await MySwal.fire({
			title: "¡Haz completado todo el cartón!",
			confirmButtonText: "Revisar",
			confirmButtonColor: "#3085d6",
		})
	}, [])

	const handleDoubleClick = (letra: BingoLetter, index: number) => {
		setCartonState((prevCartonState) => {
			const newCarton = {
				...prevCartonState,
				cartonData: {
					...prevCartonState.cartonData,
					[letra]: prevCartonState.cartonData[letra].map((item, idx) =>
						idx === index ? { ...item, isActive: !item.isActive } : item
					),
				},
			}

			// Actualizamos localStorage con el nuevo estado
			localStorage.setItem(`carton-${carton.id}`, JSON.stringify(newCarton))

			// Validamos el modo de juego con el estado actualizado
			handleCheckModeGame(newCarton, modeGames)

			return newCarton
		})
	}

	const handleCheckModeGame = (
		cartonState: Carton,
		modeGames: { value: ModeGameValue }[]
	) => {
		const updatedModes = { ...modesCompleted }

		modeGames.forEach(({ value: modeGame }) => {
			const checkFunction = gameModeValidation(modeGame)
			if (checkFunction(cartonState) && !modesCompleted[modeGame]) {
				setIsConfettiRunning(true)
				updatedModes[modeGame] = true
				localStorage.setItem(
					`cartonIs${capitalize(modeGame)}Completed`,
					JSON.stringify(true)
				)
			}
		})

		setModesCompleted(updatedModes)
	}

	useEffect(() => {
		// Cargar los estados completados desde localStorage
		const loadModesFromLocalStorage = () => {
			const updatedModes = { ...initialModesState }
			;(Object.keys(initialModesState) as ModeGameValue[]).forEach((mode) => {
				const completed = localStorage.getItem(
					`cartonIs${capitalize(mode)}Completed`
				)
				if (completed) {
					updatedModes[mode] = JSON.parse(completed)
				}
			})
			setModesCompleted(updatedModes)
		}

		loadModesFromLocalStorage()
	}, [])

	useEffect(() => {
		if (modesCompleted["fullCarton"]) {
			showCompletionDialog()
			soundWin.play().catch((error) => {
				console.error("Error al reproducir el sonido:", error)
			})
			setDisableButtons(true)
		}
	}, [modesCompleted, showCompletionDialog])

	const [showAndHide, setShowAndHide] = useState(false)

	return (
		<Container className="w-full select-none rounded-md border-2 border-gray-600/50 shadow">
			<ColumnHeader />
			<Container className="w-full border-t border-gray-800 text-center text-sm font-light">
				{cartonState &&
					[0, 1, 2, 3, 4].map((index) => (
						<Container
							className={`flex border-gray-800 ${index !== 0 ? "border-t-2" : "border-none"}`}
							key={index}
						>
							{(["b", "i", "n", "g", "o"] as BingoLetter[]).map(
								(letra: BingoLetter, letraIndex: number) => {
									const { isActive, number } =
										cartonState.cartonData[letra][index]
									return (
										<ButtonNumbers
											key={`${letra}-${letraIndex}`}
											letra={letra}
											index={index}
											isActive={isActive}
											number={number}
											cartonId={cartonState.id}
											onDoubleClick={() => handleDoubleClick(letra, index)}
											disabled={disableButtons}
										/>
									)
								}
							)}
						</Container>
					))}
			</Container>

			<ModesGames
				numberOfCards={numberOfCards}
				showAndHide={showAndHide}
				setShowAndHide={setShowAndHide}
				modeGames={modeGames}
				modesCompleted={modesCompleted}
			/>

			{isConfettiRunning && (
				<Confetti
					width={width}
					height={height}
					run={isConfettiRunning}
					numberOfPieces={200}
					tweenDuration={0.2}
					recycle={false}
					gravity={0.4}
					onConfettiComplete={() => setIsConfettiRunning(false)}
				/>
			)}
		</Container>
	)
}

export default BingoCards

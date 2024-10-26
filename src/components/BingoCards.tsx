import * as validation from "@/utils/validationBingoCards/index"
import { useCallback, useEffect, useState } from "react"

import Confetti from "react-confetti"
import useWindowSize from "react-use/lib/useWindowSize"

import { Chevron } from "@/icons/Chevron"
import { Carton } from "@/types/carton"
import { initialModesState, ModeGame, ModeGameValue } from "@/types/modeGames"
import { capitalize } from "@/utils/helpers"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import ButtonNumbers from "./ButtonNumbers"
import ColumnHeader from "./ColumnHeader"

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

	const showCompletionDialog = useCallback(async () => {
		await MySwal.fire({
			title: "¡Haz completado todo el cartón!",
			confirmButtonText: "Revisar",
			confirmButtonColor: "#3085d6",
		})
	}, [])

	const handleDoubleClick = (
		letra: string | "b" | "i" | "n" | "g" | "o",
		index: number
	) => {
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
			const checkFunction = getCheckFunctionForMode(modeGame)
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

	// Obtener la función de validación adecuada para cada modo
	const getCheckFunctionForMode = (modeGame: ModeGameValue) => {
		switch (modeGame) {
			case "fullCarton":
				return validation.checkFullCarton
			case "fourCorners":
				return validation.checkFourCorners
			case "horizontal":
				return validation.checkHorizontal
			case "vertical":
				return validation.checkVertical
			case "diagonal":
				return validation.checkDiagonal
			case "Z":
				return validation.checkZ
			case "ZInverted":
				return validation.checkInvertedZ
			case "I":
				return validation.checkI
			case "L":
				return validation.checkL
			case "LInverted":
				return validation.checkInvertedL
			case "O":
				return validation.checkO
			case "U":
				return validation.checkU
			case "UInverted":
				return validation.checkInvertedU
			case "N":
				return validation.checkN
			case "M":
				return validation.checkM
			case "W":
				return validation.checkW
			case "T":
				return validation.checkT
			case "E":
				return validation.checkE
			case "F":
				return validation.checkF
			case "Y":
				return validation.checkY
			case "H":
				return validation.checkH
			case "X":
				return validation.checkX
			case "arrowUp":
				return validation.checkArrowUp
			case "arrowDown":
				return validation.checkArrowDown
			case "arrowLeft":
				return validation.checkArrowLeft
			case "arrowRight":
				return validation.checkArrowRight
			default:
				throw new Error(`Modo de juego desconocido: ${modeGame}`)
		}
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
		}
	}, [modesCompleted, showCompletionDialog])

	const [showAndHide, setShowAndHide] = useState(false)
	return (
		<div className="w-full select-none rounded-md border-2 border-gray-600/50 shadow">
			<ColumnHeader />
			<div className="w-full border-t border-gray-800 text-center text-sm font-light">
				{cartonState &&
					[0, 1, 2, 3, 4].map((index) => (
						<div
							className={`flex border-gray-800 ${index !== 0 ? "border-t-2" : "border-none"}`}
							key={index}
						>
							{["b", "i", "n", "g", "o"].map(
								(
									letra: string | "b" | "i" | "n" | "g" | "o",
									letraIndex: number
								) => {
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
										/>
									)
								}
							)}
						</div>
					))}
			</div>
			<div className="relative p-2">
				<div className="mb-2 flex items-center justify-between">
					<div className={`absolute right-2 flex items-center justify-center`}>
						<button onClick={() => setShowAndHide(!showAndHide)}>
							<Chevron
								className={` text-gray-50 transition duration-300 ${showAndHide ? "rotate-180" : ""} ${numberOfCards > 2 ? "size-4" : "size-6"}`}
							/>
						</button>
					</div>
					<h3 className="text-center font-semibold text-gray-50">
						Modos completados:
					</h3>
				</div>
				<div
					className={`overflow-hidden opacity-0 transition-all duration-300 ${showAndHide ? "h-[calc-size(auto)] opacity-100" : "h-0"}`}
				>
					{modeGames.length > 0 ? (
						<ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
							{modeGames.map(({ label, value }) => (
								<li
									key={value}
									className={`rounded-md border px-2 py-1 font-semibold shadow ${
										modesCompleted[value]
											? "border-green-800 bg-green-600"
											: "border-red-800 bg-red-500"
									}`}
								>
									{label}
								</li>
							))}
						</ul>
					) : null}
				</div>
			</div>
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
		</div>
	)
}

export default BingoCards

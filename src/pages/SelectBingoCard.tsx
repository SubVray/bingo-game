import { Button } from "@/components/Button"
import { Section } from "@/components/Section"
import { SelectBingoCards } from "@/components/SelectBingoCards"
import { modeGames } from "@/constants/gameModes"
import useDisableNavigationButtons from "@/hooks/useDisableNavigationButtons "
import { useGlobalStore } from "@/store/GlobalStore"
import { ModeGame } from "@/types/modeGames"
import { useEffect, useState } from "react"
import { MultiValue } from "react-select"
import CreatableSelect from "react-select/creatable"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const SelectBingoCard = () => {
	useDisableNavigationButtons()
	const MySwal = withReactContent(Swal)
	const [storedNumberOfBingoCards, setStoredNumberOfBingoCards] =
		useState<number>(0)
	const [isStartButtonDisabled, setIsStartButtonDisabled] =
		useState<boolean>(false)
	const [selectedModes, setSelectedModes] = useState<MultiValue<ModeGame>>([])

	const setSelectBingoCard = useGlobalStore((state) => state.setSelectBingoCard)
	const setQuantityOfBingoCards = useGlobalStore(
		(state) => state.setQuantityOfBingoCards
	)
	const setPlayBingo = useGlobalStore((state) => state.setPlayBingo)

	// Handle change in game modes selection
	const handleChange = (value: MultiValue<ModeGame>) => {
		setSelectedModes(value)
		localStorage.setItem("modeGames", JSON.stringify(value))
	}

	// Handle game start confirmation
	const handleStartGame = () => {
		MySwal.fire({
			title: "Que modos de juego quieres jugar?",
			width: "100%",
			html: (
				<CreatableSelect
					isMulti
					defaultValue={[modeGames[0]]}
					options={modeGames || selectedModes}
					placeholder="Selecciona los modos de juego"
					onChange={handleChange}
					styles={{
						control: (styles) => ({
							...styles,
							"width": "100%",
							"backgroundColor": "#0a0a0a",
							"border": "2px solid #13151a",
							"borderRadius": "0.5rem",
							"paddingTop": "0.5rem",
							"paddingBottom": "0.5rem",
							":hover": {
								borderColor: "#f9fafb",
							},
						}),

						multiValue: (styles) => ({
							...styles,
							backgroundColor: "#13151a",
							borderRadius: "0.3rem",
						}),
						multiValueLabel: (styles) => ({
							...styles,
							color: "#f9fafb",
							paddingTop: "0.5rem",
							paddingBottom: "0.5rem",
						}),
					}}
				/>
			),
			confirmButtonColor: "#3085d6",
			confirmButtonText: "empezar",
			customClass: {
				title:
					"text-center text-xl font-semibold max-w-[30ch] mx-auto text-neutral-200",
				container:
					"p-0 lg:px-[215px] xl:px-[420px] 2xl:px-[510px] 4xl:px-[620px] ",
				htmlContainer: "w-full h-[calc(100dvh-300px)] p-0 max-w-lg !mx-auto  ",
				popup: " bg-[#13151a] ",
				input: "!bg-transparent",
			},
		}).then((value) => {
			if (value.isConfirmed) {
				setSelectBingoCard(false)
				setPlayBingo(true)
				localStorage.setItem("playBingo", JSON.stringify(true))
			}
		})
	}

	// Load default game modes on mount
	useEffect(() => {
		const defaultModes = [modeGames[0]]
		setSelectedModes(defaultModes)
		localStorage.setItem("modeGames", JSON.stringify(defaultModes))
	}, [])

	// Fetch stored number of bingo cards on mount
	useEffect(() => {
		const storedNumberOfBingoCards = localStorage.getItem(
			"quantityOfBingoCards"
		)

		setStoredNumberOfBingoCards(
			storedNumberOfBingoCards ? Number(storedNumberOfBingoCards) : 0
		)
	}, [])

	return (
		<Section className="mt-4 w-full max-w-xl">
			<header className="flex gap-4">
				<Button
					disabled={isStartButtonDisabled}
					onClick={handleStartGame}
					className="border-green-500/50 bg-green-500 ring-green-500/30 hover:border-green-500 hover:bg-green-600 hover:ring disabled:border-gray-400"
				>
					Empezar
				</Button>
				<Button
					onClick={() => {
						setSelectBingoCard(false)
						setQuantityOfBingoCards(true)
					}}
					className="border-red-500/50 bg-red-500 ring-red-500/30 hover:border-red-500 hover:bg-red-600 hover:ring"
				>
					Salir
				</Button>
			</header>
			<SelectBingoCards
				storedNumberOfBingoCards={storedNumberOfBingoCards}
				setIsStartButtonDisabled={setIsStartButtonDisabled}
			/>
		</Section>
	)
}

export default SelectBingoCard

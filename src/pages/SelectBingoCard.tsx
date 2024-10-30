import { Button } from "@/components/Button"
import { Section } from "@/components/Section"
import { SelectBingoCards } from "@/components/SelectBingoCards"
import { modeGames } from "@/constants/gameModes"
import Layout from "@/layout/Layout"
import { ModeGame } from "@/types/modeGames"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MultiValue } from "react-select"
import CreatableSelect from "react-select/creatable"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const SelectBingoCard = () => {
	const MySwal = withReactContent(Swal)
	const navigate = useNavigate()
	const [storedNumberOfBingoCards, setStoredNumberOfBingoCards] =
		useState<number>(0)
	const [isStartButtonDisabled, setIsStartButtonDisabled] =
		useState<boolean>(false)
	const [selectedModes, setSelectedModes] = useState<MultiValue<ModeGame>>([])

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
							width: "100%",
							backgroundColor: "#0a0a0a",
							border: "1px solid #13151a",
							borderRadius: "0.5rem",
							paddingTop: "0.5rem",
							paddingBottom: "0.5rem",
						}),

						multiValue: (styles) => ({
							...styles,
							backgroundColor: "#13151a",
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
				container: "w-full h-full m-0 ",
				htmlContainer: "w-full h-[calc(100dvh-300px)] p-0  ",
				popup: " bg-[#13151a] ",
				input: "!bg-transparent",
			},
		}).then((value) => {
			if (value.isConfirmed) navigate("/play-bingo")
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
		<Layout>
			<Section className="w-full mt-4">
				<header className="flex gap-4">
					<Button
						disabled={isStartButtonDisabled}
						onClick={handleStartGame}
						className="bg-green-500 border-green-500/50 hover:ring ring-green-500/30 hover:bg-green-600 hover:border-green-500 disabled:border-gray-400"
					>
						Empezar
					</Button>
					<Button
						onClick={() => navigate("/quantity-of-bingo-cards")}
						className="bg-red-500 border-red-500/50 hover:ring ring-red-500/30 hover:bg-red-600 hover:border-red-500"
					>
						Salir
					</Button>
				</header>
				<SelectBingoCards
					storedNumberOfBingoCards={storedNumberOfBingoCards}
					setIsStartButtonDisabled={setIsStartButtonDisabled}
				/>
			</Section>
		</Layout>
	)
}

export default SelectBingoCard

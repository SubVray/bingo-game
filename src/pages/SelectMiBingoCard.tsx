import { Button } from "@/components/Button"
import { CreateMiBingoCards } from "@/components/CreateMiBingoCards"
import { modeGames } from "@/constants/gameModes"
import useDisableNavigationButtons from "@/hooks/useDisableNavigationButtons "
import Layout from "@/layout/Layout"
import { useGlobalStore } from "@/store/GlobalStore"
import { ModeGame } from "@/types/modeGames"
import { useEffect, useState } from "react"
import { MultiValue } from "react-select"
import CreatableSelect from "react-select/creatable"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const SelectMiBingoCard = () => {
	useDisableNavigationButtons()
	const MySwal = withReactContent(Swal)
	const [storedNumberOfBingoCards, setStoredNumberOfBingoCards] =
		useState<number>(0)

	const setPlayBingo = useGlobalStore((state) => state.setPlayBingo)

	const [selectedModes, setSelectedModes] = useState<MultiValue<ModeGame>>([])

	const handleChange = (value: MultiValue<ModeGame>) => {
		setSelectedModes(value)
		localStorage.setItem("modeGames", JSON.stringify(value))
	}

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
				/>
			),
			confirmButtonColor: "#3085d6",
			confirmButtonText: "empezar",
			customClass: {
				title: "text-center text-xl font-semibold max-w-[30ch] mx-auto",
				container: "w-full h-full m-0 ",
				htmlContainer: "w-full h-[calc(100dvh-300px)] p-0  ",
			},
		}).then((value) => {
			if (value.isConfirmed) {
				setPlayBingo(true)
			}
		})
	}

	useEffect(() => {
		const defaultModes = [modeGames[0]]
		setSelectedModes(defaultModes)
		localStorage.setItem("modeGames", JSON.stringify(defaultModes))
	}, [])

	useEffect(() => {
		const storedNumberOfBingoCards = localStorage.getItem(
			"quantityOfBingoCards"
		)

		if (storedNumberOfBingoCards) {
			setStoredNumberOfBingoCards(Number(storedNumberOfBingoCards))
		}
	}, [])

	return (
		<Layout>
			<section className="mt-4 w-full">
				<header className="flex gap-4">
					<Button
						onClick={handleStartGame}
						className="border-green-500/50 bg-green-500 ring-green-500/30 hover:border-green-500 hover:bg-green-600 hover:ring disabled:border-gray-400"
					>
						Empezar
					</Button>
					<Button className="border-red-500/50 bg-red-500 ring-red-500/30 hover:border-red-500 hover:bg-red-600 hover:ring">
						Salir
					</Button>
				</header>
				<div className="">
					<p className="mx-auto mb-2 max-w-[25ch] text-center text-xl font-semibold md:max-w-[35ch]">
						Seleccione cada celda para colocar el numero en el carton
					</p>
					{Array.from(Array(storedNumberOfBingoCards).keys()).map((index) => (
						<CreateMiBingoCards
							key={index}
							storedNumberOfBingoCards={storedNumberOfBingoCards}
						/>
					))}
				</div>
			</section>
		</Layout>
	)
}

export default SelectMiBingoCard

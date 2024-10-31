import { useGlobalStore } from "@/store/GlobalStore"
import { useEffect } from "react"
import useDisableNavigationButtons from "../hooks/useDisableNavigationButtons "
import Layout from "../layout/Layout"
import Home from "./Home"
import PlayBingo from "./PlayBingo"
import QuantityOfBingoCards from "./QuantityOfBingoCards"
import SelectBingoCard from "./SelectBingoCard"

const App = () => {
	useDisableNavigationButtons()
	const home = useGlobalStore((state) => state.home)
	const setHome = useGlobalStore((state) => state.setHome)
	const quantityOfBingoCards = useGlobalStore(
		(state) => state.quantityOfBingoCards
	)
	const selectBingoCard = useGlobalStore((state) => state.selectBingoCard)
	const playBingo = useGlobalStore((state) => state.playBingo)
	const setPlayBingo = useGlobalStore((state) => state.setPlayBingo)

	const loadPlayBingoState = () => {
		const playBingoState = JSON.parse(
			localStorage.getItem("playBingo") || "false"
		)
		if (playBingoState) {
			setHome(false)
			setPlayBingo(playBingoState)
		}
	}

	useEffect(() => {
		loadPlayBingoState()
	}, [setHome, setPlayBingo])

	const renderComponent = () => {
		if (home) return <Home />
		if (quantityOfBingoCards) return <QuantityOfBingoCards />
		if (selectBingoCard) return <SelectBingoCard />
		if (playBingo) return <PlayBingo />
		return null
	}

	return <Layout>{renderComponent()}</Layout>
}

export default App

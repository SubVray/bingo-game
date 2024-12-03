import { Carton } from "@/types/carton"
import { getCardById, getNextCard } from "@/utils/cardUtils"
import { Dispatch, SetStateAction, useState } from "react"

const FormSelectBingoCards = ({
	setPreviewedCards,
}: {
	setPreviewedCards: Dispatch<SetStateAction<Carton[]>>
}) => {
	const [selectedCardId, setSelectedCardId] = useState<number>(0)
	// Function to search cards based on the selected card ID
	const searchCards = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const selectedCard = getCardById(selectedCardId) as Carton
		const nextCard = getNextCard(selectedCard) as Carton
		const cards = []

		if (selectedCard && nextCard) {
			cards.push(selectedCard)
			cards.push(nextCard)
		}

		setPreviewedCards(cards)
	}
	return (
		<form
			onSubmit={searchCards}
			className="mb-6"
		>
			<input
				type="number"
				min="1"
				name="selectedCardId"
				max="60"
				required
				placeholder="Número del cartón"
				onChange={(e) => setSelectedCardId(Number(e.target.value))}
				className="mb-4 w-full rounded-md border-2 border-gray-800 bg-neutral-950 p-4 text-center text-xl font-semibold text-gray-50 outline-none transition hover:border-gray-700 focus:ring-2 focus:ring-blue-500"
			/>
			<button
				type="submit"
				className="block w-full rounded-md bg-blue-500 p-4 text-center text-xl font-semibold text-white transition hover:bg-blue-600 xs:p-6"
			>
				Buscar Carton
			</button>
		</form>
	)
}
export default FormSelectBingoCards

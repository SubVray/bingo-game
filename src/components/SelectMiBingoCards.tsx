import { BingoCardPreview } from "@/components/BingoCardPreview"
import { SelectedBingoCard } from "@/components/SelectedBingoCard"
import { CheckIcon } from "@/icons/Check"
import { SaveIcon } from "@/icons/Save"
import { TrashIcon } from "@/icons/Trash"
import { Carton } from "@/types/carton"
import { getCardById, getNextCard } from "@/utils/cardUtils"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export const SelectBingoCards = ({
	storedNumberOfBingoCards,
	setIsStartButtonDisabled,
}: {
	storedNumberOfBingoCards: number
	setIsStartButtonDisabled: Dispatch<SetStateAction<boolean>>
}) => {
	const [selectedCardId, setSelectedCardId] = useState<number>(0)
	const [selectedCards, setSelectedCards] = useState<Carton[]>([])
	const [previewedCards, setPreviewedCards] = useState<Carton[]>([])

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

	// Function to select and store cards
	const selectCards = (card: Carton) => {
		if (storedNumberOfBingoCards === 1) {
			setSelectedCards([card])
		}
		if (storedNumberOfBingoCards > 1) {
			const isSave = selectedCards.find((c) => c.id === card.id)

			if (isSave || selectedCards.length >= storedNumberOfBingoCards) {
				return
			}

			setSelectedCards([...selectedCards, card])
		}
	}
	const deselectCards = (card: Carton) => {
		const isSave = selectedCards.find((c) => c.id === card.id)
		if (isSave) {
			setSelectedCards(selectedCards.filter((c) => c.id !== card.id))
		}
	}

	// Persist selected cards in localStorage
	useEffect(() => {
		// Persistir los selectedCards en localStorage
		localStorage.setItem("selectedBingoCards", JSON.stringify(selectedCards))

		// Verificar si se debe habilitar el botón de inicio
		setIsStartButtonDisabled(selectedCards.length !== storedNumberOfBingoCards)
	}, [selectedCards, setIsStartButtonDisabled, storedNumberOfBingoCards])

	return (
		<div className="mb-6 mt-6 w-full">
			<p className="mx-auto mb-2 max-w-[20ch] text-center text-xl font-semibold md:max-w-[35ch]">
				Busque el número de tu carton favorito
			</p>
			<p className="mx-auto mb-2 max-w-[25ch] text-center text-lg font-semibold text-gray-400 md:max-w-[35ch]">
				Debes Seleccionar {storedNumberOfBingoCards} cartones
			</p>
			<form
				onSubmit={searchCards}
				className="mb-6"
			>
				<input
					type="number"
					min="1"
					max="60"
					required
					placeholder="Número del cartón"
					onChange={(e) => setSelectedCardId(Number(e.target.value))}
					className="mb-4 w-full rounded-md border-2 border-gray-800 p-4 text-center text-xl font-semibold text-gray-900 outline-none transition hover:border-gray-700 focus:ring-2 focus:ring-blue-500"
				/>
				<button
					type="submit"
					className="block w-full rounded-md bg-blue-500 p-4 text-center text-xl font-semibold text-white transition hover:bg-blue-600 xs:p-6"
				>
					Buscar Carton
				</button>
			</form>

			{/* Previewed Cards */}
			<div className="flex w-full items-center justify-center gap-2">
				{previewedCards.map((card) => (
					<div
						key={card.id}
						className="w-full"
					>
						<BingoCardPreview carton={card} />
						<div className="mt-4 flex w-full gap-2">
							<button
								type="button"
								onClick={() => selectCards(card)}
								className="block w-full rounded-md bg-blue-500 text-white transition hover:bg-blue-600"
							>
								{selectedCards.find((c) => c.id === card.id) ? (
									<span className="block w-full rounded-md bg-blue-500 px-4 py-2 text-center text-sm font-semibold">
										<SaveIcon className="mx-auto size-6 text-gray-50" />
									</span>
								) : (
									<span className="block w-full rounded-md bg-blue-500 px-4 py-2 text-center text-sm font-semibold">
										<CheckIcon className="mx-auto size-6 text-gray-50" />
									</span>
								)}
							</button>
							{selectedCards.find((c) => c.id === card.id) ? (
								<button
									type="button"
									onClick={() => deselectCards(card)}
									className="block w-full rounded-md bg-red-500 text-white transition hover:bg-red-600"
								>
									<span className="block w-full rounded-md bg-red-500 px-4 py-2 text-center text-sm font-semibold">
										<TrashIcon className="mx-auto size-6 text-gray-50" />
									</span>
								</button>
							) : null}
						</div>
					</div>
				))}
			</div>

			{/* Selected Cards */}
			<div className="mt-4">
				{selectedCards.length > 0 ? (
					<p className="mb-4 mt-6 text-center text-lg font-medium">
						Doble click para eliminar
					</p>
				) : null}
				{selectedCards.map((card: Carton, index: number) => (
					<div
						className="p-2"
						key={card.id}
						onDoubleClick={() => deselectCards(card)}
					>
						<span className="block w-full text-center text-2xl font-semibold text-gray-400">
							{index + 1}
						</span>
						<hr className="mb-5 mt-4" />
						<SelectedBingoCard carton={card} />
					</div>
				))}
			</div>
		</div>
	)
}

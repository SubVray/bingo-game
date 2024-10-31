import { CheckIcon } from "@/icons/Check"
import { SaveIcon } from "@/icons/Save"
import { TrashIcon } from "@/icons/Trash"
import { Carton } from "@/types/carton"
import { BingoCardPreview } from "./BingoCardPreview"

export default function PreviewCards({
	storedNumberOfBingoCards,
	previewedCards,
	selectedCards,
	setSelectedCards,
}: {
	storedNumberOfBingoCards: number
	previewedCards: Carton[]
	selectedCards: Carton[]
	setSelectedCards: React.Dispatch<React.SetStateAction<Carton[]>>
}) {
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

	return (
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
	)
}

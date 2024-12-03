import { Carton } from "@/types/carton"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Container } from "./Container"
import FormSelectBingoCards from "./FormSelectBingoCards"
import { Paragraph } from "./Paragraph"
import PreviewCards from "./PreviewCards"
import SelectedCards from "./SelectedCards"

export const SelectBingoCards = ({
	storedNumberOfBingoCards,
	setIsStartButtonDisabled,
}: {
	storedNumberOfBingoCards: number
	setIsStartButtonDisabled: Dispatch<SetStateAction<boolean>>
}) => {
	const [selectedCards, setSelectedCards] = useState<Carton[]>([])
	const [previewedCards, setPreviewedCards] = useState<Carton[]>([])

	// Persist selected cards in localStorage
	useEffect(() => {
		// Persistir los selectedCards en localStorage
		localStorage.setItem("selectedBingoCards", JSON.stringify(selectedCards))

		// Verificar si se debe habilitar el botón de inicio
		setIsStartButtonDisabled(selectedCards.length !== storedNumberOfBingoCards)
	}, [selectedCards, setIsStartButtonDisabled, storedNumberOfBingoCards])

	return (
		<Container className="mb-6 mt-6 w-full">
			<Paragraph className="mx-auto mb-2 max-w-[28ch] text-center text-xl font-semibold md:max-w-[40ch]">
				Busque el numero de tu carton favorito
			</Paragraph>
			<Paragraph className="mx-auto mb-2 max-w-[28ch] text-center text-lg font-semibold text-gray-400 md:max-w-[35ch]">
				Debes Seleccionar {storedNumberOfBingoCards}
				{storedNumberOfBingoCards > 1 ? " cartones" : " carton"}
			</Paragraph>

			<FormSelectBingoCards setPreviewedCards={setPreviewedCards} />

			<PreviewCards
				storedNumberOfBingoCards={storedNumberOfBingoCards}
				previewedCards={previewedCards}
				selectedCards={selectedCards}
				setSelectedCards={setSelectedCards}
			/>

			<SelectedCards selectedCards={selectedCards} />
		</Container>
	)
}

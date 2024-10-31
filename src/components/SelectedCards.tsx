import { Carton } from "@/types/carton"
import { Container } from "./Container"
import { Paragraph } from "./Paragraph"
import { SelectedBingoCard } from "./SelectedBingoCard"

const SelectedCards = ({ selectedCards }: { selectedCards: Carton[] }) => {
	return (
		<Container className="mt-4">
			{selectedCards.length > 0 ? (
				<Paragraph className="mb-4 mt-6 text-center text-lg font-medium">
					Doble click para eliminar
				</Paragraph>
			) : null}
			{selectedCards.map((card: Carton, index: number) => (
				<Container
					className="p-2"
					key={card.id}
				>
					<span className="block w-full text-center text-2xl font-semibold text-gray-400">
						{index + 1}
					</span>
					<hr className="mb-5 mt-4" />
					<SelectedBingoCard carton={card} />
				</Container>
			))}
		</Container>
	)
}

export default SelectedCards

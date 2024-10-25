import { cartones } from "@/data/cartones"
import { Carton } from "@/types/carton"

// Function to get a card by ID
export const getCardById = (id: number): Carton | undefined => {
	return cartones.find((card: Carton) => card.id === id)
}

// Function to get the next card based on the current card
export const getNextCard = (card: Carton): Carton | undefined => {
	return card.next ? getCardById(card.next) : undefined
}

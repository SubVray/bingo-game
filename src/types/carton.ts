export type BingoLetter = "b" | "i" | "n" | "g" | "o"
export interface CartonData {
	number: "FREE" | number
	isActive: boolean
}

export interface Carton {
	id: number
	cartonData: Record<BingoLetter, CartonData[]>
	next: number
}

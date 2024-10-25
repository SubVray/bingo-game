export interface CartonData {
	number: string | number
	isActive: boolean
}

export interface Carton {
	id: number
	cartonData: {
		[key: string]: CartonData[] // Permite acceder usando un string
		b: CartonData[]
		i: CartonData[]
		n: CartonData[]
		g: CartonData[]
		o: CartonData[]
	}
	next: number
}

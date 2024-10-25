import { Carton } from "@/types/carton"

export const checkFullCarton = (cartonState: Carton) => {
	// Verifica si todas las casillas están activas
	return Object.values(cartonState.cartonData).every((column) =>
		column.every((cell) => cell.isActive)
	)
}

export const checkFourCorners = (cartonState: Carton) => {
	// Verifica las 4 esquinas del cartón
	return (
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.b[4].isActive &&
		cartonState.cartonData.o[0].isActive &&
		cartonState.cartonData.o[4].isActive
	)
}

export const checkHorizontal = (cartonState: Carton) => {
	// Verifica si hay una fila completa activa
	return Object.values(cartonState.cartonData).some((column, rowIndex) =>
		["b", "i", "n", "g", "o"].every(
			(letra) => cartonState.cartonData[letra][rowIndex].isActive
		)
	)
}

export const checkVertical = (cartonState: Carton) => {
	// Verifica si hay una columna completa activa
	return ["b", "i", "n", "g", "o"].some((letra) =>
		cartonState.cartonData[letra].every((cell) => cell.isActive)
	)
}

export const checkDiagonal = (cartonState: Carton) => {
	// Verifica la diagonal principal
	return (
		(cartonState.cartonData.b[0].isActive &&
			cartonState.cartonData.i[1].isActive &&
			cartonState.cartonData.n[2].isActive &&
			cartonState.cartonData.g[3].isActive &&
			cartonState.cartonData.o[4].isActive) ||
		(cartonState.cartonData.b[4].isActive &&
			cartonState.cartonData.i[3].isActive &&
			cartonState.cartonData.n[2].isActive &&
			cartonState.cartonData.g[1].isActive &&
			cartonState.cartonData.o[0].isActive)
	)
}

export const checkZ = (cartonState: Carton) => {
	// Verifica la Z
	return (
		// horizontal 1
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.i[0].isActive &&
		cartonState.cartonData.n[0].isActive &&
		cartonState.cartonData.g[0].isActive &&
		cartonState.cartonData.o[0].isActive &&
		//diagonal
		cartonState.cartonData.i[3].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.g[1].isActive &&
		// horizontal 2
		cartonState.cartonData.b[4].isActive &&
		cartonState.cartonData.i[4].isActive &&
		cartonState.cartonData.n[4].isActive &&
		cartonState.cartonData.g[4].isActive &&
		cartonState.cartonData.o[4].isActive
	)
}

export const checkInvertedZ = (cartonState: Carton) => {
	return (
		// horizontal 1
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.i[0].isActive &&
		cartonState.cartonData.n[0].isActive &&
		cartonState.cartonData.g[0].isActive &&
		cartonState.cartonData.o[0].isActive &&
		//diagonal
		cartonState.cartonData.i[1].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.g[3].isActive &&
		// horizontal 2
		cartonState.cartonData.b[4].isActive &&
		cartonState.cartonData.i[4].isActive &&
		cartonState.cartonData.n[4].isActive &&
		cartonState.cartonData.g[4].isActive &&
		cartonState.cartonData.o[4].isActive
	)
}
export const checkI = (cartonState: Carton) => {
	// Verifica la I
	return (
		// horizontal 1
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.i[0].isActive &&
		cartonState.cartonData.n[0].isActive &&
		cartonState.cartonData.g[0].isActive &&
		cartonState.cartonData.o[0].isActive &&
		//vertical
		cartonState.cartonData.n[1].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.n[3].isActive &&
		// horizontal 2
		cartonState.cartonData.b[4].isActive &&
		cartonState.cartonData.i[4].isActive &&
		cartonState.cartonData.n[4].isActive &&
		cartonState.cartonData.g[4].isActive &&
		cartonState.cartonData.o[4].isActive
	)
}

export const checkL = (cartonState: Carton) => {
	return (
		//vertical
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.b[1].isActive &&
		cartonState.cartonData.b[2].isActive &&
		cartonState.cartonData.b[3].isActive &&
		// horizontal 2
		cartonState.cartonData.b[4].isActive &&
		cartonState.cartonData.i[4].isActive &&
		cartonState.cartonData.n[4].isActive &&
		cartonState.cartonData.g[4].isActive &&
		cartonState.cartonData.o[4].isActive
	)
}
export const checkInvertedL = (cartonState: Carton) => {
	return (
		//vertical
		cartonState.cartonData.o[0].isActive &&
		cartonState.cartonData.o[1].isActive &&
		cartonState.cartonData.o[2].isActive &&
		cartonState.cartonData.o[3].isActive &&
		// horizontal 2
		cartonState.cartonData.b[4].isActive &&
		cartonState.cartonData.i[4].isActive &&
		cartonState.cartonData.n[4].isActive &&
		cartonState.cartonData.g[4].isActive &&
		cartonState.cartonData.o[4].isActive
	)
}

export const checkO = (cartonState: Carton) => {
	return (
		//horizontal 1
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.i[0].isActive &&
		cartonState.cartonData.n[0].isActive &&
		cartonState.cartonData.g[0].isActive &&
		cartonState.cartonData.o[0].isActive &&
		//vertical 1
		cartonState.cartonData.o[1].isActive &&
		cartonState.cartonData.o[2].isActive &&
		cartonState.cartonData.o[3].isActive &&
		//horizontal 2
		cartonState.cartonData.b[4].isActive &&
		cartonState.cartonData.i[4].isActive &&
		cartonState.cartonData.n[4].isActive &&
		cartonState.cartonData.g[4].isActive &&
		cartonState.cartonData.o[4].isActive &&
		//vertical 2
		cartonState.cartonData.b[1].isActive &&
		cartonState.cartonData.b[2].isActive &&
		cartonState.cartonData.b[3].isActive
	)
}

export const checkU = (cartonState: Carton) => {
	return (
		//vertical 1
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.b[1].isActive &&
		cartonState.cartonData.b[2].isActive &&
		cartonState.cartonData.b[3].isActive &&
		cartonState.cartonData.b[4].isActive &&
		//horizontal
		cartonState.cartonData.i[4].isActive &&
		cartonState.cartonData.n[4].isActive &&
		cartonState.cartonData.g[4].isActive &&
		//vertical 1
		cartonState.cartonData.o[0].isActive &&
		cartonState.cartonData.o[1].isActive &&
		cartonState.cartonData.o[2].isActive &&
		cartonState.cartonData.o[3].isActive &&
		cartonState.cartonData.o[4].isActive
	)
}

export const checkInvertedU = (cartonState: Carton) => {
	return (
		//vertical 1
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.b[1].isActive &&
		cartonState.cartonData.b[2].isActive &&
		cartonState.cartonData.b[3].isActive &&
		cartonState.cartonData.b[4].isActive &&
		//horizontal
		cartonState.cartonData.i[0].isActive &&
		cartonState.cartonData.n[0].isActive &&
		cartonState.cartonData.g[0].isActive &&
		//vertical 1
		cartonState.cartonData.o[0].isActive &&
		cartonState.cartonData.o[1].isActive &&
		cartonState.cartonData.o[2].isActive &&
		cartonState.cartonData.o[3].isActive &&
		cartonState.cartonData.o[4].isActive
	)
}

export const checkN = (cartonState: Carton) => {
	return (
		//vertical 1
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.b[1].isActive &&
		cartonState.cartonData.b[2].isActive &&
		cartonState.cartonData.b[3].isActive &&
		cartonState.cartonData.b[4].isActive &&
		//diagonal
		cartonState.cartonData.i[1].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.g[3].isActive &&
		//vertical 1
		cartonState.cartonData.o[0].isActive &&
		cartonState.cartonData.o[1].isActive &&
		cartonState.cartonData.o[2].isActive &&
		cartonState.cartonData.o[3].isActive &&
		cartonState.cartonData.o[4].isActive
	)
}

export const checkM = (cartonState: Carton) => {
	return (
		//vertical 1
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.b[1].isActive &&
		cartonState.cartonData.b[2].isActive &&
		cartonState.cartonData.b[3].isActive &&
		cartonState.cartonData.b[4].isActive &&
		//horizontal 1
		cartonState.cartonData.i[0].isActive &&
		cartonState.cartonData.g[0].isActive &&
		//vertical 2
		cartonState.cartonData.n[0].isActive &&
		cartonState.cartonData.n[1].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.n[3].isActive &&
		cartonState.cartonData.n[4].isActive &&
		//vertical 3
		cartonState.cartonData.o[0].isActive &&
		cartonState.cartonData.o[1].isActive &&
		cartonState.cartonData.o[2].isActive &&
		cartonState.cartonData.o[3].isActive &&
		cartonState.cartonData.o[4].isActive
	)
}

export const checkW = (cartonState: Carton) => {
	return (
		//vertical 1
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.b[1].isActive &&
		cartonState.cartonData.b[2].isActive &&
		cartonState.cartonData.b[3].isActive &&
		cartonState.cartonData.b[4].isActive &&
		//horizontal 1
		cartonState.cartonData.i[4].isActive &&
		cartonState.cartonData.g[4].isActive &&
		//vertical 2
		cartonState.cartonData.n[0].isActive &&
		cartonState.cartonData.n[1].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.n[3].isActive &&
		cartonState.cartonData.n[4].isActive &&
		//vertical 3
		cartonState.cartonData.o[0].isActive &&
		cartonState.cartonData.o[1].isActive &&
		cartonState.cartonData.o[2].isActive &&
		cartonState.cartonData.o[3].isActive &&
		cartonState.cartonData.o[4].isActive
	)
}

export const checkT = (cartonState: Carton) => {
	return (
		//horizontal
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.i[0].isActive &&
		cartonState.cartonData.n[0].isActive &&
		cartonState.cartonData.g[0].isActive &&
		cartonState.cartonData.o[0].isActive &&
		//vertical
		cartonState.cartonData.n[1].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.n[3].isActive &&
		cartonState.cartonData.n[4].isActive
	)
}
export const checkE = (cartonState: Carton) => {
	return (
		//horizontal 1
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.i[0].isActive &&
		cartonState.cartonData.n[0].isActive &&
		cartonState.cartonData.g[0].isActive &&
		cartonState.cartonData.o[0].isActive &&
		//horizontal 2
		cartonState.cartonData.b[2].isActive &&
		cartonState.cartonData.i[2].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.g[2].isActive &&
		//horizontal 3
		cartonState.cartonData.b[4].isActive &&
		cartonState.cartonData.i[4].isActive &&
		cartonState.cartonData.n[4].isActive &&
		cartonState.cartonData.g[4].isActive &&
		cartonState.cartonData.o[4].isActive &&
		//vertical
		cartonState.cartonData.b[1].isActive &&
		cartonState.cartonData.b[2].isActive &&
		cartonState.cartonData.b[3].isActive
	)
}
export const checkF = (cartonState: Carton) => {
	return (
		//horizontal 1
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.i[0].isActive &&
		cartonState.cartonData.n[0].isActive &&
		cartonState.cartonData.g[0].isActive &&
		cartonState.cartonData.o[0].isActive &&
		//horizontal 2
		cartonState.cartonData.b[2].isActive &&
		cartonState.cartonData.i[2].isActive &&
		cartonState.cartonData.n[2].isActive &&
		//vertical
		cartonState.cartonData.b[1].isActive &&
		cartonState.cartonData.b[2].isActive &&
		cartonState.cartonData.b[3].isActive &&
		cartonState.cartonData.b[4].isActive
	)
}
export const checkY = (cartonState: Carton) => {
	return (
		//diagonal 1
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.i[1].isActive &&
		//diagonal 2
		cartonState.cartonData.g[1].isActive &&
		cartonState.cartonData.o[0].isActive &&
		//vertical
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.n[3].isActive &&
		cartonState.cartonData.n[4].isActive
	)
}

// B falta
// 7 falta
export const checkH = (cartonState: Carton) => {
	return (
		//vertical 1
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.b[1].isActive &&
		cartonState.cartonData.b[2].isActive &&
		cartonState.cartonData.b[3].isActive &&
		cartonState.cartonData.b[4].isActive &&
		//Horizontal
		cartonState.cartonData.i[2].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.g[2].isActive &&
		//vertical 4
		cartonState.cartonData.o[0].isActive &&
		cartonState.cartonData.o[1].isActive &&
		cartonState.cartonData.o[2].isActive &&
		cartonState.cartonData.o[3].isActive &&
		cartonState.cartonData.o[4].isActive
	)
}

export const checkX = (cartonState: Carton) => {
	return (
		// diagonal 1
		cartonState.cartonData.b[0].isActive &&
		cartonState.cartonData.i[1].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.g[3].isActive &&
		cartonState.cartonData.o[4].isActive &&
		// diagonal 2
		cartonState.cartonData.b[4].isActive &&
		cartonState.cartonData.i[3].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.g[1].isActive &&
		cartonState.cartonData.o[0].isActive
	)
}

export const checkArrowUp = (cartonState: Carton) => {
	return (
		// horizontal 1
		cartonState.cartonData.n[0].isActive &&
		// horizontal 2
		cartonState.cartonData.i[1].isActive &&
		cartonState.cartonData.n[1].isActive &&
		cartonState.cartonData.g[1].isActive &&
		// horizontal 3
		cartonState.cartonData.b[2].isActive &&
		cartonState.cartonData.i[2].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.g[2].isActive &&
		cartonState.cartonData.o[2].isActive &&
		//vertical 4
		cartonState.cartonData.n[3].isActive &&
		cartonState.cartonData.n[4].isActive
	)
}
export const checkArrowDown = (cartonState: Carton) => {
	return (
		// horizontal 1
		cartonState.cartonData.n[4].isActive &&
		// horizontal 2
		cartonState.cartonData.i[3].isActive &&
		cartonState.cartonData.n[3].isActive &&
		cartonState.cartonData.g[3].isActive &&
		// horizontal 3
		cartonState.cartonData.b[2].isActive &&
		cartonState.cartonData.i[2].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.g[2].isActive &&
		cartonState.cartonData.o[2].isActive &&
		//vertical 4
		cartonState.cartonData.n[0].isActive &&
		cartonState.cartonData.n[1].isActive
	)
}

export const checkArrowLeft = (cartonState: Carton) => {
	return (
		// horizontal 1
		cartonState.cartonData.b[2].isActive &&
		// horizontal 2
		cartonState.cartonData.i[1].isActive &&
		cartonState.cartonData.i[2].isActive &&
		cartonState.cartonData.i[3].isActive &&
		// horizontal 3
		cartonState.cartonData.n[0].isActive &&
		cartonState.cartonData.n[1].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.n[3].isActive &&
		cartonState.cartonData.n[4].isActive &&
		//vertical 4
		cartonState.cartonData.g[2].isActive &&
		cartonState.cartonData.o[2].isActive
	)
}
export const checkArrowRight = (cartonState: Carton) => {
	return (
		// horizontal 1
		cartonState.cartonData.o[2].isActive &&
		// horizontal 2
		cartonState.cartonData.g[1].isActive &&
		cartonState.cartonData.g[2].isActive &&
		cartonState.cartonData.g[3].isActive &&
		// horizontal 3
		cartonState.cartonData.n[0].isActive &&
		cartonState.cartonData.n[1].isActive &&
		cartonState.cartonData.n[2].isActive &&
		cartonState.cartonData.n[3].isActive &&
		cartonState.cartonData.n[4].isActive &&
		//vertical 4
		cartonState.cartonData.i[2].isActive &&
		cartonState.cartonData.b[2].isActive
	)
}

// Obtener la función de validación adecuada para cada modo
import { ModeGameValue } from "@/types/modeGames"
import * as validation from "@/utils/validationBingoCards/index"

export const gameModeValidation = (modeGame: ModeGameValue) => {
	switch (modeGame) {
		case "fullCarton":
			return validation.checkFullCarton
		case "fourCorners":
			return validation.checkFourCorners
		case "horizontal":
			return validation.checkHorizontal
		case "vertical":
			return validation.checkVertical
		case "diagonal":
			return validation.checkDiagonal
		case "Z":
			return validation.checkZ
		case "ZInverted":
			return validation.checkInvertedZ
		case "I":
			return validation.checkI
		case "L":
			return validation.checkL
		case "LInverted":
			return validation.checkInvertedL
		case "O":
			return validation.checkO
		case "U":
			return validation.checkU
		case "UInverted":
			return validation.checkInvertedU
		case "N":
			return validation.checkN
		case "M":
			return validation.checkM
		case "W":
			return validation.checkW
		case "T":
			return validation.checkT
		case "E":
			return validation.checkE
		case "F":
			return validation.checkF
		case "Y":
			return validation.checkY
		case "H":
			return validation.checkH
		case "X":
			return validation.checkX
		case "arrowUp":
			return validation.checkArrowUp
		case "arrowDown":
			return validation.checkArrowDown
		case "arrowLeft":
			return validation.checkArrowLeft
		case "arrowRight":
			return validation.checkArrowRight
		default:
			throw new Error(`Modo de juego desconocido: ${modeGame}`)
	}
}

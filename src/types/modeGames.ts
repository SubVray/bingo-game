export type ModeGameValue =
	| "fullCarton"
	| "fourCorners"
	| "horizontal"
	| "vertical"
	| "diagonal"
	| "Z"
	| "ZInverted"
	| "I"
	| "L"
	| "LInverted"
	| "O"
	| "U"
	| "UInverted"
	| "N"
	| "M"
	| "W"
	| "T"
	| "E"
	| "F"
	| "Y"
	// | "B"
	| "7"
	| "H"
	| "X"
	| "arrowUp"
	| "arrowDown"
	| "arrowLeft"
	| "arrowRight"

export interface ModeGame {
	value: ModeGameValue
	label: string
}

export const initialModesState: Record<ModeGameValue, boolean> = {
	"fullCarton": false,
	"fourCorners": false,
	"horizontal": false,
	"vertical": false,
	"diagonal": false,
	"Z": false,
	"ZInverted": false,
	"I": false,
	"L": false,
	"LInverted": false,
	"O": false,
	"U": false,
	"UInverted": false,
	"N": false,
	"M": false,
	"W": false,
	"T": false,
	"E": false,
	"F": false,
	"Y": false,
	// "B": false,
	"7": false,
	"H": false,
	"X": false,
	"arrowUp": false,
	"arrowDown": false,
	"arrowLeft": false,
	"arrowRight": false,
}

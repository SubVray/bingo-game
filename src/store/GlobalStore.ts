import { create } from "zustand"

interface GlobalStore {
	home: boolean
	setHome: (home: boolean) => void
	quantityOfBingoCards: boolean
	setQuantityOfBingoCards: (quantityOfBingoCards: boolean) => void
	selectBingoCard: boolean
	setSelectBingoCard: (selectBingoCard: boolean) => void
	selectMiBingoCard: boolean
	setSelectMiBingoCard: (selectMiBingoCard: boolean) => void
	playBingo: boolean
	setPlayBingo: (playBingo: boolean) => void
}

export const useGlobalStore = create<GlobalStore>()((set) => ({
	home: true,
	setHome: (home: boolean) => set({ home }),
	quantityOfBingoCards: false,
	setQuantityOfBingoCards: (quantityOfBingoCards: boolean) =>
		set({ quantityOfBingoCards }),
	selectBingoCard: false,
	setSelectBingoCard: (selectBingoCard: boolean) => set({ selectBingoCard }),
	selectMiBingoCard: false,
	setSelectMiBingoCard: (selectMiBingoCard: boolean) =>
		set({ selectMiBingoCard }),
	playBingo: false,
	setPlayBingo: (playBingo: boolean) => set({ playBingo }),
}))

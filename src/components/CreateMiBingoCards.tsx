import { BingoLetter, Carton, CartonData } from "@/types/carton"
import { useState } from "react"
const FREE_SPACE = "FREE" // Define el espacio libre
export const CreateMiBingoCards = ({
	storedNumberOfBingoCards,
}: {
	storedNumberOfBingoCards: number
}) => {
	const [cartonData, setCartonData] = useState<Carton["cartonData"]>({
		b: [
			{ number: 1, isActive: false },
			{ number: 3, isActive: false },
			{ number: 2, isActive: false },
			{ number: 9, isActive: false },
			{ number: 13, isActive: false },
		],
		i: [
			{ number: 26, isActive: false },
			{ number: 28, isActive: false },
			{ number: 33, isActive: false },
			{ number: 21, isActive: false },
			{ number: 29, isActive: false },
		],
		n: [
			{ number: 37, isActive: false },
			{ number: 33, isActive: false },
			{ number: FREE_SPACE, isActive: true },
			{ number: 34, isActive: false },
			{ number: 45, isActive: false },
		],
		g: [
			{ number: 50, isActive: false },
			{ number: 53, isActive: false },
			{ number: 57, isActive: false },
			{ number: 46, isActive: false },
			{ number: 52, isActive: false },
		],
		o: [
			{ number: 71, isActive: false },
			{ number: 73, isActive: false },
			{ number: 68, isActive: false },
			{ number: 70, isActive: false },
			{ number: 63, isActive: false },
		],
	})

	const handleChangeNumber = (
		e: React.ChangeEvent<HTMLInputElement>,
		letra: string | BingoLetter,
		index: number
	) => {
		const value = parseInt(e.target.value)
		if (!isNaN(value)) {
			// Rango para cada letra
			let [min, max] = [0, 0]
			switch (letra) {
				case "b":
					;[min, max] = [1, 15]
					break
				case "i":
					;[min, max] = [16, 30]
					break
				case "n":
					;[min, max] = [31, 45]
					break
				case "g":
					;[min, max] = [46, 60]
					break
				case "o":
					;[min, max] = [61, 75]
					break
			}

			if (value >= min && value <= max) {
				console.log("Numero dentro del rango")
				const updatedData = { ...cartonData } as Record<
					BingoLetter,
					CartonData[]
				>
				updatedData[letra as BingoLetter][index] = {
					number: value,
					isActive: true,
				}
				setCartonData(updatedData)

				// Comprobar si el cartón está lleno y guardarlo en localStorage
				if (isCartonFull(updatedData)) {
					console.log("El cartón está lleno")
					saveCartonToLocalStorage(updatedData)
				}
			} else {
				console.log("Número fuera de rango")
			}
		}
	}

	const isCartonFull = (data: Record<BingoLetter, CartonData[]>) => {
		// Verifica si todos los números están activos
		return Object.keys(data).every((key) => {
			const dataKey = data[key as BingoLetter]
			return dataKey.every((item) => item.isActive)
		})
	}

	const saveCartonToLocalStorage = (
		data: Record<BingoLetter, CartonData[]>
	) => {
		// Obtener los cartones existentes
		try {
			const existingCards =
				JSON.parse(localStorage.getItem("selectedBingoCards") || "[]") || []
			if (existingCards.length < storedNumberOfBingoCards) {
				const newCard = { id: Date.now(), cartonData: data }
				const updatedCards = [...existingCards, newCard]
				localStorage.setItem("selectedBingoCards", JSON.stringify(updatedCards))
			} else {
				console.log("Límite de cartones alcanzado.")
			}
		} catch (error) {
			console.error("Error saving bingo card to localStorage:", error)
		}
	}

	return (
		<div className="w-full select-none rounded-md border border-gray-500/50 shadow">
			<div className="w-full">
				<header className="flex w-full items-center justify-around py-2">
					<div className="flex w-8 flex-col items-center justify-center xs:w-9">
						<span className="text-sm font-bold">B</span>
						<span className="text-[10px] font-light">1-15</span>
					</div>
					<div className="flex w-8 flex-col items-center justify-center xs:w-9 xsm:w-10">
						<span className="text-sm font-bold">I</span>
						<span className="text-[10px] font-light">16-30</span>
					</div>
					<div className="flex w-8 flex-col items-center justify-center xs:w-9 xsm:w-10">
						<span className="text-sm font-bold">N</span>
						<span className="text-[10px] font-light">31-45</span>
					</div>
					<div className="flex w-8 flex-col items-center justify-center xs:w-9 xsm:w-10">
						<span className="text-sm font-bold">G</span>
						<span className="text-[10px] font-light">46-60</span>
					</div>
					<div className="flex w-8 flex-col items-center justify-center xs:w-9 xsm:w-10">
						<span className="text-sm font-bold">O</span>
						<span className="text-[10px] font-light">61-75</span>
					</div>
				</header>
				<div className="w-full border-t border-gray-500 text-center text-sm font-light">
					{[0, 1, 2, 3, 4].map((index) => (
						<div
							className={`flex border-gray-500 ${index !== 0 ? "border-t" : "border-none"}`}
							key={index}
						>
							{["b", "i", "n", "g", "o"].map((letra) => (
								<div
									key={letra}
									className={`h-14 w-full whitespace-nowrap border-gray-500 text-center font-medium xs:w-full xsm:w-full ${letra !== "o" ? "border-r" : "border-none"}`}
								>
									<span className="mx-auto flex h-full w-full flex-col items-center justify-center text-center text-base">
										{letra === "n" && index === 2 ? (
											<>
												<span className="block text-[10px] font-semibold">
													FREE
												</span>
												<span className="-mt-2 block">
													<input
														type="number"
														className="h-full w-full bg-transparent text-center outline-none"
													/>
												</span>
											</>
										) : (
											<input
												type="number"
												className="h-full w-full bg-transparent text-center outline-none"
												onChange={(e) => {
													return handleChangeNumber(e, letra, index)
												}}
											/>
										)}
									</span>
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

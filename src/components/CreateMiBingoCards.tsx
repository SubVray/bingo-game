import { CartonData } from "@/types/carton"
import { useState } from "react"
const FREE_SPACE = "FREE" // Define el espacio libre
export const CreateMiBingoCards = ({
	storedNumberOfBingoCards,
}: {
	storedNumberOfBingoCards: number
}) => {
	const [cartonData, setCartonData] = useState<CartonData>({
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
			{ number: 22, isActive: false },
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
		letra: string,
		index: number
	) => {
		const value = parseInt(e.target.value)
		if (!isNaN(value)) {
			// Asegúrate de que el número esté dentro del rango adecuado para cada letra
			let max: number = 0
			let min: number = 0
			switch (letra) {
				case "b":
					min = 1
					max = 15
					break
				case "i":
					min = 16
					max = 30
					break
				case "n":
					min = 31
					max = 45
					break
				case "g":
					min = 46
					max = 60
					break
				case "o":
					min = 61
					max = 75
					break
				default:
					break
			}

			if (value >= min && value <= max) {
				const updatedData = { ...cartonData }
				updatedData[letra][index] = { number: value, isActive: false } // Activa el número ingresado
				setCartonData(updatedData)
				// Comprobar si el cartón está lleno
				if (isCartonFull(updatedData)) {
					saveCartonToLocalStorage(updatedData)
				}
			} else {
				console.log("Número fuera de rango")
			}
		}
	}

	const isCartonFull = (data) => {
		// Verifica si todos los números, excepto el espacio libre, están activos
		return Object.keys(data).every((key) => {
			return data[key].every(
				(item) => !item.isActive || item.number === FREE_SPACE
			)
		})
	}

	const saveCartonToLocalStorage = (data: CartonData) => {
		// Obtener los cartones existentes
		const existingCards =
			JSON.parse(localStorage.getItem("selectedBingoCards") || "[]") || []
		if (existingCards.length < storedNumberOfBingoCards) {
			const fullData = {
				id: Math.floor(Math.random() * 1000),
				cartonData: data,
			}
			existingCards.push(fullData)
			localStorage.setItem("selectedBingoCards", JSON.stringify(existingCards))
		} else {
			console.log("Límite de cartones alcanzado.")
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
														className="w-full text-center outline-none h-full bg-transparent"
													/>
												</span>
											</>
										) : (
											<input
												type="number"
												className="w-full text-center outline-none h-full bg-transparent"
												onChange={(e) => handleChangeNumber(e, letra, index)}
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

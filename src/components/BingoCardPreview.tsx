import type { Carton } from "@/data/cartones"

export const BingoCardPreview = ({ carton }: { carton: Carton }) => {
	return (
		<div className="w-full select-none rounded-md border border-gray-500/50 shadow ring-gray-500 hover:ring focus:ring active:ring">
			<div className="">
				<header className="flex w-full items-center justify-evenly py-1 xs:bg-red-500 xsm:bg-blue-500">
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
					{carton &&
						[0, 1, 2, 3, 4].map((index) => (
							<div
								className={`flex border-gray-500 ${index !== 0 ? "border-t" : "border-none"}`}
								key={index}
							>
								{["b", "i", "n", "g", "o"].map(
									(letra: string | "b" | "i" | "n" | "g" | "o", letraIndex) => (
										<div
											key={`${letra}-${letraIndex}`}
											className={`h-[35px] w-8 whitespace-nowrap border-gray-500 text-center font-medium xs:w-9 xsm:w-10 ${letra !== "o" ? "border-r" : "border-none"}`}
										>
											<span className="mx-auto flex h-full w-full flex-col items-center justify-center text-center text-[11px]">
												{carton.cartonData[letra][index].number === "FREE" ? (
													<>
														<span className="block text-[10px] font-semibold">
															FREE
														</span>
														<span className="-mt-2 block">{carton.id}</span>
													</>
												) : (
													carton.cartonData[letra][index].number
												)}
											</span>
										</div>
									)
								)}
							</div>
						))}
				</div>
			</div>
		</div>
	)
}
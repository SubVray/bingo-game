import { Footer } from "@/components/Footer"
import className from "classnames"
import { useEffect, useState } from "react"

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const [quantityOfBingoCards, setQuantityOfBingoCards] = useState<number>(0)

	useEffect(() => {
		const storedQuantityOfBingoCards = JSON.parse(
			localStorage.getItem("quantityOfBingoCards") || "0"
		)
		setQuantityOfBingoCards(Number(storedQuantityOfBingoCards))
	}, [quantityOfBingoCards])

	return (
		<main
			className={className(
				"mx-auto flex h-dvh w-full max-w-xl flex-col items-center justify-between gap-4 overflow-y-scroll p-1.5",

				quantityOfBingoCards >= 3 ? "md:max-w-5xl xl:max-w-3xl" : "max-w-xl"
			)}
		>
			{children}
			<Footer />
		</main>
	)
}

export default Layout

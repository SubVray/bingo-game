import { Chevron } from "@/icons/Chevron"
import { Container } from "./Container"

export const ModesGames = ({
	numberOfCards,
	showAndHide,
	setShowAndHide,
	modeGames,
	modesCompleted,
}: {
	numberOfCards: number
	showAndHide: boolean
	setShowAndHide: React.Dispatch<React.SetStateAction<boolean>>
	modeGames: { label: string; value: string }[]
	modesCompleted: Record<string, boolean>
}) => {
	return (
		<Container className="relative p-2">
			<Container className="mb-2 flex items-center justify-between">
				<Container
					className={`absolute right-2 flex items-center justify-center`}
				>
					<button onClick={() => setShowAndHide(!showAndHide)}>
						<Chevron
							className={`text-gray-50 transition duration-300 ${showAndHide ? "rotate-180" : ""} ${numberOfCards > 2 ? "size-4" : "size-6"}`}
						/>
					</button>
				</Container>
				<h3 className="text-center font-semibold text-gray-50">
					Modos completados:
				</h3>
			</Container>

			<Container
				className={`overflow-hidden opacity-0 transition-all duration-300 ${showAndHide ? "h-[calc-size(auto)] opacity-100" : "h-0"}`}
			>
				{modeGames.length > 0 && (
					<ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
						{modeGames.map(({ label, value }) => (
							<li
								key={value}
								className={`rounded-md border px-2 py-1 font-semibold shadow ${
									modesCompleted[value]
										? "border-green-800 bg-green-600"
										: "border-red-800 bg-red-500"
								}`}
							>
								{label}
							</li>
						))}
					</ul>
				)}
			</Container>
		</Container>
	)
}

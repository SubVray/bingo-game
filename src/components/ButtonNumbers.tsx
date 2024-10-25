import { FC } from "react"

type ButtonProps = {
	letra: string
	index: number
	isActive: boolean
	number: string | number
	cartonId: number
	onDoubleClick: () => void
}

const ButtonNumbers: FC<ButtonProps> = ({
	letra,
	index,
	isActive,
	number,
	cartonId,
	onDoubleClick,
}) => {
	const buttonClass = `h-16 w-full whitespace-nowrap border-gray-800 text-center font-medium xs:w-full xsm:w-full 
    ${isActive ? "bg-red-400" : "bg-blue-500"}
    ${letra === "i" ? "!border-x-2" : ""}
    ${letra === "g" ? "border-x-2" : ""}`

	return (
		<button
			key={`${letra}-${index}`}
			type="button"
			aria-pressed={isActive}
			onDoubleClick={onDoubleClick}
			className={buttonClass}
		>
			<span className="mx-auto flex h-full w-full flex-col items-center justify-center text-center text-lg font-bold">
				{number === "FREE" ? (
					<>
						<span className="mt-1.5 block text-sm font-semibold">FREE</span>
						<span className="-mt-1 block">{cartonId}</span>
					</>
				) : (
					number
				)}
			</span>
		</button>
	)
}

export default ButtonNumbers

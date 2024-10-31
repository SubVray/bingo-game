import { FC } from "react"

type ButtonProps = {
	letra: string
	index: number
	isActive: boolean
	number: string | number
	cartonId: number
	onDoubleClick: () => void
	disabled: boolean
}

const ButtonNumbers: FC<ButtonProps> = ({
	letra,
	index,
	isActive,
	number,
	cartonId,
	onDoubleClick,
	disabled,
}) => {
	const buttonClass = `h-12 w-full whitespace-nowrap border-gray-800 text-center font-medium sm:h-16 xsm:h-16  
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
			disabled={disabled}
		>
			<span className="mx-auto flex h-full w-full flex-col items-center justify-center text-center text-sm sm:text-xs md:text-lg xsm:text-base font-bold ">
				{number === "FREE" ? (
					<>
						<span className="mt-1.5 block text-[10px] sm:text-xs md:text-base xsm:text-sm  font-semibold">
							FREE
						</span>
						<span className="-mt-1 block ">{cartonId}</span>
					</>
				) : (
					number
				)}
			</span>
		</button>
	)
}

export default ButtonNumbers

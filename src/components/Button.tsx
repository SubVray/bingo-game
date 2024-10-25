import { ButtonHTMLAttributes, ReactNode } from "react"

export const Button = ({
	children,
	className = "", // Clase predeterminada vacía
	...props
}: {
	children?: ReactNode
	className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			{...props}
			className={`w-full rounded-md p-4 font-semibold text-xl mb-6 border-2 transition-all disabled:bg-gray-400 disabled:ring-0 disable:hover:cursor-not-allowed    ${className}`}
		>
			{children}
		</button>
	)
}

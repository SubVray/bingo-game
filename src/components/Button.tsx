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
			className={`disable:hover:cursor-not-allowed mb-6 w-full rounded-md border-2 p-4 text-xl font-semibold transition-all disabled:bg-gray-400 disabled:ring-0 ${className}`}
		>
			{children}
		</button>
	)
}

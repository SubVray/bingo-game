import { HTMLAttributes, ReactNode } from "react"

interface SectionProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode
}

export const Section = ({ children, ...props }: SectionProps) => {
	return <section {...props}>{children}</section>
}

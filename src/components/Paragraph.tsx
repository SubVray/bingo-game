import { HTMLAttributes, ReactNode } from "react"

interface ParagraphProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode
}

export const Paragraph = ({ children, ...props }: ParagraphProps) => {
	return <p {...props}>{children}</p>
}

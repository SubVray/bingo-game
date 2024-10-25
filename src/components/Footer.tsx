import { Vite as ViteIcon } from "@/icons/Vite"

export const Footer = () => {
	return (
		<footer className="text-sm font-semibold text-gray-400 flex flex-col items-center gap-1">
			<p className="flex gap-0.5  items-center">
				Created by
				<a
					href="https://subvray.vercel.app/"
					className="hover:text-orange-500"
				>
					SubVray
				</a>
				<br />
			</p>
			<ViteIcon className="size-4" />
		</footer>
	)
}

import { Footer } from "@/components/Footer"

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="mx-auto flex h-dvh w-full max-w-lg flex-col items-center justify-between gap-4 overflow-y-scroll p-1.5 md:max-w-5xl xl:max-w-2xl">
			{children}
			<Footer />
		</main>
	)
}

export default Layout

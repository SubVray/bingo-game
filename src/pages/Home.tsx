import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import InstallPrompt from "@/components/InstallPrompt"
import { Logo } from "@/components/Logo"
import { Paragraph } from "@/components/Paragraph"
import { Section } from "@/components/Section"
import { useGlobalStore } from "@/store/GlobalStore"

const Home = () => {
	const setHome = useGlobalStore((state) => state.setHome)
	const setQuantityOfBingoCards = useGlobalStore(
		(state) => state.setQuantityOfBingoCards
	)
	return (
		<Section className="w-full max-w-xl">
			<InstallPrompt />
			<Logo />
			<Paragraph className="mx-auto my-6 max-w-[35ch] text-center text-xl font-semibold">
				Seleccione el modo de juego
			</Paragraph>
			<Container>
				<Button
					onClick={() => {
						setHome(false)
						setQuantityOfBingoCards(true)
						localStorage.setItem("gameMode", "mi-bingo")
					}}
					disabled={true}
					className="relative overflow-hidden border-blue-500/50 bg-blue-500 py-[18px] ring-blue-500/30 hover:border-blue-500 hover:bg-blue-600 hover:ring disabled:border-none disabled:bg-blue-500"
				>
					<span className="absolute -right-10 top-5 rotate-[30deg] rounded bg-red-500 px-12 text-xs">
						Próximamente
					</span>
					Mi Carton Bingo
				</Button>
				<Button
					onClick={() => {
						setHome(false)
						setQuantityOfBingoCards(true)
						localStorage.setItem("gameMode", "carton-bingo")
					}}
					className="border-orange-500/50 bg-orange-500 ring-orange-500/30 hover:border-orange-500 hover:bg-orange-600 hover:ring"
				>
					Carton Bingo
				</Button>
			</Container>
		</Section>
	)
}

export default Home

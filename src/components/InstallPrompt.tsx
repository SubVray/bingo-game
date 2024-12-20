import { useEffect, useState } from "react"

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

// Extiende el tipo de WindowEventMap para incluir el evento
declare global {
	interface WindowEventMap {
		beforeinstallprompt: BeforeInstallPromptEvent
	}
}

const InstallPrompt = () => {
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null)
	const [isVisible, setIsVisible] = useState(false)
	const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

	useEffect(() => {
		const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
			event.preventDefault()
			setDeferredPrompt(event)
			setIsVisible(true)
		}

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt
			)
		}
	}, [])

	const handleInstallClick = async () => {
		if (deferredPrompt) {
			deferredPrompt.prompt()
			const { outcome } = await deferredPrompt.userChoice
			if (outcome === "accepted") {
				setIsVisible(false)
				console.log("Usuario aceptó la instalación")
			}
			setDeferredPrompt(null)
			setIsVisible(false)
		}
	}

	return (
		<div className="w-full max-w-md">
			{isVisible && !isIOS && (
				<div className="left-0 right-0 top-0 flex gap-4 border-b p-2 shadow-slate-100">
					<figure className="h-[50px] w-[130px]">
						<img
							src="/images/bingo.webp"
							alt="Prompt de instalación"
							className="h-full w-full rounded"
						/>
					</figure>
					<p>¡Instala nuestra aplicación para una mejor experiencia!</p>
					<button
						onClick={handleInstallClick}
						className="rounded bg-blue-500 px-2"
					>
						Instalar
					</button>
				</div>
			)}
			{isVisible && isIOS && (
				<div className="left-0 right-0 top-0 flex w-full gap-4 border border-b border-red-500 p-2 shadow-slate-100">
					<figure className="h-[50px] w-[80px]">
						<img
							src="/images/bingo.webp"
							alt="Prompt de instalación"
							className="h-full w-full rounded"
						/>
					</figure>
					<p>Agregar a pantalla de inicio</p>
					<button
						onClick={handleInstallClick}
						className="rounded bg-blue-500 px-2"
					>
						Instalar
					</button>
				</div>
			)}
		</div>
	)
}

export default InstallPrompt

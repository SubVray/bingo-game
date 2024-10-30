import { useEffect, useState } from "react"

const InstallPrompt = () => {
	const [deferredPrompt, setDeferredPrompt] = useState(null)
	const [isVisible, setIsVisible] = useState(false)
	const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

	useEffect(() => {
		const handleBeforeInstallPrompt = (e) => {
			e.preventDefault()
			setDeferredPrompt(e)
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
		<div className="">
			{isVisible && !isIOS && (
				<div className=" top-0 left-0  right-0 flex gap-4  p-2 border-b shadow-slate-100">
					<figure className="w-[130px] h-[50px] ">
						<img
							src="/images/bingo.webp"
							alt="Prompt de instalación"
							className="w-full h-full rounded"
						/>
					</figure>
					<p>¡Instala nuestra aplicación para una mejor experiencia!</p>
					<button
						onClick={handleInstallClick}
						className="bg-blue-500 px-2 rounded"
					>
						Instalar
					</button>
				</div>
			)}
			{isVisible && isIOS && (
				<div className=" top-0 left-0  right-0 flex gap-4   p-2 border-b shadow-slate-100 w-full">
					<figure className="w-[80px] h-[50px] ">
						<img
							src="/images/bingo.webp"
							alt="Prompt de instalación"
							className="w-full h-full rounded"
						/>
					</figure>
					<p>Agregar a pantalla de inicio</p>
					<button
						onClick={handleInstallClick}
						className="bg-blue-500 px-2 rounded"
					>
						Instalar
					</button>
				</div>
			)}
		</div>
	)
}

export default InstallPrompt

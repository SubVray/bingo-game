import { useEffect } from "react"

const useConfirmBeforeReload = () => {
	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault()
			event.returnValue = "Hay cambios sin grabar. ¿Abandonar ahora?"
		}

		// Agrega el evento `beforeunload` para prevenir la recarga
		window.addEventListener("beforeunload", handleBeforeUnload)

		return () => {
			// Limpia el evento al desmontar el componente
			window.removeEventListener("beforeunload", handleBeforeUnload)
		}
	}, [])

	return null
}

export default useConfirmBeforeReload

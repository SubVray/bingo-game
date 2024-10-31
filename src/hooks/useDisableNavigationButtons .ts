import { useEffect } from "react"

const useDisableNavigationButtons = () => {
	useEffect(() => {
		// Añade una entrada ficticia al historial
		window.history.pushState(null, "", window.location.href)
		window.history.replaceState(null, "", window.location.href)

		const handlePopState = () => {
			// Cuando el usuario intente retroceder, volvemos a agregar la entrada actual
			window.history.pushState(null, "", window.location.href)
			window.history.replaceState(null, "", window.location.href)
		}

		// Escucha los intentos de cambio de historial
		window.addEventListener("popstate", handlePopState)

		return () => {
			// Limpia el evento al desmontar
			window.removeEventListener("popstate", handlePopState)
		}
	}, [])
}

export default useDisableNavigationButtons

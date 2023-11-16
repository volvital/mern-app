import { useCallback, useEffect, useState} from 'react'

const storageName = 'userData'

export const useAuth = () => {
	const [token, setToken] = useState(null)
	const [ready, setReady] = useState(false)
	const [userId, setUserId] = useState(null)

	const login = useCallback((jwtToken, id) => {
		const date = Date.now()
		setToken(jwtToken)
		setUserId(id)
		localStorage.setItem(storageName, JSON.stringify({
			date, userId: id, token: jwtToken
		}))
	}, [])
	
	const logout = useCallback(() => {
		setToken(null)
		setUserId(null)
		localStorage.removeItem(storageName)
	}, [])

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))
		const compare = Date.now() - data?.date

		if (compare > 3600000) {
			logout()
		} else if (data && data.token) {
			login(data.token, data.userId)
		}
		
		setReady(true)
	}, [login, logout])
	
	return { login, logout, token, userId, ready }
}
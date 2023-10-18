import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useNavigate } from 'react-router-dom'

export const CreatePage = () => {
	const auth = useContext(AuthContext)
	const history = useNavigate()
	const { request } = useHttp()
	const [link, setLink] = useState('')

	useEffect(() => {
		window.M.updateTextFields() // активні поля
	}, [])

	const pressHandler = async e => {
		if (e.key === "Enter") {
			try {
				const data = await request('/api/link/generate', 'POST', { from: link }, {
					Authorization: `Bearer ${auth.token}`
				})
				history(`/detail/${data.link._id}`)
			} catch (e) {}
		}
	}

	return (
		<div className="row">
			<div className=".col s8 offset-s2" style={{ padding: '2rem' }}>
				<div className="input-field">
					<input
						placeholder="Paste link" 
						id="email" 
						type="text"
						value={link}
						onChange={e =>setLink(e.target.value)}
						onKeyUp={pressHandler}
					/>
					<label>Enter link</label>
				</div>
			</div>
		</div>
	)
}
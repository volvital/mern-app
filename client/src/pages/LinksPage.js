import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook"
import { AuthContext } from "../context/AuthContext";
import { LinkLIst } from "../components/LinkLIst";
import { Loader } from "../components/Loader";

export const LinksPage = () => {
	const [links, setLinks] = useState([])
	const {loading, request} = useHttp()
	const {token} = useContext(AuthContext)

	const fetchLinks = useCallback(async () => {
		try {
			const fetched = await request(`/api/link`, 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			setLinks(fetched)
		} catch (e) {}
	}, [token, request])

	const deleteLink = useCallback(async code => {
		try {
			const fetched = await request(`/api/link/delete`, 'DELETE', { code }, {
				Authorization: `Bearer ${token}`
			})
			setLinks(fetched)
		} catch (e) {}
	}, [token, request])

	useEffect(() => {
		fetchLinks()
	}, [fetchLinks])

	if (loading) {
		return <Loader />
	}

	return (
		<>
			{ !loading && links && <LinkLIst links={links} onRemove={deleteLink} /> }
		</>
	)
}
import React from "react";
import { Link } from "react-router-dom";


export const LinkLIst = ({ links, onRemove }) => {
	if (!links.length) {
		return <p className="center">No links yet</p>
	}
	return (		
		<table className="striped responsive-table">
			<thead>
				<tr>
						<th>№</th>
						<th>Original link</th>
						<th>Shorten link</th>
						<th>Open</th>
						<th>Delete</th>
				</tr>
			</thead>

			<tbody>
			{ links.map((link, index) => {
				return (
					<tr key={link._id}>
					<td>{index + 1}</td>
					<td>{link.from}</td>
					<td>{link.to}</td>
					<td><Link to={`/detail/${link._id}`}>Open</Link></td>
					<td>
						<button
							type="button" 
							className="btn btn-floating red accent-4 btn-small"
							onClick={() => onRemove(link.code)}
							>&times;
						</button>
					</td>
				</tr>
				)
			}) }
				
			</tbody>
		</table>
	)
}
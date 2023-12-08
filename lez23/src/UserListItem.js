function UserListItem(props) {
	return (
		<div>
			<h1>{props.data.name}</h1>
			<button onClick={() => props.onUserSelect(props.data.uid)}>Details</button>
		</div>)
}

export default UserListItem;
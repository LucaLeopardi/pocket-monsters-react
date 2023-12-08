import UserListItem from "./UserListItem";

function UsersList(props) {
	return (<div>
		<ul>
			{props.data.map(u => <li key={u.uid}>< UserListItem data={u} onUserSelect={props.onUserSelect} /></li>)}
		</ul>
	</div>)
}

export default UsersList;
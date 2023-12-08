function UserDetails(props) {

	const getUserDescription = () => {
		if (props.data.xp > props.data.hp) return props.data.name + " è ganzo"
		else return props.data.name + " è scarso"
	}

	return (<div>
		<button onClick={props.onBackClicked}>Back</button>
		<h1>{props.data.name}</h1>
		<h3>HP: {props.data.hp} | XP: {props.data.xp}</h3>
		<p>{getUserDescription()}</p>
	</div>)
}
export default UserDetails;
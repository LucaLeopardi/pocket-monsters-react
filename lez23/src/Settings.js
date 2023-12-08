function Settings(props) {
	return (<div>
		<button onClick={props.onBackClicked}>Back</button>
		<h1>{props.data.name}'s profile</h1>
		<h2>HP: {props.data.hp} | XP: {props.data.xp}</h2>
		<h5>Super secret uid: {props.data.uid}</h5>
	</div>)
}

export default Settings;
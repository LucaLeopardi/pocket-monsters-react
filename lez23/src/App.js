import './App.css';
import { useState } from 'react';
import UsersList from './UsersList';
import UserDetails from './UserDetails';
import Settings from './Settings';

function App() {

	const [getPageShown, setPageShown] = useState("list")
	const [getSelectedUserUid, setSelectedUserUid] = useState(null)

	let content = null

	let users = [
		{ name: "Andrea", uid: 1, hp: 100, xp: 1 },
		{ name: "Beatrice", uid: 2, hp: 100, xp: 200 },
		{ name: "Carlo", uid: 3, hp: 100, xp: 100 }
	]

	const getUsers = () => {
		return users
	}

	const getUser = (uid) => {
		return users.find(u => u.uid === uid)
	}

	const handleBackClicked = () => {
		setPageShown("list")
		setSelectedUserUid(null)
	}

	const handleUserSelect = (uid) => {
		setPageShown("details")
		setSelectedUserUid(uid)
	}

	const handleSettingsClicked = () => {
		setPageShown("settings")
	}

	switch (getPageShown) {
		case "list":
			content = (
				<div>
					<button onClick={handleSettingsClicked}>Settings</button>
					<div>< UsersList data={users} onUserSelect={handleUserSelect} /></div>
				</div>)
			break

		case "details":
			content = (<div>< UserDetails data={getUser(getSelectedUserUid)} onBackClicked={handleBackClicked} /></div>)
			break

		case "settings":
			content = (<div>< Settings data={getUser(1)} onBackClicked={handleBackClicked} /></div>)
			break

		default:
			content = (<div><h1>ERROR: Undefined page</h1></div>)
			break
	}

	return content
}

export default App;
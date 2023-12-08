import './App.css';
import { useState } from 'react';
import UsersList from './UsersList';
import UserDetails from './UserDetails';

function App() {

	const [getPageShown, setPageShown] = useState("list")
	const [getSelectedUser, setSelectedUser] = useState(null)


	let users = [
		{ name: "Andrea", uid: 1, hp: 100, xp: 1 },
		{ name: "Beatrice", uid: 2, hp: 100, xp: 200 },
		{ name: "Carlo", uid: 3, hp: 100, xp: 100 }
	]

	let content = null

	const handleBackClicked = () => {
		setPageShown("list")
		setSelectedUser(null)
	}

	const handleUserSelect = (uid) => {
		setPageShown("details")
		setSelectedUser(users.find(u => u.uid === uid))
	}

	switch (getPageShown) {
		case "list":
			content = (<div>< UsersList data={users} onUserSelect={handleUserSelect} /></div>)
			break

		case "details":
			content = (<div>< UserDetails data={getSelectedUser} onBackClicked={handleBackClicked} /></div>)
			break

		default:
			content = (<div><h1>Undefined page</h1></div>)
			break
	}

	return content
}



export default App;
import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './Pages/SignUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
	return (
		<div>
			<div>
				<SignUp />;
			</div>
			<ToastContainer />{' '}
		</div>
	);
}

export default App;

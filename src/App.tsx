import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import ProtectedRoute from './Route/ProtectedRoute';
import { useAppSelector } from './Utils/hooks';
import Sample from './Pages/Sample';
import SignUp from './Pages/Auth/Auth';
function App() {
	const login = useAppSelector((state) => state.signUp.isLoginIn);
	return (
		<Routes>
			<Route path="/" element={<SignUp />} />
			<Route element={<ProtectedRoute auth={login} />}>
				<Route path="/home" element={<Home />} />
				<Route path="/smaple" element={<Sample />} />
			</Route>
		</Routes>
	);
}

export default App;

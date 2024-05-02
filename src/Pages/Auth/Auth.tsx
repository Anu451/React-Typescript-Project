import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import signUpBg from '../../Assets/Images/signUpImg.jpg';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../Firstore';
import { SignUpThunk } from '../../Redux/SignUpSlice';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../Utils/hooks';
import { useNavigate } from 'react-router-dom';
import { AuthToggle, LoginState, SignUpState } from '../../Types/authTypes';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { LoginThunk } from '../../Redux/LoginSlice';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SignUp() {
	const [signUp, setSignUp] = useState<SignUpState>({
		emailId: '',
		password: '',
		confirmPassword: '',
	});
	const [login, setLogin] = useState<LoginState>({
		email: '',
		password: '',
	});
	const [authToggle, setAuthToggle] = useState<AuthToggle>('signIn');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSignUp = async () => {
		if (signUp.emailId.trim() === '') {
			toast.error('Email ID cannot be null'); // `toast.error` for error messages
		} else if (!emailRegex.test(signUp.emailId)) {
			toast.error('Enter valid Email Id');
		} else if (signUp.password !== signUp.confirmPassword) {
			toast.error('Passwords do not match');
		} else {
			const q = query(
				collection(db, 'Users'),
				where(signUp.emailId, '==', 'emailId'),
				where('isDelete', '==', false)
			);
			const userData = await getDocs(q);
			const data = userData.docs.map((docs) => docs.data());
			console.log(data, 'data');

			if (data.length === 0) {
				console.log('user does not exist');
				dispatch(SignUpThunk(signUp)).then((result) => {
					if (result.meta.requestStatus === 'fulfilled') {
						console.log('done');
						navigate('/home');
					}
				});
			} else {
				console.log('user exists');
			}
			// toast.success('Sign-up successful!');
		}
	};

	const handelLogin = () => {
		console.log(login);
		if (login.email.trim() === '') {
			console.log('dsafsddsfsfddf');

			toast.error('Email id cant be empty');
		} else if (!emailRegex.test(login.email)) {
			toast.error('Invalid Email id');
		} else if (login.password.length === 0 || login.password.length < 6) {
			toast.error('Invalid password');
		} else {
			console.log('kjdnjsdnfn');

			dispatch(LoginThunk(login)).then((result) => {
				console.log(result);
				if (result.meta.requestStatus === 'fulfilled') {
					// toast.success('Login successful');
					navigate('/home');
				} else {
					toast.error('Error');
				}
			});
		}
	};

	return (
		<div className=" flex justify-center items-center flex-col h-full p-10 relative ">
			<div>
				<img
					src={signUpBg}
					alt=""
					className="w-[600px] h-[600px] absolute bottom-0 left-20 top-40"
				/>
			</div>
			<div className=" absolute top-48 flex flex-col justify-center items-center right-80 bg-white shadow-gray-300 shadow-md p-20 border-[1px] border-gray-200 rounded-lg">
				{authToggle === 'signIn' ? (
					<div>
						<div className="text-[60px]">SIGN UP</div>
						<div className=" flex justify-center items-center flex-col">
							<input
								type="text"
								placeholder="Email ID"
								className=" border-[1px] border-gray-300 p-1 rounded-md my-1 w-[250px]"
								onChange={(e) => {
									setSignUp({ ...signUp, emailId: e.target.value });
								}}
							/>
							<input
								type="password"
								name=""
								id=""
								placeholder="Password"
								className=" border-[1px] border-gray-300 p-1 rounded-md my-1 w-[250px]"
								onChange={(e) => {
									setSignUp({ ...signUp, password: e.target.value });
								}}
							/>
							<input
								type="password"
								name=""
								id=""
								placeholder="Re-enter password"
								className=" border-[1px] border-gray-300 p-1 rounded-md my-1 w-[250px]"
								onChange={(e) => {
									setSignUp({ ...signUp, confirmPassword: e.target.value });
								}}
							/>
						</div>
						<div>
							<button
								onClick={() => {
									handleSignUp();
								}}
								className=" bg-yellow text-white px-10 py-3 rounded-lg mt-5"
							>
								Sign up
							</button>
						</div>
						<p
							className=" text-[12px] pt-4 text-blue-700"
							onClick={() => setAuthToggle('login')}
						>
							Do you have account? Login here
						</p>
					</div>
				) : (
					<div>
						<div className="text-[60px]">Login</div>
						<div className=" flex justify-center items-center flex-col">
							<input
								type="text"
								placeholder="Email ID"
								className=" border-[1px] border-gray-300 p-1 rounded-md my-1 w-[250px]"
								onChange={(e) => {
									setLogin({ ...login, email: e.target.value });
								}}
							/>
							<input
								type="password"
								name=""
								id=""
								placeholder="Password"
								className=" border-[1px] border-gray-300 p-1 rounded-md my-1 w-[250px]"
								onChange={(e) => {
									setLogin({ ...login, password: e.target.value });
								}}
							/>
						</div>
						<div>
							<button
								onClick={() => {
									handelLogin();
								}}
								className=" bg-yellow text-white px-10 py-3 rounded-lg mt-5"
							>
								Login
							</button>
						</div>
						<p
							className=" text-[12px] pt-4 text-blue-700"
							onClick={() => setAuthToggle('signIn')}
						>
							Dont have an account? SignIn here
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default SignUp;

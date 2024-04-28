import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import signUpBg from '../Assets/Images/signUpImg.jpg';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../Firstore';
import { SignUpThunk } from '../Redux/SignUpSlice';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../Utils/hooks';

interface SignUpState {
	emailId: string;
	password: string;
	confirmPassword: string;
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SignUp() {
	const [signUp, setSignUp] = useState<SignUpState>({
		emailId: '',
		password: '',
		confirmPassword: '',
	});
	const dispatch = useAppDispatch(); // Correct the typo in variable name (dispatch)

	// const handelWhatEver = () => {
	// 	// console.log(signUp);
	// 	// const SignUpdata = {
	// 	// 	emailId: 'example@example.com',
	// 	// 	password: 'password123',
	// 	// 	confirmPassword: 'password123', // Ensure this matches the expected type
	// 	// };
	// 	// dispatch(SignUpThunk(signUp));
	// };

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
					}
				});
			} else {
				console.log('user exists');
			}
			// toast.success('Sign-up successful!');
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
			</div>
		</div>
	);
}

export default SignUp;

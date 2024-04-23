import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface SignUpState {
	emailId: string;
	password: string;
	confirmPassword: string;
}

function SignUp() {
	const [signUp, setSignUp] = useState<SignUpState>({
		emailId: '',
		password: '',
		confirmPassword: '',
	});

	const handelSignUp = () => {
		if (signUp.emailId.length < 0) {
			toast.error('Invalid email id');
			console.log('ldkfhksdfhk');
		} else if (signUp.password === signUp.confirmPassword) {
			toast.error('Passwords does not match');
			console.log('skdfmksdm');
		} else {
			console.log('yeah');
		}
	};
	return (
		<div className=" flex justify-center items-center flex-col">
			<div>SIGN UP</div>
			<div className=" flex justify-center items-center flex-col">
				<input
					type="text"
					placeholder="email id"
					className=" border-[1px] border-gray-300 p-1 rounded-md my-1"
					onChange={(e) => {
						setSignUp({ ...signUp, emailId: e.target.value });
					}}
				/>
				<input
					type="password"
					name=""
					id=""
					placeholder="password"
					className=" border-[1px] border-gray-300 p-1 rounded-md my-1"
					onChange={(e) => {
						setSignUp({ ...signUp, password: e.target.value });
					}}
				/>
				<input
					type="password"
					name=""
					id=""
					placeholder="re enter password"
					className=" border-[1px] border-gray-300 p-1 rounded-md my-1"
					onChange={(e) => {
						setSignUp({ ...signUp, confirmPassword: e.target.value });
					}}
				/>
			</div>
			<div>
				<button
					onClick={() => {
						handelSignUp();
						// console.log(signUp);
					}}
				>
					Sign up
				</button>
			</div>
		</div>
	);
}

export default SignUp;

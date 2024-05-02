import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import {
	getAuth,
	signInWithEmailAndPassword,
	AuthErrorCodes,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { app, db } from '../Firstore';
import { collection, doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { SignUpInitalstate, SignUpState } from '../Types/authTypes';

const INITIALSTATE: SignUpInitalstate = {
	isLoading: false,
	isLoginIn: false,
	userData: {
		emailId: '',
		id: '',
		createdAt: 0,
		lastSignIn: 0,
	},
};

const auth = getAuth(app);
const userCollection = collection(db, 'Users');

export const SignUpThunk = createAsyncThunk(
	'signUp',
	async (signUp: SignUpState) => {
		try {
			const creatAccount = await createUserWithEmailAndPassword(
				auth,
				signUp.emailId,
				signUp.password
			);
			console.log(creatAccount.user);
			const creationTime = creatAccount.user.metadata.creationTime;
			const lastSignInTime = creatAccount.user.metadata.lastSignInTime;
			const emailId = creatAccount.user.email || ''; // Ensure it's always a string

			const user = {
				emailId: emailId,
				id: creatAccount.user.uid,
				createdAt: creationTime ? new Date(creationTime).getTime() : 0,
				lastSignIn: lastSignInTime ? new Date(lastSignInTime).getTime() : 0,
			};

			const docRef = doc(db, 'users', creatAccount.user.uid);
			const setData = await setDoc(docRef, user);
			toast.success('User created successfuly');
			return user;
		} catch (err) {
			console.log('Error', err);
			toast.error('Error');
		}

		// const userEmail = signUp.emailId;
	}
);

const SignUpSlice = createSlice({
	name: 'signUp',
	initialState: INITIALSTATE,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(SignUpThunk.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isLoginIn = true;
			console.log(action.payload);
			if (action.payload) {
				state.userData = action.payload; // Ensure payload conforms to UserDataType
			} // state.userData = action.payload
		});
	},
});

export default SignUpSlice.reducer;

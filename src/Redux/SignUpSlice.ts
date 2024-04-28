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
interface SignUpState {
	isLoading: boolean;
}
interface signUp {
	emailId: string;
	password: string;
	confirmPassword: string;
}

interface User {
	uid: string;
	emailId: string;
	createdAt: Date;
}
const INITIALSTATE: SignUpState = {
	isLoading: false,
};

const auth = getAuth(app);
const userCollection = collection(db, 'Users');

export const SignUpThunk = createAsyncThunk(
	'signUp',
	async (signUp: signUp) => {
		try {
			const creatAccount = await createUserWithEmailAndPassword(
				auth,
				signUp.emailId,
				signUp.password
			);
			console.log(creatAccount.user);

			const user = {
				emailId: creatAccount.user.email,
				id: creatAccount.user.uid,
				createdAt: creatAccount.user.metadata.creationTime,
				lastSignIn: creatAccount.user.metadata.lastSignInTime,
			};
			const docRef = doc(db, 'users', creatAccount.user.uid);
			const setData = await setDoc(docRef, user);
			toast.success('User created successfuly');
		} catch (err) {
			console.log('Error', err);
			toast.error('Error');
		}

		// const userEmail = signUp.emailId;
		// return {};
	}
);

const SignUpSlice = createSlice({
	name: 'signUp',
	initialState: INITIALSTATE,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(SignUpThunk.fulfilled, (state, asction) => {
			state.isLoading = false;
		});
	},
});

export default SignUpSlice.reducer;

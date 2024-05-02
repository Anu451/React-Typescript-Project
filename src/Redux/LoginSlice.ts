import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginState } from '../Types/authTypes';
import {
	AuthErrorCodes,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '../Firstore';
import { toast } from 'react-toastify';
import { useAppSelector } from '../Utils/hooks';

const INITIALSTATE: LoginState = {
	email: '',
	password: '',
};

const auth = getAuth(app);

export const LoginThunk = createAsyncThunk(
	'auth/login',
	async (login: LoginState, { rejectWithValue }) => {
		console.log(login);
		try {
			const loginUser = signInWithEmailAndPassword(
				auth,
				login.email,
				login.password
			);
			return loginUser;
		} catch (error: any) {
			console.log(error.code, 'code');
			console.log(error);
			if (
				error.code === AuthErrorCodes.INVALID_PASSWORD ||
				error.code === AuthErrorCodes.USER_DELETED
			) {
				toast.error('Invalid mail or password');
				return rejectWithValue('Invalid email or password'); // Return a rejected state
			} else {
				toast.error('An unknown error occurred during login');
				return rejectWithValue('An unknown error occurred'); // Return a general rejection
			}
		}
	}
);

export const LoginSlice = createSlice({
	name: 'login',
	initialState: INITIALSTATE,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(LoginThunk.rejected, (state, action) => {
			// isLoginIn = true
			// Handle rejected state (optional, e.g., clear login form fields)
		});
	},
});

export default LoginSlice.reducer;

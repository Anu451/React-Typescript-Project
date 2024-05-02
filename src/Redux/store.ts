import { configureStore } from '@reduxjs/toolkit';
import SignUpSlice from './SignUpSlice';
import LoginSlice from './LoginSlice';

export const store = configureStore({
	reducer: {
		signUp: SignUpSlice,
		login: LoginSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

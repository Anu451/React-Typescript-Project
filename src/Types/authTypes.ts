import { UserDataType } from './User';

export interface SignUpState {
	emailId: string;
	password: string;
	confirmPassword: string;
}

export interface SignUpInitalstate {
	isLoading: boolean;
	isLoginIn: boolean;
	userData: UserDataType;
}
export type AuthToggle = string;

export interface LoginState {
	email: string;
	password: string;
}

export {};

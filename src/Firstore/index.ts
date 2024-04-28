// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBbbXNtyvvKhsj8TpfN1FohpufanjPZMwE',
	authDomain: 'typescript-dd1da.firebaseapp.com',
	projectId: 'typescript-dd1da',
	storageBucket: 'typescript-dd1da.appspot.com',
	messagingSenderId: '162952348853',
	appId: '1:162952348853:web:c3034b1122a801d51c6afc',
	measurementId: 'G-Z3JP3YT845',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export {};

// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';

import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAua2OeeWHlz21B3RmDnjTfFzHRpnViGI4',
	authDomain: 'resume-pasrsing.firebaseapp.com',
	projectId: 'resume-pasrsing',
	storageBucket: 'resume-pasrsing.appspot.com',
	messagingSenderId: '1078094297779',
	appId: '1:1078094297779:web:a44d03f78cbc76fb8e0ec6',
	measurementId: 'G-DCMLX5QX7X',
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);



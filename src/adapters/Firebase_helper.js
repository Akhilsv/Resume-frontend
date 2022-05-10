import { useState } from 'react';

import { storage } from '../Firebase';
import {
	ref,
	uploadBytes,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
} from 'firebase/storage';
const Firebase_helper = () => {
	const [progresss, setProgresss] = useState('');
	///-------------------------------------------------postUpload-------------
	const postUpload = async (file) => {
		try {
			const storageRef = ref(storage, `posts/${file.name}`);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadBytes(storageRef, file).then((snapshot) => {
				console.log('Uploaded a blob or file!');
			});

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							break;
						default:
							break;
					}
				},
				(error) => {
					// A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
					switch (error.code) {
						case 'storage/unauthorized':
							// User doesn't have permission to access the object
							break;
						case 'storage/canceled':
							// User canceled the upload
							break;

						// ...

						case 'storage/unknown':
							// Unknown error occurred, inspect error.serverResponse
							break;
						default:
							break;
					}
				},
				() => {
					// Upload completed successfully, now we can get the download URL
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setProgresss(downloadURL);
					});
				},
			);
		} catch (e) {
			console.log(e);
		}
		return progresss;
	};

	const deleteUpload = async (file) => {
		const desertRef = ref(storage, `posts/${file.name}`);
		deleteObject(desertRef)
			.then(() => {
				console.log('deleted succues');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	///------------------------------------return values
	return { postUpload, progresss, deleteUpload };
};

export default Firebase_helper;

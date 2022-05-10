import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Api_helper from '../adapters/Api_helper';
import { RiFileUploadLine } from 'react-icons/ri';
import { MdDone } from 'react-icons/md';
import { VscDebugRestart } from 'react-icons/vsc';
import Firebase_helper from '../adapters/Firebase_helper';
import { async } from '@firebase/util';
import PopUp from './reusable/PopUp';

const Register = ({ state }) => {
	const { postUpload, progresss, deleteUpload } = Firebase_helper();
	const { registerFormApi } = Api_helper();
	const [fullName, SetFullName] = useState('');
	const [email, SetEmail] = useState('');
	const [college, SetCollege] = useState('');
	const [resume, setResume] = useState('');
	const [message, setMessage] = useState('');
	const resumeType = [
		'pdf',
		'vnd.openxmlformats-officedocument.wordprocessingml.document',
	];
	const resumeRef = useRef();
	const collegeHandler = (e) => {
		SetCollege(e.target.value);
	};
	const fullNameHandler = (e) => {
		SetFullName(e.target.value);
	};
	const emailHandler = (e) => {
		SetEmail(e.target.value);
	};

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		const data = {
			fullName,
			email,
			college,
			file: progresss,
		};

		postUpload(resume)
			.then(async () => {
				try {
					const responsee = await registerFormApi(data);
					console.log(responsee);
				} catch (error) {
					throw new Error(error.message);
				}
			})
			.catch((e) => {
				setMessage(e.message);
				deleteUpload(resume);
			});
	};

	const clearResumeField = () => {
		setResume('');
		resumeRef.current.value = '';
	};
	const resumeHandler = (e) => {
		if (e.target.files[0].size / 1024 / 1024 < 2) {
			setResume(e.target.files[0]);
		} else {
			console.log('Image Should Less than 2MB');
		}
	};
	return (
		<>
			{message && <PopUp state={[message, setMessage]} />}

			<Heading>User Register</Heading>
			<Form onSubmit={formSubmitHandler}>
				<label>Full Name</label>
				<input
					type='text'
					placeholder='Full Name'
					value={fullName}
					onChange={fullNameHandler}
				/>

				<label>Email address</label>
				<input
					type='email'
					placeholder='Email address'
					value={email}
					onChange={emailHandler}
				/>
				<label>College</label>
				<input
					type='text'
					placeholder='College'
					value={college}
					onChange={collegeHandler}
				/>
				<DropFile>
					<label htmlFor='fileInput'>
						<div>
							{resume && (
								<h1 onClick={clearResumeField}>
									<VscDebugRestart />
								</h1>
							)}
							{resume ? <Done /> : <Add />}
							<p>{resume ? resume.name : 'Add Resume Here'}</p>
						</div>
					</label>
					<input
						type='file'
						id='fileInput'
						name='image'
						ref={resumeRef}
						onChange={resumeHandler}
						required
					/>
				</DropFile>
				<button type='submit'>Apply</button>
			</Form>
		</>
	);
};

export default Register;
const Heading = styled.h1`
	margin: 40px;
`;
const Form = styled.form`
	border-radius: 4px;
	max-width: 380px;
	min-width: 380px;
	z-index: 300;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	overflow: hidden;
	transition: all 0.5s ease;
	input,
	select {
		font-size: 16px;
		height: 48px;
		padding-left: 16px;
		padding-right: 16px;
		background: white;
		border: 0;
		outline: none;
		border-radius: 4px;
		box-shadow: inset 0 0 0 1.5px #6443eb;
		margin: 0;
		color: rgb(5, 25, 45);
		margin-bottom: 20px;
		width: 90%;
		:focus {
			box-shadow: inset 0 0 0 1.5px rgb(69, 169, 236);
		}
	}

	select {
		:disabled {
			box-shadow: inset 0 0 0 2px #d1d1d1;
			background: #d1d1d1;
			cursor: not-allowed;
		}
	}

	label {
		width: 100%;
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 20px;

		color: #05192d;
		white-space: nowrap;
		float: left;
		background: transparent;
	}
	button {
		outline: none;
		border: none;
		width: 100%;
		height: 40px;
		font-size: 1rem;
		border-radius: 5px;
		transition: all 0.7s ease;
		cursor: pointer;
		color: #fffefe;
		background-color: #6443eb;
		font-weight: 500;
		letter-spacing: 1px;
		position: relative;
		:hover {
			background-color: #1a3873;
		}
		:disabled {
			cursor: not-allowed;
			background: #d1d1d1;
			color: #706f6f;
		}
	}
`;
const DropFile = styled.div`
	width: 100%;
	label {
		div {
			width: 100%;
			height: 100px;
			background-color: #f5f4f4;
			position: relative;
		}
		p {
			letter-spacing: 1px;
			font-size: 0.8rem;
			color: #868383;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, -50%);
			font-family: 'Raleway', sans-serif;
			text-transform: capitalize;
			white-space: nowrap;
		}
		h1 {
			color: #f3f3f3;
			position: absolute;
			top: 2%;
			font-size: 1rem;
			right: 2%;
			background-color: #868585;
			width: 30px;
			height: 30px;
			display: grid;
			place-items: center;
			padding: auto;
			cursor: pointer;
			border-radius: 50%;
			z-index: 555;
		}
	}
	input[type='file'] {
		opacity: 0;
		pointer-events: none;
		display: none;
	}
`;
const Add = styled(RiFileUploadLine)`
	font-size: 3rem;
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: #2141a3;

	cursor: pointer;
`;
const Done = styled(MdDone)`
	font-size: 3rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: #5de727;
`;

import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { AiOutlineCloseSquare, AiOutlineCheckCircle } from 'react-icons/ai';
const Message = ['OTP sent', 'OTP Matched', 'Applied', 'Enquiry sent'];

const PopUp = ({ state }) => {
	const [message, setMessage] = state;

	useEffect(() => {
		setTimeout(() => {
			setMessage();
		}, [3000]);
		return () => {
			clearInterval();
		};
	}, [setMessage]);
	return (
		<>
			<ErrorContainer onClick={() => setMessage('')} message={message}>
				<Icon>
					<AiOutlineCheckCircle />
				</Icon>
				<p>{message}</p>
				{/* <Close size={25} style={{ color: '#ffffff' }} /> */}
			</ErrorContainer>
		</>
	);
};

export default PopUp;
const MoveIn = keyframes`
from{
    transform:translateX(100%);

}to{
    transform:translateX(0%);
}
`;
const ErrorContainer = styled.div`
	width: 235px;
	min-width: 250px;
	max-width: 280px;
	height: 40px;
	background-color: ${(prop) =>
		Message.includes(prop.message) ? '#388b01' : '#F8B115'};
	display: flex;
	align-items: center;
	justify-content: flex-start;
	border-radius: 5px;
	position: fixed;
	bottom: 60px;
	right: 5px;
	padding: 5px 10px;
	cursor: pointer;
	animation: 0.8s ${MoveIn} cubic-bezier(0.51, 0.92, 0.24, 1.15);
	z-index: 666;

	p {
		color: #ffffff;
		font-size: 16px;
		font-weight: bold;
		margin-left: 15px;
		font-weight: 500;
		font-family: 'Montserrat', sans-serif;
	}
`;
const Icon = styled.div`
	color: #ffffff;

	display: grid;
	place-items: center;
	font-size: 1.5rem;
`;
const Close = styled(AiOutlineCloseSquare)``;

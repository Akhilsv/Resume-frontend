import React from 'react';
import styled from 'styled-components';
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom';
import Users from './components/Users';
const App = () => {
	return (
		<StyledContainer>
			<Routes>
				<Route path='/' exact element={<Register />} />
				<Route path='/users' exact element={<Users />} />
			</Routes>
		</StyledContainer>
	);
};
const StyledContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding-top: 50px;
`;
export default App;

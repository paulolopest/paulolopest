import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/about');
	};

	return (
		<div>
			<h1>Login</h1>
			<button onClick={handleClick}>Login</button>
		</div>
	);
};

export default Login;

import React from 'react';
import Input from './components/Input';
import useForm from './hooks/useForm';

const App = () => {
	const cep = useForm('cep');
	const email = useForm('email');
	const name = useForm();
	const lastName = useForm(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (cep.validate() && email.validate() && name.validate()) {
			console.log('Send');
		} else {
			console.log('Not sended');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Input
				label={'CEP'}
				id="cep"
				type="text"
				placeholder="0000-000"
				{...cep}
			/>
			<Input
				label={'Name'}
				id="name"
				type="text"
				placeholder="Name	"
				{...name}
			/>
			<Input
				label={'Last name'}
				id="lastName"
				type="text"
				placeholder="lastName	"
				{...lastName}
			/>
			<Input
				label={'Email'}
				id="email"
				type="text"
				placeholder="Email"
				{...email}
			/>
			<button>Send</button>
		</form>
	);
};

export default App;

import React from 'react';
import Slide from './components/Slide';
import './styles/Style.scss';

const slides = [
	{
		id: '1',
		text: 'text1',
	},
	{
		id: '2',
		text: 'text2',
	},
	{
		id: '3',
		text: 'text3',
	},
];

const App = () => {
	return (
		<div>
			<Slide slides={slides} />
		</div>
	);
};

export default App;

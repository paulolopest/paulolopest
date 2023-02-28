import React from 'react';
import Radio from './components/Radio';

const questions = [
	{
		question: 'Qual método é utilizado para criar componentes?',
		options: [
			'React.makeComponent()',
			'React.createComponent()',
			'React.createElement()',
		],
		answer: 'React.createElement()',
		id: 'p1',
	},
	{
		question: 'Como importamos um componente externo?',
		options: [
			'import Component from "./Component"',
			'require("./Component")',
			'import "./Component"',
		],
		answer: 'import Component from "./Component"',
		id: 'p2',
	},
	{
		question: 'Qual hook não é nativo?',
		options: ['useEffect()', 'useFetch()', 'useCallback()'],
		answer: 'useFetch()',
		id: 'p3',
	},
	{
		question: 'Qual palavra deve ser utilizada para criarmos um hook?',
		options: ['set', 'get', 'use'],
		answer: 'use',
		id: 'p4',
	},
];

const App = () => {
	const [answer, setAnswer] = React.useState({
		p1: '',
		p2: '',
		p3: '',
		p4: '',
	});

	const [slide, setSlide] = React.useState(0);
	const [finalResult, setFinalResult] = React.useState(null);

	const handleChange = ({ target }) => {
		setAnswer({ ...answer, [target.id]: target.value });
	};

	const result = () => {
		const corrects = questions.filter(
			(question) => answer[question.id] === question.answer
		);
		setFinalResult(`You got: ${corrects.length} of ${questions.length}`);
		console.log(corrects);
	};

	const onClickNext = () => {
		if (slide < questions.length - 1) {
			setSlide(slide + 1);
		} else {
			setSlide(null);
			result();
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<form onSubmit={onSubmit}>
			{questions.map((question, index) => (
				<Radio
					active={slide === index}
					key={question.id}
					value={answer[answer.id]}
					onChange={handleChange}
					{...question}
				/>
			))}
			{finalResult ? (
				<p>{finalResult}</p>
			) : (
				<button onClick={onClickNext}>Next</button>
			)}
		</form>
	);
};

export default App;

import React from 'react';

const Radio = ({ question, options, answer, id, onChange, value, active }) => {
	if (active === false) return null;
	return (
		<fieldset
			style={{
				padding: '2rem',
				marginBottom: '1rem',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<legend>
				<strong>{question}</strong>
			</legend>

			{options.map((option) => (
				<label
					style={{
						marginBottom: '1rem',
						fontFamily: 'monospace',
						display: 'flex',
					}}
					key={option}
				>
					<input
						type="radio"
						id={id}
						checked={value === option}
						value={option}
						onChange={onChange}
						style={{ width: 'auto', marginRight: '20px' }}
					/>
					{option}
				</label>
			))}
		</fieldset>
	);
};

export default Radio;

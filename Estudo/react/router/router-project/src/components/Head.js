import React from 'react';

const Head = (props) => {
	React.useEffect(() => {
		document.title = props.title;
	}, [props]);
};

export default Head;

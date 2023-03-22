import React from 'react';

const Slide = ({ slides }) => {
	const [active, setActive] = React.useState(0);
	const [position, setPosition] = React.useState(0);
	const contentRef = React.useRef();

	React.useEffect(() => {
		const { width } = contentRef.current.getBoundingClientRect();
		setPosition(-(width * active));
	});

	const slidePrev = () => {
		if (active > 0) setActive(active - 1);
	};
	const slideNext = () => {
		if (slides.length - 1 > active) setActive(active + 1);
	};

	return (
		<section className="slide-container">
			<div className="slide-content">
				{slides.map((slide) => (
					<div
						ref={contentRef}
						className="slide-item"
						key={slide.id}
						style={{ transform: `translateX(${position}px)` }}
					>
						{slide.text}
					</div>
				))}
			</div>
			<nav className="slide-nav">
				<button onClick={slidePrev}>Previous</button>
				<button onClick={slideNext}>Next</button>
			</nav>
		</section>
	);
};

export default Slide;

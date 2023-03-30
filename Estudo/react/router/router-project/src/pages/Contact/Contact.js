import React from 'react';
import Head from '../../components/Head';
import contactImg from '../../img/contato.jpg';

const Contact = () => {
	return (
		<section className="contact animeLeft">
			<Head title="Contact" />
			<img src={contactImg} alt="contact" />
			<div>
				<h1>Contact</h1>
				<ul className="contact-links">
					<li>paulo@gmail.com</li>
					<li>99999-9999</li>
					<li>Diamond Street</li>
				</ul>
			</div>
		</section>
	);
};

export default Contact;

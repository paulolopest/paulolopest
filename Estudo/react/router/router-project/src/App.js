import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Contact from './pages/Contact/Contact';
import './styles/style.scss';
import './App.css';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<div className="content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/product/:id" element={<Product />} />
						<Route path="contact" element={<Contact />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
};

export default App;

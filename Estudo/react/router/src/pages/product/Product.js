import React from 'react';
import { Routes, useParams, Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import ProductDescription from './ProductDescription';
import ProductReview from './ProductReview';

const Product = () => {
	const params = useParams();

	return (
		<div>
			<h1>Products</h1>
			<p>Product: {params.id}</p>
			<br />

			<nav>
				<NavLink to="">Description</NavLink>
				<NavLink to="review">Review</NavLink>
			</nav>
			<Routes>
				<Route path="/" element={ProductDescription} />
				<Route path="/review" element={ProductReview} />
			</Routes>
		</div>
	);
};

export default Product;

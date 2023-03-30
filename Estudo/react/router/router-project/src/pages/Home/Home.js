import React from 'react';
import { Link } from 'react-router-dom';
import Head from '../../components/Head';

const Home = () => {
	const [products, setProducts] = React.useState(null);

	React.useEffect(() => {
		fetch('https://ranekapi.origamid.dev/json/api/produto')
			.then((r) => r.json())
			.then((json) => setProducts(json));
	}, []);

	console.log(products);

	if (products === null) return null;
	return (
		<section className="home-container animeLeft">
			<Head title="Ranek" />
			{products.map((product) => (
				<Link
					to={`product/${product.id}`}
					className="home-card"
					key={product.id}
				>
					<img src={product.fotos[0].src} alt={product.nome}></img>
					<h1>{product.nome}</h1>
				</Link>
			))}
		</section>
	);
};

export default Home;

import React from 'react';
import { useParams } from 'react-router-dom';
import Head from './../../components/Head';

const Product = () => {
	const [product, setProduct] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);

	const { id } = useParams();

	React.useEffect(() => {
		async function fetchProduct(url) {
			try {
				setLoading(true);

				const response = await fetch(url);
				const json = await response.json();
				setProduct(json);
			} catch (error) {
				setError('Error');
			} finally {
				setLoading(false);
			}
		}
		fetchProduct(`https://ranekapi.origamid.dev/json/api/produto/${id}`);
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <p>Error</p>;
	if (product === null) return null;
	return (
		<section className="product-container animeLeft">
			<Head title={`Ranek | ${product.nome}`} />
			<div>
				{product.fotos.map((foto) => (
					<img key={foto.src} src={foto.src} alt="foto"></img>
				))}
			</div>
			<div>
				<h1>{product.nome}</h1>
				<span>R$ {product.preco}</span>
				<p>{product.descricao}</p>
			</div>
		</section>
	);
};

export default Product;

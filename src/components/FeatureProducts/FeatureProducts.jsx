/** @format */
import styles from "./FeatureProducts.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from '../../Context/CartContext.jsx'
export default function FeatureProducts() {
	const [page, setPage] = useState(1)
	const { addToCart } = useContext(CartContext)
	async function addProudactCart(productId) {
		await addToCart(productId)
	}
	function getProducts() {
		return axios.get(
			`https://ecommerce.routemisr.com/api/v1/products?page=${page}`
		)
	}
	let { data, isLoading, error } = useQuery({
		queryKey: ['featureProductsData', page],
		queryFn: getProducts,
		keepPreviousData: true,
	})

	// const [products, setProducts] = useState([]);
	// const [errorMaseg, setErrorMaseg] = useState(null);
	// const [loading, setLoading] = useState(true);
	// useEffect(() => {
	// 	getProduct();
	// }, []);
	// async function getProduct() {
	// 	return axios
	// 		.get(`https://ecommerce.routemisr.com/api/v1/products`)
	// 		.then((data) => {
	// 			console.log(data.data.data);
	// 			setProducts(data.data.data);
	// 			setLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err.message);
	// 			setErrorMaseg(err.message);
	// 			setLoading(false);
	// 		});
	// }
	let totalPages = data?.data?.metadata?.numberOfPages || 0
	return (
		<>
			<div className='container mx-auto px-9'>
				{isLoading ? <Loader /> : null}
				{error ? (
					<div className='flex items-center justify-center h-screen '>
						{' '}
						<p className='text-center text-8xl line-height-20xl text-main'>
							{error}
						</p>
					</div>
				) : null}
				<div className='flex flex-wrap'>
					{data?.data?.data.map((products) => (
						<div
							key={products.id}
							className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-3 py-4'>
							<Link
								to={`/ProductDetails/${products.id}/${products.category.slug}`}>
								<img
									src={products.imageCover}
									className={`
										${styles.img} w-full p-2.5 h-[280px] object-cover'
									alt=''`}
								/>
								<h3 className='text-main mt-1.5'>{products.category.name}</h3>
								<p>{products.title.split(' ').slice(0, 2).join(' ')}</p>
								<div className='flex items-center justify-between'>
									<p>EG: {products.price}</p>
									<p>
										<i className='text-amber-300 fa-solid fa-star'></i>
										{products.ratingsAverage}
									</p>
								</div>
							</Link>
							<div className='text-center mt-2.5'>
								<button
									onClick={() => addProudactCart(products._id)}
									className={`${styles.CartBtn} w-full py-6 px-3 text-center`}>
									<span className={styles.IconContainer}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											height='1em'
											viewBox='0 0 576 512'
											fill='rgb(17, 17, 17)'
											className='cart'>
											<path d='M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z'></path>
										</svg>
									</span>
									<span className={styles.text}>Add to Cart</span>
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='flex justify-center m-8'>
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index}
						onClick={() => setPage(index + 1)}
						className='mx-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100'>
						{index + 1}
					</button>
				))}
			</div>
		</>
	)
}

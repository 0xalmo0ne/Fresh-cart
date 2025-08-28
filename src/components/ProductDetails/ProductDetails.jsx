/** @format */

import React, { useContext } from "react";
import styles from "./ProudactDetiles.module.css/";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext.jsx'
export default function ProudactDetiles() {
	const { addToCart, addToList } = useContext(CartContext)

	async function addToWish(productId) {
		await addToList(productId)
	}

	async function addProudactCart(productId) {
		await addToCart(productId)
	}
	let { id, category } = useParams()

	async function relatedProducts() {
		return await axios
			.get(`https://ecommerce.routemisr.com/api/v1/products`)
			.then((product) => {
				return product?.data?.data.filter(
					(p) => p.category.slug === category && p.id != id
				)
			})
	}

	const { data: relatedProduct, isLoading } = useQuery({
		queryKey: ['relatedProduct', id],
		queryFn: relatedProducts,
	})

	function getProudact() {
		return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
	}
	let {
		data: dataDetails,
		isLoading: isLodingDetails,
		error,
	} = useQuery({
		queryKey: ['product', id],
		queryFn: getProudact,
	})

	if (isLoading)
		return (
			<p className='text-center text-2xl mt-40'>Loading product details...</p>
		)

	if (isLodingDetails)
		return (
			<p className='text-center text-2xl mt-40'>Loading product details...</p>
		)

	if (error)
		return (
			<p className='text-center mt-10 text-red-500'>
				Error fetching product: {error.message}
			</p>
		)
	let ProductDetails = dataDetails?.data?.data
	function SimpleSlider() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
		}
		return (
			<Slider {...settings}>
				{ProductDetails.images?.map((src) => (
					<img src={src} alt='' />
				))}
			</Slider>
		)
	}
	return (
		<>
			<div className='container mx-auto'>
				<div className='flex flex-col md:flex-row mx-auto'>
					<div className='w-full md:w-1/3 mt-4'>
						<SimpleSlider images={ProductDetails?.images} />
					</div>
					<div className='w-3/4 mx-5'>
						<h2 className='text-black mx-auto my-5 text-2xl mt-28'>
							{dataDetails?.data?.data.title}
						</h2>
						<p className='text-slate-700 mt-5 my-5'>
							{dataDetails?.data?.data.description}
						</p>
						<p className='text-gray-500'>Category: </p>
						<p>{dataDetails?.data?.data.category.name}</p>
						<div className='flex items-center justify-between'>
							<p>
								price: {dataDetails?.data?.data.price}
								<span className='m-1'>EG</span>
							</p>
							<p>
								<i className='text-amber-300 fa-solid fa-star'></i>
								{dataDetails?.data?.data.ratingsAverage}
							</p>
						</div>

						<div className='text-center mt-5 flex justify-between items-center gap-5'>
							<button
								onClick={() => addProudactCart(dataDetails?.data?.data._id)}
								className={`${styles.CartBtn} w-full py-6 px-10 text-center`}>
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
							<div>
								<button
									onClick={() => addToWish(dataDetails?.data?.data._id)}
									className='cursor-pointer w-12 h-12 rounded-fullflex items-center justify-center  bg-transparent hover:bg-transparent transition'>
									<i className='fa-solid fa-heart text-red-600 text-5xl'></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='container mx-auto'>
				<h2 className='mt-10 text-4xl text-main text-center'>Product:</h2>
				<div className='flex flex-wrap'>
					{relatedProduct?.map((items) => (
						<div
							key={items.id}
							className='px-5 py-4 sm:w-1/3 md:w-1/3 lg:w-1/4'>
							<Link to={`/ProductDetails/${items.id}/${items.category.slug}`}>
								<img
									src={items.imageCover}
									className={`
										${styles.img} ml-5 p-2.5 w-[240px] h-[400px] object-fit-cover'
									alt=''`}
								/>
								<h3 className='text-main mt-1.5'>{items.category.name}</h3>
								<p>{items.title.split(' ').slice(0, 2).join(' ')}</p>
								<div className='flex items-center justify-between'>
									<p>EG: {items.price}</p>
									<p>
										<i className='text-amber-300 fa-solid fa-star'></i>
										{items.ratingsAverage}
									</p>
								</div>
							</Link>
							<div className='text-center mt-2.5'>
								<button
									onClick={() => addProudactCart(dataDetails?.data?.data._id)}
									className={`${styles.CartBtn} w-full py-6 px-10 text-center`}>
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
		</>
	)
}

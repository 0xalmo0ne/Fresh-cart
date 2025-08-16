/** @format */

import React, { useState } from "react";
import "./Brands.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
export default function Brands() {
	const [page, setPage] = useState(1);
	async function getBrands() {
		return await axios
			.get(`https://ecommerce.routemisr.com/api/v1/brands?page=${page}`)
			.then((data) => {
				return data;
			})
			.catch((error) => {
				console.error(error);
				return error;
			});
	}
	let { data } = useQuery({
		queryKey: ["brands", page],
		queryFn: getBrands,
		keepPreviousData: true,
	});
	let brands = Array.isArray(data?.data?.data) ? data.data.data : [];

	async function fetchBrand(productId) {
		return await axios
			.get(`https://ecommerce.routemisr.com/api/v1/brands/${productId}`)
			.then((response) => {
				console.log(response, "براند معين");
				return response.data;
			})
			.catch((error) => {
				console.error(error);
				return error;
			});
	}
	let totalPages = data?.data?.metadata?.numberOfPages || 0;
	return (
		<>
			<div className='container mx-auto mt-20 px-2 mb-20'>
				<div className='flex flex-wrap justify-center'>
					{brands.map((brand) => (
						<div
							key={brand._id}
							className='bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 m-4 p-6 w-64'>
							<div className='bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 m-4 p-6 w-64'>
								<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
									<h2 className='text-2xl mb-2 text-lime-500'>{brand.name}</h2>
								</motion.div>
							</div>
							<div>
								<img
									src={brand.image}
									alt={brand.name}
									className='w-full h-40 object-cover rounded-t-xl mb-4'
									onClick={() => fetchBrand(brand._id)}
								/>
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
	);
}

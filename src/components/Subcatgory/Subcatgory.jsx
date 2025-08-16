/** @format */

import React from "react";
import "./Subcatgory.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
export default function Subcatgory() {
	let { id, name } = useParams();
	console.log(name);

	async function getSubCategory() {
		return await axios
			.get(
				`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
			)
			.then((data) => {
				console.log(data, "t3baaaaaaaan");
				return data;
			})
			.catch((error) => {
				console.error(error);
				return error;
			});
	}
	let { data: relatedProduct } = useQuery({
		queryKey: ["subCategory", id],
		queryFn: getSubCategory,
	});
	console.log(relatedProduct?.data, "anat3baaaaaan");
	let products = Array.isArray(relatedProduct?.data?.data)
		? relatedProduct.data.data
		: [];
	return (
		<>
			<div className='container mx-auto mt-20 px-2 mb-20'>
				<div className='flex flex-wrap justify-center'>
					{products.map((product) => (
						<div
							key={product._id}
							className='bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 m-4 p-6 w-64'>
							<div className='bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 m-4 p-6 w-64'>
								<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
									<h2 className='text-2xl mb-2 text-lime-500'>
										{product.name}
									</h2>
								</motion.div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

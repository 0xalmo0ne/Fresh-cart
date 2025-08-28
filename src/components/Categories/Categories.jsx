/** @format */

import { useContext, useEffect, useState } from 'react'
import './Categories.module.css'
import { CartContext } from '../../Context/CartContext.jsx'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
export default function Categories() {
	const [categories, setCategories] = useState([])
	let { getCategories, getSubCategories } = useContext(CartContext)

	async function fetchSubCategories(productId) {
		await getSubCategories(productId)
	}

	useEffect(() => {
		async function fetchCategories() {
			let response = await getCategories()
			setCategories(response?.data?.data)
		}
		fetchCategories()
	}, [getCategories])

	return (
		<>
			<title>Categories</title>
			<div className='container mx-auto mt-20 px-2 mb-20'>
				<div className='flex flex-wrap justify-center'>
					{categories.map((categorie) => (
						<div
							key={categorie._id}
							className='bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 m-4 p-6 w-64'>
							<Link to={`/Subcatgory/${categorie._id}`}>
								<div className='bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 m-4 p-6 w-64'>
									<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
										<h2 className='text-2xl mb-2 text-lime-500'>
											{categorie.name}
										</h2>
									</motion.div>
								</div>
								<div>
									<img
										src={categorie.image}
										alt={categorie.name}
										className='w-full h-40 object-cover rounded-t-xl mb-4'
										onClick={() => fetchSubCategories(categorie._id)}
									/>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

/** @format */
import { useContext, useEffect, useState } from 'react'
import './Cart.module.css'
import { CartContext } from '../../Context/CartContext.jsx'
import Loader from './../Loader/Loader'
import style from './Cart.module.css'
import empty from '../../assets/embty cart.gif'
import { Link } from 'react-router-dom'

export default function Cart() {
	let { getCart, removeItem, updateCart, totalprice, deletItem } =
		useContext(CartContext)
	const [cartItems, setCartItems] = useState([])
	const [isLodaing, setIsLodaing] = useState(true)

	async function getAllCart() {
		let response = await getCart()
		setCartItems(response.data.data.products)
		setIsLodaing(false)
	}

	async function removeCartItem(productId) {
		let response = await removeItem(productId)
		setCartItems(response.data.data.products)
		setIsLodaing(false)
	}

	async function updatCartItem(productId, count) {
		let response = await updateCart(productId, count)
		setCartItems(response.data.data.products)
	}

	useEffect(() => {
		getAllCart()
	}, [])

	return (
		<>
			<div className='container mx-auto mt-30 pb-20'>
				{cartItems.length === 0 ? (
					<div className='flex flex-col justify-center items-center h-[600px]'>
						<img
							src={empty}
							className='w-[300px] h-[300px] mb-6'
							alt='empty cart'
						/>
						<p className='text-center text-3xl font-semibold text-gray-600'>
							Your cart is empty
						</p>
					</div>
				) : (
					<div className='w-full overflow-x-auto'>
						<table className='w-full min-w-[600px] md:min-w-[900px]'>
							{/* head */}
							<thead>
								<tr className='text-center'>
									<th className='px-1 py-2 text-xs md:text-sm lg:text-xl'>
										Product Image
									</th>
									<th className='px-1 py-2 text-xs md:text-sm lg:text-xl'>
										Product Name
									</th>
									<th className='px-1 py-2 text-xs md:text-sm lg:text-xl'>
										Quantity
									</th>
									<th className='px-1 py-2 text-xs md:text-sm lg:text-xl'>
										Unit Price
									</th>
									<th className='px-1 py-2 text-xs md:text-sm lg:text-xl'>
										Total Price
									</th>
									<th className='px-1 py-2 text-xs md:text-sm lg:text-xl'>
										Method
									</th>
								</tr>
							</thead>

							<tbody>
								{cartItems.map((item) => (
									<tr key={item.product.id} className='text-center'>
										<td className='flex justify-center'>
											<div className='flex items-center gap-9 my-20'>
												<div className='w-[160px] h-[160px]'>
													<img
														src={item.product.imageCover}
														className='w-full h-full object-cover'
														alt={item.product.title}
													/>
												</div>
											</div>
										</td>
										<td className='w-[150px] text-sm truncate max-w-[120px]'>
											{item.product.title}
										</td>
										<td className='px-2 py-3 text-center'>
											<button
												onClick={() =>
													updatCartItem(item.product.id, item.count + 1)
												}
												className='cursor-pointer border-4 border-main px-3.5 py-3 rounded-full'>
												+
											</button>
											<span className='px-5'>{item.count}</span>
											<button
												onClick={() =>
													updatCartItem(item.product.id, item.count - 1)
												}
												className='cursor-pointer border-4 border-red-700 px-3 py-3 rounded-full'>
												-
											</button>
										</td>
										<td className='px-2 py-3 text-center'>{item.price} EGP</td>
										<td className='px-2 py-3 text-center'>
											{item.price * item.count} EGP
										</td>
										<td className='md:p-2 sm:p-1.5'>
											<button
												onClick={() => removeCartItem(item.product.id)}
												className='btn btn-error btn-x'>
												Remove
											</button>
										</td>
									</tr>
								))}

								<tr className='text-center font-bold'>
									<td className='text-2xl'>Total Price</td>
									<td></td>
									<td className='text-xl font-bold'>
										EGP{' '}
										<span className='text-md font-bold text-gray-800'>
											{totalprice}
										</span>
									</td>
									<td></td>
									<td>
										<button
											onClick={() => deletItem(setCartItems([]))}
											className={`${style.button}`}>
											<span className={`${style.text}`}>Delete Cart</span>
											<span className={`${style.icon}`}>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width={24}
													height={24}
													viewBox='0 0 24 24'>
													<path d='M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z' />
												</svg>
											</span>
										</button>
									</td>
									<td>
										{' '}
										<tr className='text-center'>
											<td colSpan='5'>
												<Link to='/checkout'>
													<button className={`${style.btn}`}>
														<span className={`${style.decor}`}></span>
														<div
															className={`${style.content} flex items-center gap-2`}>
															<div className={`${style.icon}`}>💳</div>
															<span className={`${style.text}`}>Payments</span>
														</div>
													</button>
												</Link>
											</td>
										</tr>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</div>
		</>
	)
}

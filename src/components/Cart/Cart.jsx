/** @format */

import { useContext, useEffect, useState } from "react";
import "./Cart.module.css";
import { CartContext } from '../../Context/CartContext.jsx'
import Loader from './../Loader/Loader'
import style from './Cart.module.css'
import empty from '../../assets/embty cart.gif'
import { Link } from "react-router-dom";
export default function Cart() {
	let { getCart, removeItem, updateCart, totalprice, deletItem } =
		useContext(CartContext);
	const [cartItems, setCartItems] = useState([]);
	const [isLodaing, setIsLodaing] = useState(true);
	async function getAllCart() {
		let response = await getCart();
		console.log(response.data.data, "uuuuu");
		setCartItems(response.data.data.products);
		setIsLodaing(false);
	}
	async function removeCartItem(productId) {
		let response = await removeItem(productId);
		console.log(response.data.data, "removeCartItem");
		setCartItems(response.data.data.products);

		setIsLodaing(false);
	}
	async function updatCartItem(productId, count) {
		let response = await updateCart(productId, count);
		console.log(response.data.data, "updateCartItem");
		setCartItems(response.data.data.products);
		// setIsLodaing(false);
	}

	useEffect(() => {
		getAllCart();
	}, []);

	return (
		<>
			{isLodaing ? <Loader /> : null}
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
								<tr className='text-center '>
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
											<div className='flex items-center gap-9 my-20 '>
												<div className='w-[160px] h-[160px] '>
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
												className='cursor-pointer border-4 border-red-700 px-3.5 py-3 rounded-full'>
												-
											</button>
										</td>
										<td className='px-2 py-3 text-center'>{item.price} EGP</td>
										<td className='px-2 py-3 text-center'>
											{item.price * item.count} EGP
										</td>
										<th className='md:p-2 sm:p-1.5'>
											<button
												onClick={() => removeCartItem(item.product.id)}
												className='btn btn-error btn-x'>
												Remove
											</button>
										</th>
									</tr>
								))}
								<tr className='text-5xl text-center'>
									<td>total price</td>
									<td></td>
									<td>{totalprice} EGP</td>
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
										<Link to='/checkout'>
											<button className={`${style.btn}`}>
												<span className={`${style.decor}`}></span>
												<div className={`${style.content}`}>
													<div className={`${style.icon}`}>
														<svg
															viewBox='0 0 50 50'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
															width={24}>
															<circle
																opacity='0.5'
																cx={25}
																cy={25}
																r={23}
																fill='url(#icon-payments-cat_svg__paint0_linear_1141_21101)'
															/>
															<mask id='icon-payments-cat_svg__a' fill='#fff'>
																<path
																	fillRule='evenodd'
																	clipRule='evenodd'
																	d='M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z'
																/>
															</mask>
															<path
																fillRule='evenodd'
																clipRule='evenodd'
																d='M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z'
																fill='#fff'
															/>
															<path
																d='M25.958 20.962l-1.47-1.632 1.47 1.632zm2.067.109l-1.632 1.469 1.632-1.469zm-.109 2.068l-1.469-1.633 1.47 1.633zm-5.154 4.638l-1.469-1.632 1.469 1.632zm-.276 1.841l-1.883 1.13 1.883-1.13zM34.42 15.93l-2.084-.695 2.084.695zm-19.725 6.42l18.568-6.189-1.39-4.167-18.567 6.19 1.389 4.166zm5.265 1.75l-5.12-3.072-2.26 3.766 5.12 3.072 2.26-3.766zm2.072 3.348l5.394-4.854-2.938-3.264-5.394 4.854 2.938 3.264zm5.394-4.854a.732.732 0 01-1.034-.054l3.265-2.938a3.66 3.66 0 00-5.17-.272l2.939 3.265zm-1.034-.054a.732.732 0 01.054-1.034l2.938 3.265a3.66 3.66 0 00.273-5.169l-3.265 2.938zm.054-1.034l-5.154 4.639 2.938 3.264 5.154-4.638-2.938-3.265zm1.023 12.152l-3.101-5.17-3.766 2.26 3.101 5.17 3.766-2.26zm4.867-18.423l-6.189 18.568 4.167 1.389 6.19-18.568-4.168-1.389zm-8.633 20.682c1.61 2.682 5.622 2.241 6.611-.725l-4.167-1.39a.732.732 0 011.322-.144l-3.766 2.26zm-6.003-8.05a3.66 3.66 0 004.332-.419l-2.938-3.264a.732.732 0 01.866-.084l-2.26 3.766zm3.592-1.722a3.66 3.66 0 00-.69 4.603l3.766-2.26c.18.301.122.687-.138.921l-2.938-3.264zm11.97-9.984a.732.732 0 01-.925-.926l4.166 1.389c.954-2.861-1.768-5.583-4.63-4.63l1.39 4.167zm-19.956 2.022c-2.967.99-3.407 5.003-.726 6.611l2.26-3.766a.732.732 0 01-.145 1.322l-1.39-4.167z'
																fill='#fff'
																mask='url(#icon-payments-cat_svg__a)'
															/>
															<defs>
																<linearGradient
																	id='icon-payments-cat_svg__paint0_linear_1141_21101'
																	x1={25}
																	y1={2}
																	x2={25}
																	y2={48}
																	gradientUnits='userSpaceOnUse'>
																	<stop stopColor='#fff' stopOpacity='0.71' />
																	<stop
																		offset={1}
																		stopColor='#fff'
																		stopOpacity={0}
																	/>
																</linearGradient>
															</defs>
														</svg>
													</div>
													<span className={`${style.text}`}>Payments</span>
												</div>
											</button>
										</Link>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</div>
		</>
	);
}

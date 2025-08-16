/** @format */

import { useContext, useEffect } from 'react'
import sty from './Navbar.module.css'
import Logo from './../../assets/freshcart-logo.svg'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { tokenContext } from '../../Context/TokenContext'
import '@fortawesome/fontawesome-free/'
import { CartContext } from '../../Context/CartContext.jsx'
export default function Navbar() {
	let { token, setToken } = useContext(tokenContext)
	let { onNumberItem, getCart } = useContext(CartContext)
	let navigat = useNavigate()

	useEffect(() => {
		async function getAllCart() {
			await getCart()
		}
		if (localStorage.getItem('userToken')) {
			getAllCart()
		}
	}, [getCart])

	function logOut() {
		localStorage.removeItem('userToken')
		setToken(null)
		navigat('/Login')
	}

	return (
		<div className='bg-slate-100 text-black'>
			<div className='navbar w-[95%] mx-auto'>
				<div className='navbar-start gap-8 md:flex'>
					<div className='dropdown'>
						<div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h8m-8 6h16'
								/>
							</svg>
						</div>

						<ul
							tabIndex={0}
							className='menu menu-sm dropdown-content bg-black text-white rounded-box z-1 mt-3 w-52 p-2 shadow'>
							{token ? (
								<>
									<li>
										<NavLink to='/' className='text-xl'>
											Home
										</NavLink>
									</li>
									<li>
										<NavLink to='/Products' className='text-xl'>
											Products
										</NavLink>
									</li>
									<li>
										<NavLink to='/Categories' className='text-xl'>
											Categories
										</NavLink>
									</li>
									<li>
										<NavLink to='/Brands' className='text-xl'>
											Brands
										</NavLink>
									</li>
									<li>
										<NavLink to='/Cart' className='text-2xl relative'>
											<i className='fa-solid fa-cart-shopping text-2xl'>
												<div className='absolute top-[-16px] right-[-1px] text-red-600 text-xl'>
													{onNumberItem}
												</div>
											</i>
										</NavLink>
									</li>
									<li>
										<NavLink to='/Wishlist' className='text-2xl text-red-500'>
											<i className='fa-solid fa-heart'></i>
										</NavLink>
									</li>
									<li>
										<button
											onClick={logOut}
											className='text-left text-red-400 text-xl'>
											Logout
										</button>
									</li>
								</>
							) : (
								<>
									<li>
										<NavLink to='/' className='text-xl'>
											Home
										</NavLink>
									</li>
									<li>
										<NavLink to='/Products' className='text-xl'>
											Products
										</NavLink>
									</li>
									<li>
										<NavLink to='/Login' className='text-xl'>
											Login
										</NavLink>
									</li>
									<li>
										<NavLink to='/Register' className='text-xl'>
											Register
										</NavLink>
									</li>
								</>
							)}
						</ul>
					</div>

					<img src={Logo} className='gap-4' alt='' />
					<div className='hidden lg:flex items-center '>
						{token ? (
							<ul className='flex flex-row items-center justify-center mx-auto gap-4'>
								<li>
									<NavLink to='' className='text-xl'>
										Home
									</NavLink>
								</li>
								<li>
									<NavLink to='Products' className='text-xl'>
										Products
									</NavLink>
								</li>
								<li>
									<NavLink to='Categories' className='text-xl'>
										Categories
									</NavLink>
								</li>
								<li>
									<NavLink to='Brands' className='text-xl'>
										Brands
									</NavLink>
								</li>
							</ul>
						) : (
							<>
								<ul className='menu menu-horizontal px-1'>
									{' '}
									<li>
										<NavLink to='' className='text-xl'>
											Home
										</NavLink>
									</li>
									<li>
										<NavLink to='Products' className='text-xl'>
											Products
										</NavLink>
									</li>
								</ul>
							</>
						)}
					</div>
				</div>
				<div className='navbar-end flex'>
					<ul className='menu menu-horizontal px-1'>
						{token ? (
							<>
								<div className='flex justify-center items-center gap-2'>
									<li className='hidden md:block'>
										<NavLink to='Cart' className='text-2xl relative'>
											<i className='fa-solid fa-cart-shopping text-2xl text-main'>
												<div className='absolute top-[-16px] right-[-1px] text-red-600 text-xl'>
													{onNumberItem}
												</div>
											</i>
										</NavLink>
									</li>
									<li className='hidden md:block'>
										<NavLink to='Wishlist' className='text-2xl text-red-500'>
											<i className='fa-solid fa-heart fa-xl'></i>
										</NavLink>
									</li>
									<li className='hidden md:block'>
										{' '}
										<i className='fa-brands fa-facebook text-2xl text-blue-500'></i>{' '}
									</li>{' '}
									<li className='hidden md:block'>
										{' '}
										<i className='fa-brands fa-github text-2xl text-black'></i>{' '}
									</li>{' '}
									<li className='hidden md:block'>
										{' '}
										<i className='fa-brands fa-twitter text-2xl text-blue-500'></i>{' '}
									</li>{' '}
									<li className='hidden md:block'>
										{' '}
										<i className='fa-brands fa-linkedin text-2xl text-blue-500'></i>{' '}
									</li>
									<li className='hidden md:block'>
										<button
											onClick={logOut}
											className={`${sty.Btn} text-main p-2 rounded-full hover:bg-red-100`}>
											<div className={sty.sign}>
												<svg
													viewBox='0 0 512 512'
													className='w-5 h-5'
													fill='currentColor'>
													<path d='M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32z' />
												</svg>
											</div>
											<span className={`${sty.text}`}>Logout</span>
										</button>
									</li>
								</div>
							</>
						) : null}
					</ul>
				</div>
			</div>
		</div>
	)
}

/** @format */
import axios from 'axios'
import { createContext, useState } from 'react'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
export let CartContext = createContext()
export default function CartContextprovider({ children }) {
	const [onNumberItem, setOnNumberItem] = useState(0)
	const [totalprice, setTotalPrice] = useState()
	const [cart, setCart] = useState(null)
	const [setList] = useState(null)
	let headers = {
		token: localStorage.getItem('userToken'),
	}
	async function addToCart(productId) {
		return await axios
			.post(
				`https://ecommerce.routemisr.com/api/v1/cart`,
				{
					productId,
				},
				{
					headers,
				}
			)
			.then((data) => {
				toast.success(data.data.message)
				// console.log(data.data.data._id, "add");
				setCart(data.data.data._id)
				setTotalPrice(data.data.data.totalCartPrice)
				setOnNumberItem(data.data.numOfCartItems)

				return data
			})
			.catch((error) => {
				toast.error(error.data.message)
				return error
			})
	}
	let getCart = async () => {
		return await axios
			.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
				headers,
			})
			.then((data) => {
				// console.log(data, 'getCart')
				setCart(data.data.data._id)
				setOnNumberItem(data.data.numOfCartItems)
				setTotalPrice(data.data.data.totalCartPrice)
				return data
			})
			.catch((error) => {
				return error
			})
	}
	async function removeItem(productId) {
		return await axios
			.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
				headers,
			})
			.then((data) => {
				toast.success('product removed from cart')
				setOnNumberItem(data.data.numOfCartItems)
				setCart(data.data.data._id)
				setTotalPrice(data.data.data.totalCartPrice)
				return data
			})
			.catch((error) => {
				return error
			})
	}
	async function updateCart(productId, count) {
		return await axios
			.put(
				`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
				{
					count,
				},
				{
					headers,
				}
			)
			.then((data) => {
				// toast.success(data.data.message);
				setCart(data.data.data._id)
				setOnNumberItem(data.data.numOfCartItems)
				setTotalPrice(data.data.data.totalCartPrice)
				return data
			})
			.catch((error) => {
				toast.error(error.data.message)
				return error
			})
	}
	async function deletItem() {
		return await axios
			.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
				headers,
			})
			.then((data) => {
				toast.success('cart removed successfly')
				setCart(data.data.data._id)
				setOnNumberItem([])
				setTotalPrice(0)
				onNumberItem([])
				return data
			})
			.catch((error) => {
				return error
			})
	}
	async function onlinePayment(shippingAddress) {
		return await axios
			.post(
				`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart}?url=http://localhost:5173`,
				{
					shippingAddress,
				},
				{
					headers,
				}
			)
			.then((data) => {
				console.log(data.data.session.url, 'onlinepay')
				setTimeout(() => {
					window.location.href = data.data.session.url
				}, 6000)
				return data
			})
			.catch((error) => {
				toast.error(error.data.message)
				return error
			})
	}
	async function cashPayment(shippingAddress) {
		return await axios
			.post(
				`https://ecommerce.routemisr.com/api/v1/orders/${cart}`,
				{
					shippingAddress,
				},
				{
					headers,
				}
			)
			.then((data) => {
				console.log(data, 'cashpay')
				window.location.href = 'http://localhost:5173/'
				setOnNumberItem(0)
				setTotalPrice(0)
				return data
			})
			.catch((error) => {
				Swal.fire({
					position: 'top-center',
					icon: 'error',
					title: data.data.message,
					showConfirmButton: false,
					timer: 3000,
				})
				return error
			})
	}

	async function addToList(productId) {
		return await axios
			.post(
				`https://ecommerce.routemisr.com/api/v1/wishlist`,
				{
					productId,
				},
				{
					headers,
				}
			)
			.then((data) => {
				console.log(data?.data?.message)
				toast.success(data?.data?.message)
				return data
			})
			.catch((error) => {
				console.log(error)
				return error
			})
	}

	async function getToList() {
		return await axios
			.get(
				`https://ecommerce.routemisr.com/api/v1/wishlist`,

				{
					headers,
				}
			)
			.then((data) => {
				console.log(data, 'getList')
				// toast.success(data?.data?.message);
				return data
			})
			.catch((error) => {
				console.log(error)
				return error
			})
	}

	let removeList = async (productId) => {
		return await axios
			.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
				headers,
			})
			.then((data) => {
				toast.success('product removed from Wishlist')
				setOnNumberItem(data.data.numOfCartItems)
				setList(data.data.data._id)
				setTotalPrice(data.data.data.totalCartPrice)
				return data
			})
			.catch((error) => {
				return error
			})
	}

	let addToWashlist = async (productId) => {
		return await axios
			.post(
				`https://ecommerce.routemisr.com/api/v1/wishlist`,
				{
					productId,
				},
				{
					headers,
				}
			)
			.then((data) => {
				console.log(data?.data?.message)
				toast.success(data?.data?.message)
				return data
			})
			.catch((error) => {
				console.log(error)
				return error
			})
	}

	let getCategories = async () => {
		return await axios
			.get(`https://ecommerce.routemisr.com/api/v1/categories`)
			.then((data) => {
				return data
			})
			.catch((error) => {
				console.log(error)
				return error
			})
	}

	let getSubCategories = async (productId) => {
		return await axios
			.get(
				`https://ecommerce.routemisr.com/api/v1/categories/${productId}/subcategories`
			)
			.then((data) => {
				console.log(data, 'getSubCategories')
				return data
			})
			.catch((error) => {
				console.log(error)
				return error
			})
	}

	let forgitPassword = async (email) => {
		return await axios
			.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
				email,
			})
			.then((data) => {
				console.log(data?.data?.message)
				toast.success(data?.data?.message)
				return data
			})
			.catch((error) => {
				console.log(error)
				return error
			})
	}

	let updatePassword = async (email, newPassword) => {
		try {
			const headers = {
				token: localStorage.getItem('userToken'),
			}
			const body = {
				email: email,
				newPassword: newPassword,
			}
			let { data } = await axios.put(
				'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
				body,
				{
					headers,
				}
			)
			console.log(data)
			toast.success('Password updated successfully')
			return data
		} catch (error) {
			console.error(
				'Update Password Error:',
				error.response?.data || error.message
			)
			toast.error(error.response?.data?.message || 'Something went wrong')
			return error
		}
	}

	return (
		<CartContext.Provider
			value={{
				addToCart,
				getCart,
				removeItem,
				updateCart,
				onNumberItem,
				totalprice,
				deletItem,
				onlinePayment,
				cashPayment,
				addToList,
				getToList,
				removeList,
				getCategories,
				getSubCategories,
				addToWashlist,
				forgitPassword,
				updatePassword,
			}}>
			{children}
		</CartContext.Provider>
	)
}

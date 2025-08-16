
import { useContext,useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';

export default function RestPassword() {
	const [email, setEmail] = useState()
	const navigate = useNavigate()
	let{forgitPassword}=useContext(CartContext);

  async function handelPasswort() {
		if (!email) return toast.error('أدخل البريد الإلكتروني')
	const res =	await forgitPassword(email)
	    if (res?.status === 200 || res?.data?.statusMsg === 'success') {
				navigate('/Code')
			}
	}
	
	return (
		<div className='p-5 flex flex-col justify-center items-center mt-28'>
			<input
				type='email'
				placeholder='Enter Your Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className='border p-2 rounded w-[50%]'
			/>
			<button
				onClick={() => handelPasswort()}
				className='py-3 px-6 bg-blue-500 mt-3 rounded text-white'>
				Send Code
			</button>
		</div>
	)
}


/** @format */

import { useContext } from 'react'
import './NewPassword.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function NewPassword() {
	let { updatePassword } = useContext(CartContext)
	let navigate = useNavigate()

	async function changePassword(email, newPassword) {
		let res = await updatePassword(email, newPassword)
		console.log(res)
navigate('/Login')
	}

	const mySchema = Yup.object({
		email: Yup.string().email('Invalid email').required('Email is required'),
		password: Yup.string()
			.required('Password is required')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
				'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
			),
		rePassword: Yup.string()
			.required('Confirm Password is required')
			.oneOf([Yup.ref('password')], 'Passwords must match'),
	})

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rePassword: '',
		},
		validationSchema: mySchema,
		onSubmit: async (values) => {
			await changePassword(values.email, values.password)
		},
	})

	return (
		<div className='w-[80%] mx-auto my-4'>
			<h1 className='text-3xl text-main mt-2 my-4'>Set New Password:</h1>

			<form onSubmit={formik.handleSubmit}>
				<input
					type='email'
					placeholder='Email'
					className='input w-full focus:outline-0 rounded-xl mt-3'
					name='email'
					onChange={formik.handleChange}
					value={formik.values.email}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.email && formik.errors.email && (
					<div className='text-red-500'>{formik.errors.email}</div>
				)}

				<input
					type='password'
					placeholder='New Password'
					className='input w-full focus:outline-0 rounded-xl mt-3'
					name='password'
					onChange={formik.handleChange}
					value={formik.values.password}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.password && formik.errors.password && (
					<div className='text-red-500'>{formik.errors.password}</div>
				)}

				<input
					type='password'
					placeholder='Confirm New Password'
					className='input w-full focus:outline-0 rounded-xl mt-3'
					name='rePassword'
					onChange={formik.handleChange}
					value={formik.values.rePassword}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.rePassword && formik.errors.rePassword && (
					<div className='text-red-500'>{formik.errors.rePassword}</div>
				)}

				<button
					type='submit'
					className='border-2 p-2 rounded-2xl bg-blue-700 text-white mt-4'>
					Save Password
				</button>
			</form>
		</div>
	)
}

/** @format */
import "./Register.module.css";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from 'react'
export default function Register() {
	let myInput = useRef()
	let navigat = useNavigate()
	const mySchema = Yup.object({
		name: Yup.string()
			.required('Name is required')
			.min(3, 'Name must be at least 3 characters')
			.max(30, 'Name must not exceed 30 characters'),
		email: Yup.string()
			.required('Email is required')
			.email('Invalid email format'),
		password: Yup.string()
			.required('Password is required')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
				'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
			),
		rePassword: Yup.string()
			.required('Re-password is required')
			.oneOf([Yup.ref('password')], 'Passwords must match'),
		phone: Yup.string()
			.required('Phone is required')
			.matches(/^(002)?01[0125][0-9]{8}$/, 'Invalid phone number'),
	})

	let Formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			rePassword: '',
			phone: '',
		},
		validationSchema: mySchema,
		onSubmit: (values) => {
			console.log(values)
			regForm(values)
		},
	})
	// 	if (!values.name) {
	// 		errors.name = "Required";
	// 	} else if (values.name.length < 3) {
	// 		errors.name = "Name must be at least 3 characters";
	// 	}
	// 	if (!values.email) {
	// 		errors.email = "Email is required";
	// 	} else if (
	// 		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
	// 	) {
	// 		errors.email = "Invalid email format";
	// 	}
	// 	if (!values.password) {
	// 		errors.password = "Password is required";
	// 	} else if (
	// 		!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
	// 			values.password
	// 		)
	// 	) {
	// 		errors.password =
	// 			"Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
	// 	}
	// 	if (!values.rePassword

	// 		errors.rePassword
	// "Password is required";
	// 	} else if (values.password !== values.rePassword

	// 		errors.rePassword
	// = "Password not match";
	// 	}
	// 	if (!values.phone) {
	// 		errors.phone = "Phone is required";
	// 	} else if (!/^(002)?01[0125][0-9]{8}$/.test(values.phone)) {
	// 		errors.phone = "Invalid phone number";
	// 	}
	// 	return errors;
	// },
	// validate: (values) => {
	// 	console.log(values);
	// 	Swal.fire({
	// 		title: "Success!",
	// 		text: "You have registered successfully!",
	// 		icon: "success",
	// 		confirmButtonText: "Done",
	// 	});
	async function regForm(values) {
		try {
			const { data } = await axios.post(
				'https://ecommerce.routemisr.com/api/v1/auth/signup',
				values
			)
			console.log('Registration success:', data)
			setTimeout({})
			Swal.fire('Success', 'You have registered successfully!', 'success')
			navigat('/login')
		} catch (err) {
			console.log('Registration error:', err.response?.data)
			Swal.fire({
				icon: 'error',
				title: 'Registration Failed',
				text:
					err.response?.data?.errors?.msg ||
					err.response?.data?.message ||
					'Something went wrong',
			})
		}
	}

	// async function regForm(values) {
	// 	return await axios
	// 		.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
	// 		.then((data) => {
	// 			console.log(data);
	// 		})
	// 		.catch((err) => {
	// 			console.log("Full error:", err.response?.data);
	// 			Swal.fire({
	// 				icon: "Error",
	// 				title: "Registration Failed",
	// 				text: err.response?.data?.message || "An error occurred",
	// 			});
	// 		});
	// }

	useEffect(() => {
		myInput.current.focus()
	}, [])

	return (
		<>
			<div className='w-[90%] mx-auto my-4'>
				<h1 className='text-3xl font-bold mt-2 my-4'>Register Now:</h1>
				<form onSubmit={Formik.handleSubmit}>
					<input
						ref={myInput}
						type='text'
						placeholder='Name:'
						className='input w-full focus:outline-0 rounded-xl mt-3'
						name='name'
						onChange={Formik.handleChange}
						value={Formik.values.name}
						onBlur={Formik.handleBlur}
					/>
					{Formik.errors.name && Formik.touched.name ? (
						<div role='alert' className='mt-2 alert alert-error alert-soft'>
							{Formik.errors.name}{' '}
						</div>
					) : null}
					<input
						type='email'
						placeholder='Email:'
						className='input w-full focus:outline-0 rounded-xl mt-3'
						name='email'
						onChange={Formik.handleChange}
						value={Formik.values.email}
						onBlur={Formik.handleBlur}
					/>
					{Formik.errors.email && Formik.touched.email ? (
						<div role='alert' className='mt-2 alert alert-error alert-soft'>
							{Formik.errors.email}{' '}
						</div>
					) : null}
					<input
						type='Password'
						placeholder='Password:'
						className='input w-full focus:outline-0 rounded-xl mt-3'
						name='password'
						onChange={Formik.handleChange}
						value={Formik.values.password}
						onBlur={Formik.handleBlur}
					/>
					{Formik.errors.password && Formik.touched.password ? (
						<div role='alert' className='mt-2 alert alert-error alert-soft'>
							<span>{Formik.errors.password}</span>
						</div>
					) : null}
					<input
						type='Password'
						placeholder='re-Password:'
						className='input w-full focus:outline-0 rounded-xl mt-3'
						name='rePassword'
						onChange={Formik.handleChange}
						value={Formik.values.rePassword}
						onBlur={Formik.handleBlur}
					/>
					{Formik.errors.rePassword && Formik.touched.rePassword ? (
						<div role='alert' className='mt-2 alert alert-error alert-soft'>
							<span>{Formik.errors.rePassword}</span>
						</div>
					) : null}
					<input
						type='tel'
						placeholder='Phone:'
						className='input w-full focus:outline-0 rounded-xl mt-3'
						name='phone'
						onChange={Formik.handleChange}
						value={Formik.values.phone}
						onBlur={Formik.handleBlur}
					/>
					{Formik.errors.phone && Formik.touched.phone ? (
						<div role='alert' className='mt-2 alert alert-error alert-soft'>
							<span>{Formik.errors.phone}</span>
						</div>
					) : null}
					<div className='text-end mt-3'>
						<button
							type='submit'
							className='px-6 py-3 rounded-xl text-white bg-emerald-500'>
							Register
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

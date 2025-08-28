/** @format */
import { useContext, useState } from 'react'
import "./Login.module.css";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useNavigate } from 'react-router-dom'
import { tokenContext } from "../../Context/TokenContext";
export default function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const { setToken } = useContext(tokenContext);
	let navigat = useNavigate();
	const mySchema = Yup.object({
		email: Yup.string()
			.required("Email is required")
			.email("Invalid email format"),
		password: Yup.string()
			.required("Password is required")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
				"Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
			),
	});
	let Formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: mySchema,
		onSubmit: (values) => {
			loginForm(values)
		},
	})

	async function loginForm(values) {
		setIsLoading(true);
		try {
			const { data } = await axios.post(
				'https://ecommerce.routemisr.com/api/v1/auth/signin',
				values
			)
			localStorage.setItem('userToken', data.token)
			// Swal.fire("Success", "You Login successfully!", "success");
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'You Login successfully!',
				showConfirmButton: false,
				timer: 2000,
			})
			setToken(data.token)
			navigat('/Home')
		} catch (err) {
			setIsLoading(false)
			Swal.fire({
				position: 'center',
				icon: 'error',
				title:
					err.response?.data?.errors?.msg ||
					err.response?.data?.message ||
					'Something went wrong',
				showConfirmButton: false,
				timer: 3000,
			})
		}
		setIsLoading(false);
	}

	if (isLoading) return <Loader />;
	return (
		<>
			<div className='w-[80%] mx-auto my-4'>
				<h1 className='text-3xl font-bold mt-2 my-4'>Login Now:</h1>
				<form onSubmit={Formik.handleSubmit}>
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
					<div className='text-end mt-3'>
						<button
							type='submit'
							className='px-6 py-3 rounded-xl text-white bg-emerald-500'>
							Login
						</button>
					</div>
					<div className='text-center mt-3'>
						<button
							className='start-0 border-2 rounded-2xl p-2.5 bg-blue-700 text-2xl text-white'
							onClick={() => navigat('/RestPassword')}>
							Forget Password
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

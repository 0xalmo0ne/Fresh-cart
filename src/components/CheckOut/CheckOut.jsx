/** @format */
import { useContext } from "react";
import { useFormik } from "formik";
import { CartContext } from '../../Context/CartContext.jsx'
export default function CheckOut() {
	let { onlinePayment, cashPayment } = useContext(CartContext)

	async function handlePayment(value) {
		if (value.paymentMethod === 'credit') {
			await onlinePayment(value)
		} else if (value.paymentMethod === 'cash') {
			await cashPayment(value)
		} else {
			console.log('error')
		}
	}
	let Formik = useFormik({
		initialValues: {
			details: '',
			Phone: '',
			City: '',
			paymentMethod: '',
		},
		onSubmit: (values) => {
			handlePayment(values)
		},
	})
	return (
		<>
			<div className='h-[600px] flex justify-center items-center'>
				<div className='w-1/2'>
					<h2 className='text-main text-3xl'>Enter Your Details:</h2>
					<form className='gap-4' onSubmit={Formik.handleSubmit}>
						<input
							type='text'
							placeholder='details:'
							className='input w-full focus:outline-0 rounded-xl mt-3'
							name='details'
							onChange={Formik.handleChange}
							value={Formik.values.details}
							onBlur={Formik.handleBlur}
						/>

						{Formik.errors.details && Formik.touched.details ? (
							<div role='alert' className='mt-2 alert alert-error alert-soft'>
								{Formik.errors.details}{' '}
							</div>
						) : null}
						<input
							type='tel'
							placeholder='Phone:'
							className='input w-full focus:outline-0 rounded-xl mt-3'
							name='Phone'
							onChange={Formik.handleChange}
							value={Formik.values.Phone}
							onBlur={Formik.handleBlur}
						/>
						{Formik.errors.Phone && Formik.touched.Phone ? (
							<div role='alert' className='mt-2 alert alert-error alert-soft'>
								<span>{Formik.errors.Phone}</span>
							</div>
						) : null}

						<input
							type='text'
							placeholder='City:'
							className='input w-full focus:outline-0 rounded-xl mt-3'
							name='City'
							onChange={Formik.handleChange}
							value={Formik.values.City}
							onBlur={Formik.handleBlur}
						/>
						{Formik.errors.City && Formik.touched.City ? (
							<div role='alert' className='mt-2 alert alert-error alert-soft'>
								<span>{Formik.errors.City}</span>
							</div>
						) : null}
						<select
							value={Formik.values.paymentMethod}
							onChange={Formik.handleChange}
							onBlur={Formik.handleBlur}
							name='paymentMethod'
							className='select my-5 flex justify-center items-center mx-auto text-xl'>
							<option value='' disabled>
								Pick a Payment
							</option>
							<option value='cash'>Cash</option>
							<option value='credit'>Credit</option>
						</select>
						<div className='text-end mt-3'>
							<button
								type='submit'
								className='cursor-pointer px-6 py-3 rounded-xl text-white bg-emerald-500'>
								Pay Now
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

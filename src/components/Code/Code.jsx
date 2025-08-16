/** @format */

import React, { useState } from "react";
import "./Code.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Code() {
	const [code, setCode] = useState("");
	const navigate = useNavigate()
async function handleCode() {
	try {
		await axios.post(
			`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
			{ resetCode: code }
		)
		toast.success('Success')
		navigate('/NewPassword')
	} catch (error) {
		toast.error(error.response?.data.message || error.message)
	}
}
	return (
		<>
			<div>
				<div className='mx-auto w-[50%] mt-50'>
					<h1 className='text-main text-2xl'>Enter your code:</h1>
					<input
						type='password'
						placeholder='Password:'
						className='input w-full focus:outline-0 rounded-xl mt-3'
						name='password'
						onChange={(e) => setCode(e.target.value)}
					/>
				</div>
				<div className='text-center mt-3'>
					<button
						className=' border-2 p-2.5 rounded-2xl bg-blue-700 text-white text-xl'
						onClick={handleCode}>
						send code
					</button>
				</div>
			</div>
		</>
	)
}

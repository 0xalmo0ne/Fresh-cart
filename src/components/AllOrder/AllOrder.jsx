/** @format */

import { useEffect } from "react";

export default function PaymentSuccess() {
	useEffect(() => {
		const timer = setTimeout(() => {
			window.location.href = "http://localhost:5173/";
		}, 1900);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='text-center mt-20'>
			<h1 className='text-3xl font-bold'>تم الدفع بنجاح ✅</h1>
			<p>سيتم تحويلك للصفحة الرئيسية خلال دقيقة...</p>
		</div>
	);
}

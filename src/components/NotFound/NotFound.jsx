/** @format */
import Notimg from './../../assets/404.jpg'
import './NotFound.module.css'
export default function NotFound() {
	return (
		<div className='container mx-auto text-center w-full'>
			<img src={Notimg} className='mx-auto w-[200%] h-[700px]' alt='' />
		</div>
	)
}

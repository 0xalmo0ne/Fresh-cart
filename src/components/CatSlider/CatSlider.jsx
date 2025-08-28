/** @format */
import './CatSlider.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Slider from 'react-slick'
export default function CatSlider() {
	async function categoryProduct() {
		return await axios
			.get(`https://ecommerce.routemisr.com/api/v1/categories`)
			.then((res) => res.data)
	}
	let { data } = useQuery({
		queryKey: ['categorie'],
		queryFn: categoryProduct,
	})
	let Categories = data?.data
	const settings = {
		dots: false,
		infinite: true,
		speed: 1500,
		cssEase: 'linear',
		slidesToShow: 7,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 5,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
				},
			},
		],
	}

	return (
		<>
			<div className='container mx-auto mt-2 my-5 md:py-20 lg:py-20'>
				<h1 className='text-2xl text-main mt-2 p-8'>Show Popular Category:</h1>
				<Slider {...settings} className='px-8'>
					{Categories?.map((cate) => (
						<>
							<div key={cate._id} className='cursor-pointer p-2 sm:p-2'>
								<img src={cate.image} className='h-[220px] w-[220px]' alt='' />
								<p className='text-center text-xl sm:text-sm'>{cate.name}</p>
							</div>
						</>
					))}
				</Slider>
			</div>
		</>
	)
}

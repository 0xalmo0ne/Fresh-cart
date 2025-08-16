/** @format */

import { useState, useEffect } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from "../../assets/slider-image-3.jpeg";
import slider2 from "../../assets/slider-image-2.jpeg";
import slider3 from "../../assets/slider-image-1.jpeg";
import slider4 from "../../assets/grocery-banner-2.jpeg";
import slider5 from "../../assets/slider-2.jpeg";
import Slider from "react-slick";
import Loader from "../Loader/Loader";

export default function MainSlider() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// simulate loading
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	const settings = {
		dots: false,
		infinite: true,
		speed: 900,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000,
	};

	if (isLoading) return <Loader />;

	return (
		<div className='flex items-center justify-center'>
			<div className='container mx-auto'>
				<div className='flex'>
					<div className='w-3/4 mt-5'>
						<Slider {...settings}>
							<img src={slider1} className='h-[400px] rounded-s-lg' alt='' />
							<img src={slider2} className='h-[400px] rounded-s-lg' alt='' />
							<img src={slider3} className='h-[400px] rounded-s-lg' alt='' />
						</Slider>
					</div>
					<div className='w-1/4 mt-5'>
						<img src={slider4} className='h-[200px] rounded-e-lg' alt='' />
						<img src={slider5} className='h-[200px] rounded-e-lg' alt='' />
					</div>
				</div>
			</div>
		</div>
	);
}

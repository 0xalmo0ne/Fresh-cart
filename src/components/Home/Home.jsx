/** @format */
import './Home.module.css'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import MainSlider from '../MainSlider/MainSlider'
import CatSlider from '../CatSlider/CatSlider'
export default function Home() {
	return (
		<div>
			<>
				<MainSlider />
				<CatSlider />
				<FeatureProducts />
			</>
		</div>
	)
}

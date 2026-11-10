import Cards from "../../components/Cards/Cards";
import Header from "../../components/Header/Header";
import Slider from "../../components/Slider/Slider";
import HomePlayer from "./HomePlayer/HomePlayer";

const Home = () => {
	return (
		<>
			<Header>
				<Slider />
			</Header>
			<main className='main'>
				<Cards />
				<HomePlayer />
			</main>
		</>
	)
}

export default Home;
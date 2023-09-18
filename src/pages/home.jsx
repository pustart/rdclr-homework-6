import Carousel from '../components/modules/Carousel/Carousel';
import { IMAGES } from '../constants/images.constants';

function Home() {
  return (
    <Carousel items={IMAGES}>
      {IMAGES.map((image, index) => (
        <img
          key={image.path}
          className='item'
          alt={image.title}
          src={image.path}
        />
      ))}
    </Carousel>
  );
}

export default Home;

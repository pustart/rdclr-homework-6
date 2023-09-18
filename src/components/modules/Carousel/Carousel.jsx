import {useRef, useState, useEffect } from 'react';
import { useUnit, useStore } from 'effector-react';
import ViewWindow from '../../elements/ViewWindow/ViewWindow';
import Button from '../../core/Button/Button';
import styles from './Carousel.module.scss';
import { ReactComponent as LeftArrow } from '../../../assets/icons/chevron-left.svg';
import { ReactComponent as RightArrow } from '../../../assets/icons/chevron-right.svg';
import { $slideLength, offsetLeft, offsetRight } from './model';
import useSwipe from '../../../hooks/useSwipe';
import { SWIPE_DIRECTION } from '../../../constants/swipeDirection.constants';
import Pagination from '../../elements/Pagination/Pagination';

function Carousel({ children, items = null }) {
  const slides = useStore($slideLength);
  const [rightArrowClick, leftArrowClick] = useUnit([offsetRight, offsetLeft]);
  const [autoScrolling, setAutoScrolling] = useState(false);
  const carouselRef = useRef();
  useSwipe(carouselRef, handleSwipe);

  function handleSwipe(direction) {
    if (direction === SWIPE_DIRECTION.right) {
      leftArrowClick();
    } else if (direction === SWIPE_DIRECTION.left) {
      rightArrowClick();
    }
  }

  const toggleAutoScroll = () => {
    setAutoScrolling(!autoScrolling);
  };

  useEffect(() => {
    const autoScroll = () => {
      if (autoScrolling) {
        rightArrowClick();
      }
    };

    const intervalId = setInterval(autoScroll, 2000);
    return () => clearInterval(intervalId);
  }, [autoScrolling, rightArrowClick]);

  return (
    <article className={styles['carousel-container']}>
      <section ref={carouselRef} className={styles.carousel}>
        <Button
          className={styles['carousel__arrow-btn']}
          onClick={leftArrowClick}
          icon={<LeftArrow />}
        />
        <ViewWindow items={items}>{children}</ViewWindow>
        <Button
          className={styles['carousel__arrow-btn']}
          onClick={rightArrowClick}
          icon={<RightArrow />}
        />
      </section>
      <Pagination pagesCount={slides}/>
      <Button type='button' onClick={toggleAutoScroll} view='default' className={styles['autoscroll-btn']}>{autoScrolling ? 'Turn off autoscroll' : 'Turn on autoscroll'}</Button>
    </article>
  );
}

export default Carousel;

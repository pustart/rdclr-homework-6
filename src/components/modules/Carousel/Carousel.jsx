import {useRef } from 'react';
import { useUnit } from 'effector-react';
import ViewWindow from '../../elements/ViewWindow/ViewWindow';
import Button from '../../core/Button/Button';
import styles from './Carousel.module.scss';
import { ReactComponent as LeftArrow } from '../../../assets/icons/chevron-left.svg';
import { ReactComponent as RightArrow } from '../../../assets/icons/chevron-right.svg';
import { offsetLeft, offsetRight } from './model';
import useSwipe from '../../../hooks/useSwipe';
import { SWIPE_DIRECTION } from '../../../constants/swipeDirection.constants';

function Carousel({ children }) {
  const [rightArrowClick, leftArrowClick] = useUnit([offsetRight, offsetLeft]);
  const carouselRef = useRef();
  useSwipe(carouselRef, handleSwipe);

  function handleSwipe(direction) {
      if (direction === SWIPE_DIRECTION.right) {
        leftArrowClick();
      } else if (direction === SWIPE_DIRECTION.left) {
        rightArrowClick();
      }
  };

  return (
    <article className={styles['carousel-container']}>
      <section ref={carouselRef} className={styles.carousel}>
        <Button
          className={styles['carousel__arrow-btn']}
          onClick={leftArrowClick}
          icon={<LeftArrow />}
        />
        <ViewWindow>{children}</ViewWindow>
        <Button
          className={styles['carousel__arrow-btn']}
          onClick={rightArrowClick}
          icon={<RightArrow />}
        />
      </section>
    </article>
  );
}

export default Carousel;

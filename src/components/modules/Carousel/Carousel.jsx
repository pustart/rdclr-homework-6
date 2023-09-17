import { useUnit } from 'effector-react';
import ViewWindow from '../../elements/ViewWindow/ViewWindow';
import Button from '../../core/Button/Button';
import styles from './Carousel.module.scss';
import { ReactComponent as LeftArrow } from '../../../assets/icons/chevron-left.svg';
import { ReactComponent as RightArrow } from '../../../assets/icons/chevron-right.svg';
import { offsetLeft, offsetRight } from './model';

function Carousel({ children }) {
  const [rightArrowClick, leftArrowClick] = useUnit([offsetRight, offsetLeft]);

  return (
    <article className={styles['carousel-container']}>
      <section className={styles.carousel}>
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

import clsx from 'clsx';
import { useStore } from 'effector-react';
import { $currentSlide } from '../../modules/Carousel/model';
import styles from './Pagination.module.scss';

function Pagination({ pagesCount }) {
  const points = Array.from({ length: pagesCount }, (_, index) => index + 1);
  const currentSlide = useStore($currentSlide);

  return (
    <section className={styles['pagination-container']}>
      {points.map((point, index) => (
        <div
          key={point}
          className={clsx(styles['point'], {
            [styles['point__filled']]: index === currentSlide,
          })}
        />
      ))}
    </section>
  );
}

export default Pagination;

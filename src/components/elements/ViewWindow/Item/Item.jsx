import styles from './Item.module.scss';
import { useStore } from 'effector-react';
import { $viewWidth } from '../../../modules/Carousel/model';
import Htag from '../../../core/Htag/Htag';

function Item({children, item = null}) {
  const width = useStore($viewWidth);

  return (
    <div
      className={styles['item__container']}
      style={{
        maxWidth: `${width}px`,
        minWidth: `${width}px`,
      }}
    >
      {item && (<Htag tag='h6' className={styles['item__title']}>{item.title}</Htag>)}
      {children}
    </div>
  );
}

export default Item;
